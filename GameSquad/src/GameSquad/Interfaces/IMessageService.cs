using GameSquad.Models;
using System.Collections.Generic;

namespace GameSquad.Services
{
    public interface IMessageService
    {
        List<Messages> MsgsByUser(string id);
        object getMessageInfo(int id);
    }
}