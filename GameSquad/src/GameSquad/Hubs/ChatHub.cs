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

    /// <summary>
    /// Contains a dictionary of connected users
    /// </summary>
    public static class ConnectedUsers
    {
        //Username is key, connectionId is value
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

                var friendsList = _service.getFriends(userName);

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

        /// <summary>
        /// Determins what to do when a client disconnects
        /// </summary>
        /// <param name="stopCalled"></param>
        /// <returns></returns>
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
        public void SendMessage(string message)
        {
            var userName = Context.User.Identity.Name;
            Clients.All.newMessage(userName, message);
        }

        /// <summary>
        /// Sends a Private message
        /// </summary>
        /// <param name="privateMessage"></param>
        /// <param name="toUserName">The username for which user the message is going too</param>
        public void SendPrivateMessage( string privateMessage, string toUserName)
        {

            var fromUsername = Context.User.Identity.Name;

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
                    Clients.User(toUserName).getPrivateMessage(fromUsername, privateMessage, fromUsername);

                    //Clients.Client(toConnectionId).getPrivateMessage(fromUsername, privateMessage, fromUsername);
                    Clients.Caller.getPrivateMessage(fromUsername, privateMessage, toUserName);
                }

                
            }
            catch
            {
                var errorMsg = "Server: Unable to deliver message";
                Clients.Caller.getPrivateMessage(fromUsername, errorMsg, toUserName);
            }
        }


        
        /// <summary>
        /// Joins a group and alerts other group members
        /// </summary>
        /// <param name="roomName"></param>
        public void JoinRoom (string roomName)
        {
            var userName = Context.User.Identity.Name;
            if(userName != null)
            {
               Groups.Add(Context.ConnectionId, roomName);
               Clients.Group(roomName).getGroupMessage("Server", userName + " has joined the chat!", roomName);
            }
            
        }

        /// <summary>
        /// Sends a new group message
        /// </summary>
        /// <param name="message"></param>
        /// <param name="roomName"></param>
        public void SendGroupMessage(string message, string roomName)
        {
            var userName = Context.User.Identity.Name;
            if(userName != null)
            {
                 Clients.Group(roomName).getGroupMessage(userName, message, roomName);
            }
            
        }

    }

}
