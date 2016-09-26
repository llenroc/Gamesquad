using System.Security.Principal;
using System.Threading.Tasks;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface IUserProfileService
    {
      
        Task SaveUserInfo(IPrincipal user, ApplicationUser aUser);
    }
}