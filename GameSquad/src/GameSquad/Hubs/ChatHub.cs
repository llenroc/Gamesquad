using GameSquad.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using GameSquad.Repositories;
using GameSquad.Services;

namespace GameSquad.Hubs
{
    

    public class UserDetail
    {
        public string connectionId { get; set; }
        public string username { get; set; }
    }

    public static class ConnectedUsers
    {
       

            /// <summary>
            /// Username is key, connection id is value
            /// </summary>
        public static Dictionary<string, string> Users = new Dictionary<string, string>();
        

    }

    

    public class ChatHub : Hub
    {
        private UserManager<ApplicationUser> _manager;
        private IGenericRepository _repo;
        private ISignalrService _service;
        public ChatHub(UserManager<ApplicationUser> manager, IGenericRepository repo, ISignalrService service)
        {
            _manager = manager;
            _repo = repo;
            _service = service;

        }

        public async Task<ApplicationUser> FindUser(string userName)
        {
            var user = await _manager.FindByNameAsync(userName);
            return user;
        }


        
        /// <summary>
        /// When connecting to hub adds to user list and sends the info to connected clients
        /// </summary>
        /// <returns></returns>
        public override Task OnConnected()
        {
            var userName = Context.User.Identity.Name;


            //Checks if the client is already in the user list
            string keyTest;
            if (userName == null || ConnectedUsers.Users.TryGetValue(userName, out keyTest))
            {
                //Tells the client side to disconnect client. Current way of fixing multiple browser tab issue
                Clients.Caller.onConnected(0);

            }

            else
            {
                //Changes online status to online
                _service.OnlineStatusToggle(userName, 1);

                //Creates a list of the users to send to the connecting client
                var returnList = new List<UserDetail>();
                foreach (var item in ConnectedUsers.Users.ToList())
                {
                    returnList.Add(new UserDetail
                    {
                        username = item.Key,
                        connectionId = item.Value
                    });
                }

                Clients.Caller.onConnected(returnList);


                //Adds new user to client list
                ConnectedUsers.Users.Add(userName, Context.ConnectionId);


                var newUser = new UserDetail
                {
                    username = userName,
                    connectionId = Context.ConnectionId
                };

                Clients.AllExcept(Context.ConnectionId).onNewUserConnected(newUser);
            }

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            

            if (ConnectedUsers.Users.ContainsValue(Context.ConnectionId))
            {
                //Gets set from user list to remove
                var userToRemovePair = ConnectedUsers.Users.Where(u => u.Value == Context.ConnectionId).FirstOrDefault();  

                //sets online status to false
                _service.OnlineStatusToggle(userToRemovePair.Key, 0); 
                
                //Removes client from userlist and lets clients know
                ConnectedUsers.Users.Remove(userToRemovePair.Key);
                Clients.All.onUserDisconnected(userToRemovePair.Key);


            }
            
            return base.OnDisconnected(stopCalled);
        }

        /// <summary>
        /// Sends message to everyone
        /// </summary>
        /// <param name="message">Recives the message object</param>
        public Task SendMessage(object message)
        {
           return Clients.All.newMessage(message);
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


        //Group Messaging

        public void JoinRoom (string roomName)
        {
            var userName = Context.User.Identity.Name;
            if(userName != null)
            {
               Groups.Add(Context.ConnectionId, roomName);
               
                

               Clients.Group(roomName).getGroupMessage("Server", userName + " has joined the chat!", roomName);
            }

            
            
        }

        //public Task LeaveRoom(string roomName)
        //{
        //    return Groups.Remove(Context.ConnectionId, roomName);
        //}

        public void SendGroupMessage(string userName, string message, string roomName)
        {
            if(userName != null)
            {
                 Clients.Group(roomName).getGroupMessage(userName, message, roomName);
            }
            
        }

    }

}
