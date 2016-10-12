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
    public class UserService : IUserService
    {
        private UserManager<ApplicationUser> _manager;
        private IGenericRepository _repo;
        public UserService(IGenericRepository repo, UserManager<ApplicationUser> manager)
        {
            _repo = repo;
            _manager = manager;
        }

        public List<ApplicationUser> GetAllUsers()
        {
            var data = _repo.Query<ApplicationUser>().ToList();
            return data;
        }

        public List<ApplicationUser> GetTableData(USearch _data)
        {
            List<ApplicationUser> data = null; // = _repo.Query<ApplicationUser>().Skip(5 * pId).Take(5).ToList();
            return data;
        }

        public Object GetUserById(string id)
        {
            
            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == id).Select(u => new {
                UserName = u.UserName,
                Bio = u.Bio,
                Location = u.Location,
                Platform = u.Platform,
                ProfileImage = u.ProfileImage,
                PlayStyle = u.PlayStyle,
                BannerImage = u.BannerImage,
                Rank = u.Rank
            }).FirstOrDefault();
            return data;
        }

        public void SaveProfile(ApplicationUser user, string id)
        {
            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == id).FirstOrDefault();
            data.Bio = user.Bio;
            data.Location = user.Location;
            data.Platform = user.Platform;
            data.Rank = user.Rank;
            data.PlayStyle = user.PlayStyle;
            data.BannerImage = user.BannerImage;
            data.ProfileImage = user.ProfileImage;

            _repo.SaveChanges();

        }
            
        }
    }

    
