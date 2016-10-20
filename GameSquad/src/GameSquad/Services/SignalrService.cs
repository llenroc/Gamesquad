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

        /// <summary>
        /// Gets the count of unread notifications for a user
        /// </summary>
        /// <param name="userName">Username of the person you want to check</param>
        /// <returns></returns>
        public int NotificationCount(string userName)
        {
            

            using (var db = new ApplicationDbContext(_options)) {
                var user = db.Users.Where(u => u.UserName == userName).Include(u => u.FreindRequests).Include(m => m.Messages).FirstOrDefault();

                var messageCount = user.Messages.Where(m => m.HasBeenViewed == false).Count();
                var friendRequests = user.FreindRequests.Where(f => f.HasBeenViewed == false).Count();

                return messageCount + friendRequests;
            }
        }

        /// <summary>
        /// Toggles the online status in the database to be true or false depending on if they are connecting or not
        /// </summary>
        /// <param name="userName">username of the user you want to change</param>
        /// <param name="onOrOff">pass 0 to set online false, any other for true</param>
        public void OnlineStatusToggle(string userName, bool onOrOff)
        {
           
           

            using (var db = new ApplicationDbContext(_options))
            {

                var user = db.Users.Where(u => u.UserName == userName).FirstOrDefault();
                if (user != null)
                {
                    if (!onOrOff)
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

        /// <summary>
        /// Gets a string list of the friends for a user
        /// </summary>
        /// <param name="userName">The username of the user you want to get friends for</param>
        /// <returns></returns>
        public List<string> getFriends(string userName) {

            using (var db = new ApplicationDbContext(_options))
            {
                
                var user = db.Users.Where(u => u.UserName == userName).Include(u => u.Friends).FirstOrDefault();
                if (user != null)
                {

                    List<string> friendsList = new List<string>();
                    foreach (var friend in user.Friends)
                    {
                        if(friend.Active == true)
                        {
                            var friendUser = _manager.FindByIdAsync(friend.FriendId).Result;

                            friendsList.Add(friendUser.UserName);
                        }
                        
                    }

                    return friendsList;

                }
                return null;
                
                
            }
        }

    }
}
