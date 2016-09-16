using GameSquad.Models;
using GameSquad.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace GameSquad.Services
{
    public class UserService : IUserService
    {
        private IGenericRepository _repo;
        public UserService(IGenericRepository repo)
        {
            _repo = repo;
        }

        public List<ApplicationUser> GetAllUsers()
        {
            var data = _repo.Query<ApplicationUser>().ToList();
            return data;
        }

        public ApplicationUser GetUserById(string id)
        {
            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == id).FirstOrDefault();
            return data;
        }
    }

    
}