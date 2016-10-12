using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class TSearch
    {
        public int PageCount { get; set; }
        public string LeaderFilter { get; set; }
        public string NameFilter { get; set; }
        public string TypeFilter { get; set; }
    }
}
