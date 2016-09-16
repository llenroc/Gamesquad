using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameSquad.Models
{
    public class TeamMembers
    {
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public int TeamId { get; set; }
        public Team Team { get; set; }
    }
}
