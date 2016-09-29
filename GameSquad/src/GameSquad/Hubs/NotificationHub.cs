using GameSquad.Models;
using GameSquad.Repositories;
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
        private UserManager<ApplicationUser> _manager;
        private IGenericRepository _repo;
        public NotificationHub(UserManager<ApplicationUser> manager, IGenericRepository repo)
        {
            _manager = manager;
            _repo = repo;

        }

        public async Task<ApplicationUser> FindUser(string userName)
        {
            var user = await _manager.FindByNameAsync(userName);
            return user;
        }

        public void NotificationCheck(string userName)
        {
            //var user = FindUser(userName).Result;
            //var user = _repo.Query<ApplicationUser>().Where(u => u.UserName == userName);
            var user = _repo.Query<ApplicationUser>().Where(u => u.UserName == userName).Include(u => u.FreindRequests).FirstOrDefault();

            Random r = new Random();

            var testNum = r.Next(100);

            

            //var messageCount = user.UserInbox.Messages.Count();

            var friendRequests = user.FreindRequests.Count();

            //Clients.Caller.notificationCount(testNum);
            Clients.Caller.notificationCount(friendRequests);

        }
    }
}
