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

            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).Select(f => new
            {
                Friends = f.Friends.Select(u => u.FriendId).ToList(),
                UserName = f.UserName,
                Id = f.Id,
                Rank = f.Rank

            }).FirstOrDefault();
            List<Object> nFriends = new List<Object>();
            foreach (var a in data.Friends)
            {
                var b = _repo.Query<ApplicationUser>().Where(u => u.Id == a).Select(u => new
                {
                    UserName = u.UserName,
                    Id = u.Id,
                    Rank = u.Rank
                }).FirstOrDefault();
                nFriends.Add(b);
            }
            return nFriends;
        }


        public void addFriendToUser(string friendId, string userId)
        {
            var add = new Friend
            {
                User = _repo.Query<ApplicationUser>().FirstOrDefault(c => c.Id == userId),
                UserId = userId,
                FriendId = friendId
            };
            var data = new Friend
            {
                User = _repo.Query<ApplicationUser>().FirstOrDefault(c => c.Id == friendId),
                UserId = friendId,
                FriendId = userId
            };

            _repo.Add(add);

            if (friendId != userId)
            {
                _repo.Add(data);
            }


            _repo.SaveChanges();
        }

        public void RemoveFriend(string userId, string friendId)
        {
            var userFriendList = _repo.Query<Friend>().Where(f => f.UserId == userId).ToList();
            var remove = userFriendList.Where(f => f.FriendId == friendId).FirstOrDefault();
            var friendFriendList = _repo.Query<Friend>().Where(f => f.UserId == friendId).ToList();
            var remove2 = friendFriendList.Where(c => c.FriendId == userId).FirstOrDefault();


            _repo.Delete(remove);
            _repo.SaveChanges();
            _repo.Delete(remove2);
            _repo.SaveChanges();
        }


    }
}