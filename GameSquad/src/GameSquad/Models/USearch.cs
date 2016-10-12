﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Models
{
    public class USearch
    {
        public string Username { get; set; }
        public int RankFrom { get; set; }
        public int RankTo { get; set; }
        public bool OnlineOnly { get; set; }
        public string LookingFor { get; set; }
    }
}