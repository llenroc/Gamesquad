using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class Inbox
    {
        public int Id { get; set; }
        public ICollection<FriendRequest> FreindRequests { get; set; }
        //public ICollection<UserMessage> Messages { get; set; }
        public ApplicationUser User { get; set; }
        [ForeignKey("UserId")]
        public string UserId { get; set; }
    }
}
