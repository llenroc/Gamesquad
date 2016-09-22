using GameSquad.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;




namespace GameSquad.Hubs
{
    

    public class UserDetail
    {
        public string ConnectionId { get; set; }
        public string Username { get; set; }
    }

    public static class ConnectedUsers
    {
        // public static HashSet<UserDetail> Users = new HashSet<UserDetail>();

            /// <summary>
            /// Username is key, connection id is value
            /// </summary>
        public static Dictionary<string, string> Users = new Dictionary<string, string>();
        

    }

    public class ChatHub : Hub
    {
        

        /// <summary>
        /// What happens when a client connects to the hub
        /// </summary>
        /// <param name="userName">Gets the username </param>
        public void Connect(string userName)
        {
            //var newUser = new UserDetail { ConnectionId = Context.ConnectionId, Username = userName };


            // if (ConnectedUsers.Users.Count(u => u.Username == newUser.Username) > 0 || userName == null)

            //Used in the trygetvalue for testing
           string keyTest;
            if (ConnectedUsers.Users.TryGetValue(userName, out keyTest))
            {
                //Tells the client side to disconnect client. Current crappy way of fixing multiple browser tab issue
                Clients.Caller.onConnected(0);

            }
            //else if (ConnectedUsers.Users.Count(u => u.ConnectionId == newUser.ConnectionId) == 0)
            else
            {
                var returnList = new List<UserDetail>();
                foreach (var item in ConnectedUsers.Users.ToList())
                {
                    returnList.Add(new UserDetail
                    {
                        Username = item.Key,
                        ConnectionId = item.Value
                    });
                }

                Clients.Caller.onConnected(returnList);

                // ConnectedUsers.Users.Add(newUser);
                ConnectedUsers.Users.Add(userName, Context.ConnectionId);

                var newUser = new UserDetail
                {
                    Username = userName,
                    ConnectionId = Context.ConnectionId
                };
                Clients.AllExcept(Context.ConnectionId).onNewUserConnected(newUser);
            }




        }

        public override Task OnDisconnected(bool stopCalled)
        {
            //var userToRemove = ConnectedUsers.Users.FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            //var test = ConnectedUsers.Users.Contains(Context.User);                           

            //string userToRemove = ConnectedUsers.Users.FirstOrDefault(;
           // ConnectedUsers.Users.TryGetValue()

            if (ConnectedUsers.Users.ContainsValue(Context.ConnectionId))
            {

                var userToRemove = ConnectedUsers.Users.Where(u => u.Value == Context.ConnectionId).FirstOrDefault();

                ConnectedUsers.Users.Remove(userToRemove.Key);
                Clients.All.onUserDisconnected(userToRemove.Key);


                //if (ConnectedUsers.Users.Count(u => u.Username == userToRemove.Username) > 1)
                //{
                //    var usersToRemove = ConnectedUsers.Users.Where(u => u.Username == userToRemove.Username).ToList();

                //    foreach (UserDetail user in usersToRemove)
                //    {
                //        ConnectedUsers.Users.Remove(user);
                //        Clients.All.onUserDisconnected(userToRemove.Username);

                //    }
                //}

                //else
                //{
                //    //var userToRemove = ConnectedUsers.Users.FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
                //    ConnectedUsers.Users.Remove(userToRemove);
                //    Clients.All.onUserDisconnected(userToRemove.Username);
                //}
            }
            
            return base.OnDisconnected(stopCalled);
        }

        /// <summary>
        /// Sends message to everyone
        /// </summary>
        /// <param name="message">Recives the message object</param>
        public void SendMessage(object message)
        {
            Clients.All.newMessage(message);
        }

        public void SendPrivateMessage(string fromUsername, string privateMessage, string toUserName, string toConnectionId)
        {
            

            try
            {
                if(toUserName == "Dummy User 1" || toUserName == "Dummy User 2")
                {

                    var dummyMessage = "You sent to the server: " + privateMessage;

                    Clients.Caller.getPrivateMessage(fromUsername, privateMessage, toUserName);

                    Clients.Caller.getPrivateMessage(toUserName, dummyMessage, toUserName);




                }

                else
                {
                    Clients.Client(toConnectionId).getPrivateMessage(fromUsername, privateMessage, fromUsername);
                    Clients.Caller.getPrivateMessage(fromUsername, privateMessage, toUserName);
                }

                
            }
            catch
            {
                var errorMsg = "Server: Unable to deliver message";
                Clients.Caller.getPrivateMessage(fromUsername, errorMsg, toUserName);
            }
        }

    }

}
