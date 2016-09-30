using GameSquad.Models;
using System.Collections.Generic;

namespace GameSquad.Services
{
    public interface IFreindRequestService
    {
        void SendRequest(string userTo, string userFrom);
        List<FriendRequest> FriendRequestsByUser(string userId);
    }
}