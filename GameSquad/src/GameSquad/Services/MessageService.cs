using GameSquad.Hubs;
using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class MessageService : IMessageService
    {
        private IHubContext _hubManager;
        private IGenericRepository _repo;
        private UserManager<ApplicationUser> _manager;
        public MessageService(IGenericRepository repo, UserManager<ApplicationUser> manager)
        {
            _repo = repo;
            _manager = manager;
            _hubManager = Startup.ConnectionManager.GetHubContext<ChatHub>(); 
        }

        //get messages by user
        public object MsgsByUser(string id)
        {
            //var messages = new List<Messages>();
            var msg2 = _repo.Query<ApplicationUser>().Where(a => a.Id == id).Include(m => m.Messages).Select(m => new
            {
                messages = m.Messages
            }).FirstOrDefault();
            var msg = _repo.Query<ApplicationUser>().Where(a => a.Id == id).Include(m => m.Messages).FirstOrDefault();

            var msgList = msg.Messages;

            foreach (var singleMessage in msgList)
            {
                singleMessage.HasBeenViewed = true;
                _repo.Update(singleMessage);

            }

            //var msgList = messages;
            
            _repo.SaveChanges();


            //messages = msg.Messages.ToList();
            //return msg;
            return msg2;

        }

        //get message info by id
        public object getMessageInfo(int id)
        {
            var _data = _repo.Query<Messages>().Where(m => m.Id == id).Select(m => new
            {
                Id = m.Id,
                Subject = m.Subject,
                Message = m.Message,
                SendingUser = m.SendingUser,
                DateSent = m.DateSent

            }).FirstOrDefault();
            return _data;
        }


        //save Message

        public void sendMessage(Messages message)
        {
            var rUser = _repo.Query<ApplicationUser>().Where(a => a.Id == message.RecId).Include(m => m.Messages).FirstOrDefault();
            message.DateSent = DateTime.Now;
            rUser.Messages.Add(message);

            _repo.SaveChanges();
            _hubManager.Clients.User(rUser.UserName).newNotification();


        }


        //delete Message

        public void DeleteMessage(int id)
        {
            var messageToDelete = _repo.Query<Messages>().Where(m => m.Id == id).FirstOrDefault();
            _repo.Delete(messageToDelete);

        }
    }
}
