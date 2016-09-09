using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string TeamName { get; set; }
        public string PlayStyle { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser TeamLeader { get; set; }
        public ICollection<ApplicationUser> Members { get; set; }
    }
}
