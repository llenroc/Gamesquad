using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class Messages
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string SendingUser { get; set; }
        public string RecId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        //public string RecievingUserId { get; set; }
        public string Message { get; set; }
        public DateTime DateSent { get; set; }
        public bool HasBeenViewed { get; set; }

        public Messages()
        {
            HasBeenViewed = false;
        }

    }
}
