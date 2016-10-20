using GameSquad.Hubs;
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

namespace GameSquad.Services
{
    public class FreindRequestService : IFreindRequestService
    {
        private IHubContext _hubManager;
        private IGenericRepository _repo;
        private UserManager<ApplicationUser> _manager;

        public FreindRequestService(IGenericRepository repo, UserManager<ApplicationUser> manager)
        {
            _repo = repo;
            _manager = manager;
            _hubManager = Startup.ConnectionManager.GetHubContext<ChatHub>();
        }

        public List<FriendRequest> FriendRequestsByUser(string userId)
        {
            var user = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).Include(u => u.FreindRequests).FirstOrDefault();
            var friendRequests = user.FreindRequests;

            foreach (var request in friendRequests)
            {
                request.HasBeenViewed = true;
                _repo.Update(request);
            }

            _repo.SaveChanges();
            return friendRequests.ToList();

        }


        public void SendRequest(string userTo, string userFrom)
        {
            var userFromSent = _repo.Query<ApplicationUser>().Where(u => u.Id == userFrom).FirstOrDefault();
            var userToSend = _repo.Query<ApplicationUser>().Where(u => u.Id == userTo).Include(u => u.FreindRequests).FirstOrDefault();


            FriendRequest newRequest = new FriendRequest();
            newRequest.RecievingUSerId = userTo;
            newRequest.SendingUserId = userFrom;
            newRequest.SendingUserName = userFromSent.UserName;
            newRequest.HasBeenViewed = false;
            newRequest.RequestIsApproved = false;

            var dupcheck = userToSend.FreindRequests.Where(u => u.RecievingUSerId == userTo && u.SendingUserId == userFrom).Count();

            if (dupcheck == 0)
            {
                userToSend.FreindRequests.Add(newRequest);

                var add = new Friend
                {
                    User = userFromSent,
                    UserId = userFrom,
                    FriendId = userTo,
                    Active = false
                };
                var data = new Friend
                {
                    User = userToSend,
                    UserId = userTo,
                    FriendId = userFrom,
                    Active = false
                };

                _repo.Add(add);

                if (userFrom != userTo)
                {
                    _repo.Add(data);
                }

                _repo.SaveChanges();

                //Signalr Stuff for push notifications
                _hubManager.Clients.User(userToSend.UserName).newNotification();
            }

        }

        public void RemoveRequest(string userTo, string userFrom)
        {
            var userFromSent = _repo.Query<FriendRequest>().Where(u => u.SendingUserId == userFrom).Where(c => c.RecievingUSerId == userTo).FirstOrDefault();

            _repo.Delete(userFromSent);
            _repo.SaveChanges();

            var f1 = _repo.Query<Friend>().Where(u => u.UserId == userTo && u.FriendId == userFrom).FirstOrDefault();
            var f2 = _repo.Query<Friend>().Where(u => u.UserId == userFrom && u.FriendId == userTo).FirstOrDefault();

            if(!f1.Active)
            {
                _repo.Delete(f1);
                _repo.SaveChanges();
                _repo.Delete(f2);
                _repo.SaveChanges();
            }
        }

    }
}
