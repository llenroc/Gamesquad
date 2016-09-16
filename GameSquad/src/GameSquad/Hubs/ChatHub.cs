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
        public static HashSet<UserDetail> Users = new HashSet<UserDetail>();

    }

    public class ChatHub : Hub
    {
        

        /// <summary>
        /// What happens when a client connects to the hub
        /// </summary>
        /// <param name="userName">Gets the username </param>
        public void Connect(string userName)
        {
            var newUser = new UserDetail { ConnectionId = Context.ConnectionId, Username = userName };

            if(ConnectedUsers.Users.Count(u => u.ConnectionId == newUser.ConnectionId) == 0)
            {
                Clients.Caller.onConnected(ConnectedUsers.Users);
                ConnectedUsers.Users.Add(newUser);

                Clients.AllExcept(Context.ConnectionId).onNewUserConnected(newUser);
            }
            

        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var userToRemove = ConnectedUsers.Users.FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            if (userToRemove != null)
            {
                ConnectedUsers.Users.Remove(userToRemove);
                Clients.All.onUserDisconnected(userToRemove.Username);
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

        public void SendPrivateMessage(string fromUsername, string privateMessage, string toUserName)
        {
            var toUser = ConnectedUsers.Users.FirstOrDefault(u => u.Username == toUserName);

            if (toUser != null)
            {
                Clients.Client(toUser.ConnectionId).getPrivateMessage(fromUsername, privateMessage, fromUsername);
                Clients.Caller.getPrivateMessage(fromUsername, privateMessage, toUserName);
            }
        }

    }

}
