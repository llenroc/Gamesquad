using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;


namespace GameSquad.Services
{
    public class PostService : IPostService
    {
        private IGenericRepository _repo;
        private UserManager<ApplicationUser> _manager;
        public PostService(IGenericRepository repo, UserManager<ApplicationUser> manager)
        {
            _repo = repo;
            _manager = manager;
        }
        public List<Post> GetPosts()
        {
            var data = _repo.Query<Post>().ToList();
            return data;
        }
        //get post by id
        public Post GetPostById(int id)
        {
            var data = _repo.Query<Post>().Where(p => p.Id == id).FirstOrDefault();
            return data;
        }
        //save post
        public async Task SavePost(IPrincipal user, Post post)
        {
            var appUser = await _manager.FindByNameAsync(user.Identity.Name);
            post.UserId = appUser.Id;
            post.User = appUser.UserName;

            if (post.Id == 0)
            {
                _repo.Add(post);
            }

            else
            {
                _repo.Update(post);
            }


        }
        //delete post by id
        public void DeletePost(int id)
        {
            var postToDelete = this.GetPostById(id);
            _repo.Delete(postToDelete);
        }

        //get username
        //not in use
        public ApplicationUser GetUserByName(string userName)
        {
            var data = _repo.Query<ApplicationUser>().Where(u => u.UserName == userName).FirstOrDefault();
            return data;
        }
    }
    
}
