﻿using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class MessageService : IMessageService
    {
        private IGenericRepository _repo;
        private UserManager<ApplicationUser> _manager;
        public MessageService(IGenericRepository repo, UserManager<ApplicationUser> manager)
        {
            _repo = repo;
            _manager = manager;
        }

        //get messages by user
        public object MsgsByUser(string id)
        {
            var messages = new List<Messages>();
            var msg = _repo.Query<ApplicationUser>().Where(a => a.Id == id).Include(m => m.Messages).Select(m => new {
                messages = m.Messages
            }).FirstOrDefault();
            //messages = msg.Messages.ToList();
            return msg;

        }

        //get message info by id
        public object getMessageInfo(int id)
        {
            var _data = _repo.Query<Messages>().Where(m => m.Id == id).Select(m => new
            {
                Id = m.Id,
                Subject = m.Subject,
                Message = m.Message,
                Sender = m.SendingUser

            }).FirstOrDefault();
            return _data;
        }


        //save Message

        public void sendMessage(Messages message)
        {
            var rUser = _repo.Query<ApplicationUser>().Where(a => a.Id == message.RecId).Include(m => m.Messages).FirstOrDefault();
            rUser.Messages.Add(message);

            _repo.SaveChanges();
                      
        }


        //delete Message

        public void DeleteMessage(int id)
        {
            var messageToDelete = this.getMessageInfo(id);
            _repo.Delete(messageToDelete);

        }
    }
}