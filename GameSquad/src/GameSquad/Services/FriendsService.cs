using GameSquad.Models;
using GameSquad.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class FriendsService : IFriendsService
    {
        private IGenericRepository _repo;
        public FriendsService(IGenericRepository repo)
        {
            _repo = repo; 
        }
        public List<ApplicationUser> GetFriendsById(string userId)
        {
            var data = _repo.Query<Friend>().Where(tm => tm.FriendId == userId).Select(u => u.User).ToList();
            return data;
        }

        public List<Friend> GetFriends()
        {
            var data = _repo.Query<Friend>().ToList();
            return data;
        }
    }
}
