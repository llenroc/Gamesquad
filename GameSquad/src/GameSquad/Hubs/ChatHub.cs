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
    

    

    /// <summary>
    /// Contains a hashset of connected users
    /// </summary>
    public static class ConnectedUsers
    {

        public static HashSet<string> Users = new HashSet<string>();
    }


    public class ChatHub : Hub
    {
        
        private ISignalrService _service;
        public ChatHub( ISignalrService service)
        {
           
            _service = service;

        }


        
        /// <summary>
        /// When connecting to hub adds to user list and sends the info to connected clients
        /// </summary>
        /// <returns></returns>
        public override Task OnConnected()
        {
            var userName = Context.User.Identity.Name;


            if (userName == null || ConnectedUsers.Users.Contains(userName))
            {
                //Tells the client side to disconnect client. Current way of fixing multiple browser tab issue
                Clients.Caller.onConnected(-1);

            }

            else
            {
                //Changes online status to online
                _service.OnlineStatusToggle(userName, true);


                var friendNames = _service.getFriends(userName);

                var friendList = new List<object>();

                //Iterates through the friendNames and checks if they are online in the Connected Users hashset
                foreach (var friend in friendNames)
                {


                    if (ConnectedUsers.Users.Contains(friend))
                    {
                        var newFriend = new
                        {
                            userName = friend,
                            online = true
                        };
                        friendList.Add(newFriend);
                        Clients.User(friend).onNewUserConnected(userName);
                    }
                    else
                    {
                        var newFriend = new
                        {
                            userName = friend,
                            online = false
                        };
                        friendList.Add(newFriend);
                    }

                }
                Clients.Caller.onConnected(friendList);


                //Checks notification amount
                var notificationCount = _service.NotificationCount(userName);
                Clients.Caller.notificationCount(notificationCount);



                //Adds new user to client list
                ConnectedUsers.Users.Add(userName);
                
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
            var userToRemove = Context.User.Identity.Name;


            
            if (userToRemove != null) 
            {

                //sets online status to false
                _service.OnlineStatusToggle(userToRemove, false);

                //Removes client from userlist and lets clients know
                var friendNames = _service.getFriends(userToRemove);
                foreach (var friend in friendNames)
                {
                    Clients.User(friend).onUserDisconnected(userToRemove);
                }
                ConnectedUsers.Users.Remove(userToRemove);
                

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
                if(roomName != null)
                {
                    Groups.Add(Context.ConnectionId, roomName);
                    Clients.Group(roomName).getGroupMessage("Server", userName + " has joined the chat!", roomName);
                }
               
            }
            
        }

        public void LeaveRoom (string roomName)
        {
            var userName = Context.User.Identity.Name;
            if(userName != null)
            {
                Groups.Remove(Context.ConnectionId, roomName);
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
