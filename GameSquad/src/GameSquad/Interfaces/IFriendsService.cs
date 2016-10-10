using System.Collections.Generic;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface IFriendsService
    {
        void addFriendToUser(string friendId, string userId);
        List<Friend> GetFriends();
        List<ApplicationUser> GetFriendsById(string id);
        object GetFriendsByUser(string userId);
        void RemoveFriend(string userId, string friendId);
    }
}