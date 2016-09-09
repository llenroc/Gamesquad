using System.Collections.Generic;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface IUserService
    {
        List<ApplicationUser> GetAllUsers();
    }
}