using System.Collections.Generic;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface IFriendsService
    {
        List<Friend> GetFriends();
        List<ApplicationUser> GetFriendsById(string userId);
    }
}