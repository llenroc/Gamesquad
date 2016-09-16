using System.Collections.Generic;
using System.Security.Principal;
using GameSquad.Models;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public interface IPostService
    {
        void DeletePost(int id);
        Post GetPostById(int id);
        List<Post> GetPosts();
        ApplicationUser GetUserByName(string UserName);
        Task SavePost(IPrincipal user, Post post);
    }
}