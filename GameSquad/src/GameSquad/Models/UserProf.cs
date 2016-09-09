using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class UserProf
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        public string  Bio { get; set; }
        public string Location { get; set; }
        public string Platform { get; set; }
    }
}
