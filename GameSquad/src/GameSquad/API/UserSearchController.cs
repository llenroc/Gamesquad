using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Models;
using Microsoft.AspNetCore.Identity;
using GameSquad.Services;
using GameSquad.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class UserSearchController : Controller
    {
        private UserManager<ApplicationUser> _manager;
        private IUserService _service;
        private IFriendsService _fService;
        public UserSearchController(IFriendsService fService, IUserService service, UserManager<ApplicationUser> manager)
        {
            _service = service;
            _manager = manager;
            _fService = fService;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]USearch _data)
        {
            var userId = _manager.GetUserId(User);
            _data.CurrentUser = userId;

            var holder = _service.GetTableData(_data);

            
            var friends = _fService.GetAllFriendsByUser(userId);

            var rData = new List<FriendCheckReturnVM>();

            foreach (var user in holder)
            {
                var a = new FriendCheckReturnVM { User = user, IsFriend = false };
                foreach (var friend in friends)
                {
                    if (user.Id == friend.Id)
                    {
                        a.IsFriend = true;
                    }
                }
                rData.Add(a);
            }

            var value = new { data = rData };
            return Ok(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
