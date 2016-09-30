using System.Collections.Generic;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface IMessageService
    {
        void DeleteMessage(int id);
        object getMessageInfo(int id);
        object MsgsByUser(string id);
        void sendMessage(Messages message);
    }
}