using GameSquad.Models;
using GameSquad.Repositories;
using GameSquad.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Hubs
{
    public class NotificationHub : Hub
    {
        //private UserManager<ApplicationUser> _manager;
        //private IGenericRepository _repo;
        private ISignalrService _service;
        public NotificationHub( ISignalrService service)
        {
           
            _service = service;

        }

        
        /// <summary>
        /// Checks for notificatiosn for a user
        /// </summary>
        /// <returns></returns>
        public Task NotificationCheck()
        {
            var userName = Context.User.Identity.Name;

            if(userName != null)
            {
                var notificationCount = _service.NotificationCount(userName);
                return Clients.Caller.notificationCount(notificationCount);

            }
            return null;


        }

        
    }
}
