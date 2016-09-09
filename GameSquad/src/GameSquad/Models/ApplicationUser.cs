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

        public string ProfileImage { get; set; }

        //TODO: update when battle.net integration is implemented
        public string BattleNetUser { get; set; }

        //TODO: update when uploading items is implmented
        //public List<string> UploadedItems { get; set; }

        //TODO: update when ranking is implemented
        public int Rank { get; set; }

    }
}
