using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class UserProfileService : IUserProfileService
    {
        private IGenericRepository _repo;
        private UserManager<ApplicationUser> _manager;
        private UserProfileService(IGenericRepository repo, UserManager<ApplicationUser> manager)
        {
            _repo = repo;
            _manager = manager;

        }
        
        //save/create userProfile
        public async Task SaveUserInfo(IPrincipal user, ApplicationUser aUser)
        {
            var appUser = await _manager.FindByIdAsync(user.Identity.AuthenticationType);
            aUser.Id = appUser.Id;
            aUser.UserName = appUser.UserName;
            aUser.BattleNetUser = appUser.BattleNetUser;
            aUser.Bio = appUser.Bio;
            aUser.Location = appUser.Location;
            aUser.Platform = appUser.Platform;
            aUser.ProfileImage = appUser.ProfileImage;

            _repo.Update(aUser);
        }
    }
}
