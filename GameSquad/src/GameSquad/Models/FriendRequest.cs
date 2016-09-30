using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class FriendRequest
    {
        public int Id { get; set; }
        [ForeignKey("UserId")]
        public string SendingUserId { get; set; }
        public string RecievingUSerId { get; set; }

        public string SendingUserName { get; set; }

        public string MessageText { get; set; }
        public DateTime DateSent { get; set; }
        public bool RequestIsApproved { get; set; }
        public bool HasBeenViewed { get; set; }

        public FriendRequest()
        {
            HasBeenViewed = false;
        }

    }
}
