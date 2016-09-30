using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class MessageService : IMessageService
    {
        private IGenericRepository _repo;
        public MessageService(IGenericRepository repo)
        {
            _repo = repo;
        }

        //get messages by user
        public List<Messages> MsgsByUser(string id)
        {
            var messages = new List<Messages>();
            var msg = _repo.Query<ApplicationUser>().Where(a => a.Id == id).Include(m => m.Messages).FirstOrDefault();
            messages = msg.Messages.ToList();
            return messages;

        }

        //get message info by id
        public object getMessageInfo(int id)
        {
            var _data = _repo.Query<Messages>().Where(m => m.Id == id).Select(m => new
            {
                Id = m.Id,
                Subject = m.Subject,
                Message = m.Message
            }).FirstOrDefault();
            return _data;
        }


        //save Message

        public void saveMessage(Messages message)
        {
            if(message.Id == 0)
            {
                _repo.Add(message);
            }          
        }


        //delete Message

        public void DeleteMessage(int id)
        {
            var messageToDelete = this.getMessageInfo(id);
            _repo.Delete(messageToDelete);

        }
    }
}
