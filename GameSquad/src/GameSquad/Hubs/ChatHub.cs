using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Hubs
{
    public class ChatHub : Hub
    {
        public void SendMessage(object message)
        {
            Clients.All.newMessage(message);
        }
    }
}
