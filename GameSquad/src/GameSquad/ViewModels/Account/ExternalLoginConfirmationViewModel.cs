using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.ViewModels.Account
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        public string Username { get; set; }
    }
}
