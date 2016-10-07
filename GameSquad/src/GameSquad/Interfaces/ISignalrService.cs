﻿namespace GameSquad.Services
{
    public interface ISignalrService
    {
        int NotificationCount(string userName);
        void OnlineStatusToggle(string userName, int onOrOff);
    }
}