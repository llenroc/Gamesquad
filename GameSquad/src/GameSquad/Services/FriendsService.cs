using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.EntityFrameworkCore;
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
        public List<Friend> GetFriends()
        { 
            var data = _repo.Query<Friend>().ToList();
            return data;
        }

        public List<ApplicationUser> GetFriendsById(string id)
        {
            var data = _repo.Query<Friend>().Where(f => f.FriendId == id).Select(u => u.User).ToList();
            return data;
        }

        public Object GetFriendsByUser(string userId)
        {
            
            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).Select(f => new {
                Friends = f.Friends.Select(u => u.FriendId).ToList(),
                UserName = f.UserName,
                Id = f.Id,
                Rank = f.Rank
           
            }).FirstOrDefault();
            List<Object> nFriends = new List<Object>(); 
            foreach(var a in data.Friends)
            {
                var b = _repo.Query<ApplicationUser>().Where(u => u.Id == a).Select(u => new {
                    UserName = u.UserName,
                    Id = u.Id,
                    Rank = u.Rank
                }).FirstOrDefault();
                nFriends.Add(b); 
            }
            return nFriends;
        }

       

    }
}