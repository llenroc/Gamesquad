using System.Collections.Generic;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface IFreindRequestService
    {
        List<FriendRequest> FriendRequestsByUser(string userId);
        void RemoveRequest(string userTo, string userFrom);
        void SendRequest(string userTo, string userFrom);
    }
}