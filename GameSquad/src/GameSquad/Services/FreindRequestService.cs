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


        public void SendRequest(string userTo, string userFrom)
        {
            FriendRequest newRequest = new FriendRequest();
            newRequest.RecievingUSerId = userTo;
            newRequest.SendingUserId = userFrom;

            var userToSend = _repo.Query<ApplicationUser>().Where(u => u.Id == userTo).Include(u => u.FreindRequests).FirstOrDefault();

            var dupcheck = userToSend.FreindRequests.Where(u => u.RecievingUSerId == userTo && u.SendingUserId == userFrom).Count();

            if (dupcheck == 0)
            {
                userToSend.FreindRequests.Add(newRequest);

                _repo.SaveChanges();
            }

            

        }

    }
}
