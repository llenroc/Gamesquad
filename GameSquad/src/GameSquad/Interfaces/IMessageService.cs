using System.Collections.Generic;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface IMessageService
    {
        void DeleteMessage(int id);
        object getMessageInfo(int id);
        List<Messages> MsgsByUser(string id);
        void saveMessage(Messages message);
    }
}