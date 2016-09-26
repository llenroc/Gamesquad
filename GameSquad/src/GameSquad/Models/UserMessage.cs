using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class UserMessage
    {
        public int Id { get; set; }
        public string SendingUserId { get; set; }
        public string RecievingUSerId { get; set; }
        public string Message { get; set; }
        public DateTime DateSent { get; set; }
    }
}
