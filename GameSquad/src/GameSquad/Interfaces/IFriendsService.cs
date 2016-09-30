using System.Collections.Generic;
using GameSquad.Models;
using System;

namespace GameSquad.Services
{
    public interface IFriendsService
    {
        List<ApplicationUser> GetFriendsById(string id);
        List<Friend> GetFriends();
        Object GetFriendsByUser(string userId);
    }
}