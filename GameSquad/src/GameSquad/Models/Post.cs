using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string comment { get; set; }
        public string item { get; set; }
        public string UserId { get; set; }
        //[ForeignKey("UserName")]
        public string User { get; set; }


    }
}
