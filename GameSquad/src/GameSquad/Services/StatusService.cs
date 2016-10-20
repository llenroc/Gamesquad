using GameSquad.Models;
using GameSquad.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Services
{


    public class StatusService : IStatusService
    {

        private IGenericRepository _repo;
        public StatusService(IGenericRepository repo)
        {
            _repo = repo;
        }

        public void SaveStatus(string userId, string lookingFor, string statusMessage) {
            var user = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).FirstOrDefault();

            user.LookingFor = lookingFor;
            user.StatusMessage = statusMessage;

            _repo.Update(user);
            _repo.SaveChanges(); 
        }
    }
}
