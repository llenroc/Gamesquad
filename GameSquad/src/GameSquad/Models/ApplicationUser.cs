using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace GameSquad.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        //TODO: update when battle.net integration is implemented
        public string BattleNetUser { get; set; }

        //TODO: update when uploading items is implmented
        //public List<string> UploadedItems { get; set; }

        //TODO: update when ranking is implemented
        public int Rank { get; set; }
        //freinds
        public List<Friend> Friends { get; set; }

        public ICollection<FriendRequest> FreindRequests { get; set; }
        //messages
        public ICollection<UserMessage> UserMessages { get; set; }
        //message and requests inbox
        public Inbox UserInbox { get; set; }

        //teams
        public ICollection<TeamMembers> TeamMembers { get; set; }

        //
        //user profile (data model) removed merged with appuse.
        //bio for user dashboard
        public string Bio { get; set; }
        //location (optional) 
        public string Location { get; set; }
        //gaming platform (console / pc)
        public string Platform { get; set; }
        //profile image prop    
        public string ProfileImage { get; set; }
    }
}
