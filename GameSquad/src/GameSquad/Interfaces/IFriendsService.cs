using System.Collections.Generic;
using GameSquad.Models;
using GameSquad.ViewModels;

namespace GameSquad.Services
{
    public interface IFriendsService
    {
        void addFriendToUser(string friendId, string userId);
        List<Friend> GetFriends();
        List<ApplicationUser> GetFriendsById(string id);
        List<FriendCheckVM> GetFriendsByUser(string userId);
        List<FriendCheckVM> GetAllFriendsByUser(string userId);
        void RemoveFriend(string userId, string friendId);
    }
}