﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class Friend
    {

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string FriendId { get; set; }
        

    }
}
