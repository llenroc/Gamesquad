using GameSquad.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.ViewModels
{
    public class FriendCheckReturnVM
    {
        public ApplicationUser User { get; set; }
        public bool IsFriend { get; set; }
    }
}
