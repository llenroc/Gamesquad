using System.Collections.Generic;
using GameSquad.Models;
using System;
using System.Threading.Tasks;
using System.Security.Principal;

namespace GameSquad.Services
{
    public interface IUserService
    {
        List<ApplicationUser> GetAllUsers();
        Object GetUserById(string id, string uid);
        void SaveProfile(ApplicationUser user, string id);
        List<ApplicationUser> GetTableData(USearch _data);
    }
}