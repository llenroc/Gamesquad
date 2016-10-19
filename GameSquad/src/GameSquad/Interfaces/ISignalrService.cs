using System.Collections.Generic;

namespace GameSquad.Services
{
    public interface ISignalrService
    {
        int NotificationCount(string userName);
        void OnlineStatusToggle(string userName, bool onOrOff);
        List<string> getFriends(string userName);
    }
}