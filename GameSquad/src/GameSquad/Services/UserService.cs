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
            var pageCount = _data.PageCount;
            var username = _data.Username ?? "";
            var rankFrom = _data.RankFrom;
            var rankTo = _data.RankTo;
            var platform = _data.Platform;
            var currentUser = _data.CurrentUser;
            
            List<ApplicationUser> data;
            if(_data.OnlineOnly)
            {
                if(_data.LookingFor == "")
                {
                    data = _repo.Query<ApplicationUser>().Where(u => u.UserName.Contains(username) && u.Rank >= rankFrom && u.Rank <= rankTo && u.Platform.Contains(platform) && u.IsOnline == true && u.Id != currentUser).Skip(5 * pageCount).Take(5).ToList();
                }
                else
                {
                    data = _repo.Query<ApplicationUser>().Where(u => u.UserName.Contains(username) && u.Rank >= rankFrom && u.Rank <= rankTo && u.Platform.Contains(platform) && u.IsOnline == true && u.LookingFor.Contains(_data.LookingFor) && u.Id != currentUser).Skip(5 * pageCount).Take(5).ToList();
                }
            }
            else
            {
                if(_data.LookingFor == "")
                {
                    data = _repo.Query<ApplicationUser>().Where(u => u.UserName.Contains(username) && u.Rank >= rankFrom && u.Rank <= rankTo && u.Platform.Contains(platform) && u.Id != currentUser).Skip(5 * pageCount).Take(5).ToList();
                }
                else
                {
                    data = _repo.Query<ApplicationUser>().Where(u => u.UserName.Contains(username) && u.Rank >= rankFrom && u.Rank <= rankTo && u.Platform.Contains(platform) && u.LookingFor.Contains(_data.LookingFor) && u.Id != currentUser).Skip(5 * pageCount).Take(5).ToList();
                }
            }
            return data;
        }

        public Object GetUserById(string id, string uid)
        {
            var check = _repo.Query<ApplicationUser>().Where(u => u.Id == uid).FirstOrDefault();
            if(id == check.UserName)
            {
                id = uid;
            }
            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == id).Select(u => new {
                UserName = u.UserName,
                Bio = u.Bio,
                Location = u.Location,
                Platform = u.Platform,
                ProfileImage = u.ProfileImage,
                PlayStyle = u.PlayStyle,
                BannerImage = u.BannerImage,
                Rank = u.Rank,
                StatusMessage = u.StatusMessage,
                LookingFor = u.LookingFor,
                Posts = _repo.Query<Post>().Where(p => p.UserId == id).ToList()
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

    
