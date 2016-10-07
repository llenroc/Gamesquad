using GameSquad.Data;
using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class SignalrService : ISignalrService
    {
        private IGenericRepository _repo;
        private UserManager<ApplicationUser> _manager;
        private DbContextOptions<ApplicationDbContext> _options;




        public SignalrService(IGenericRepository repo, UserManager<ApplicationUser> manager, DbContextOptions<ApplicationDbContext> options)
        {
            _repo = repo;
            _manager = manager;
            _options = options;
            
        }

        public int NotificationCount(string userName)
        {
            

            using (var db = new ApplicationDbContext(_options)) {
                var user = db.Users.Where(u => u.UserName == userName).Include(u => u.FreindRequests).Include(m => m.Messages).FirstOrDefault();

                var messageCount = user.Messages.Where(m => m.HasBeenViewed == false).Count();
                var friendRequests = user.FreindRequests.Where(f => f.HasBeenViewed == false).Count();

                return messageCount + friendRequests;
            }
        }

        public void OnlineStatusToggle(string userName, int onOrOff)
        {
           
           

            using (var db = new ApplicationDbContext(_options))
            {
                var user = db.Users.Where(u => u.UserName == userName).FirstOrDefault();
                if (onOrOff == 0)
                {
                    user.IsOnline = false;
                }
                else
                {
                    user.IsOnline = true;
                }

                db.Update(user);
                db.SaveChanges();
            }
        }

    }
}
