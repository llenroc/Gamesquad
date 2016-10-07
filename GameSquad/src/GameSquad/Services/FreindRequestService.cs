using GameSquad.Models;
using GameSquad.Repositories;
using GameSquad.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class FreindRequestService : IFreindRequestService
    {

        private IGenericRepository _repo;
        private UserManager<ApplicationUser> _manager;

        public FreindRequestService(IGenericRepository repo, UserManager<ApplicationUser> manager)
        {
            _repo = repo;
            _manager = manager;
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

            var dupcheck = userToSend.FreindRequests.Where(u => u.RecievingUSerId == userTo && u.SendingUserId == userFrom).Count();

            if (dupcheck == 0)
            {
                userToSend.FreindRequests.Add(newRequest);

                _repo.SaveChanges();
            }

            

        }

    }
}
