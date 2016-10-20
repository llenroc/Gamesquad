using GameSquad.Hubs;
using GameSquad.Models;
using GameSquad.Repositories;
using GameSquad.ViewModels;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class FriendsService : IFriendsService
    {
        private IHubContext _hubManager;
        private IGenericRepository _repo;
        public FriendsService(IGenericRepository repo)
        {
            _repo = repo;
            _hubManager = Startup.ConnectionManager.GetHubContext<ChatHub>();
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

        public List<FriendCheckVM> GetFriendsByUser(string userId)
        {

            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).Select(f => new
            {
                Friends = f.Friends.Where(a => a.Active == true).Select(u => u.FriendId).ToList(),
            }).FirstOrDefault();
            List<FriendCheckVM> nFriends = new List<FriendCheckVM>();
            foreach (var a in data.Friends)
            {
                var b = _repo.Query<ApplicationUser>().Where(u => u.Id == a).Select(u => new FriendCheckVM
                {
                    Username = u.UserName,
                    Id = u.Id,
                    Rank = u.Rank
                }).FirstOrDefault();
                nFriends.Add(b);
            }
            return nFriends;
        }

        public List<FriendCheckVM> GetAllFriendsByUser(string userId)
        {

            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).Select(f => new
            {
                Friends = f.Friends.Select(u => u.FriendId).ToList(),
            }).FirstOrDefault();
            List<FriendCheckVM> nFriends = new List<FriendCheckVM>();
            foreach (var a in data.Friends)
            {
                var b = _repo.Query<ApplicationUser>().Where(u => u.Id == a).Select(u => new FriendCheckVM
                {
                    Username = u.UserName,
                    Id = u.Id,
                    Rank = u.Rank
                }).FirstOrDefault();
                nFriends.Add(b);
            }
            return nFriends;
        }


        public void addFriendToUser(string friendId, string userId)
        {
            var user = _repo.Query<ApplicationUser>().FirstOrDefault(c => c.Id == userId);
            var friend = _repo.Query<ApplicationUser>().FirstOrDefault(c => c.Id == friendId);

            var f1 = _repo.Query<Friend>().Where(u => u.UserId == userId && u.FriendId == friendId).FirstOrDefault();
            var f2 = _repo.Query<Friend>().Where(u => u.UserId == friendId && u.FriendId == userId).FirstOrDefault();

            f1.Active = true;
            f2.Active = true;

            _repo.SaveChanges();

            //Signalr Test stuff for insta updating friends list
            _hubManager.Clients.User(user.UserName).onNewUserConnected(friend.UserName);
            _hubManager.Clients.User(friend.UserName).onNewUserConnected(user.UserName);

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

            //Signalr Test stuff for insta updating friends list
            var user = _repo.Query<ApplicationUser>().FirstOrDefault(c => c.Id == userId);
            var friend = _repo.Query<ApplicationUser>().FirstOrDefault(c => c.Id == friendId);
            _hubManager.Clients.User(user.UserName).onFriendRemoved(friend.UserName);
            _hubManager.Clients.User(friend.UserName).onFriendRemoved(user.UserName);

        }


    }
}