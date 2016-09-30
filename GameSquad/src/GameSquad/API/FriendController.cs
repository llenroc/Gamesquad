using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Services;
using Microsoft.AspNetCore.Identity;
using GameSquad.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class FriendController : Controller
    {
        private IFriendsService _service;
        private UserManager<ApplicationUser> _manager;
        public FriendController(IFriendsService service, UserManager<ApplicationUser> manager)
        {
            _service = service;
            _manager = manager;
        }
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            //return Ok(_service.GetFriends());
            var userId = _manager.GetUserId(User);
            return Ok(_service.GetFriendsByUser(userId));
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return Ok(_service.GetFriendsById(id));
        }
        [HttpGet("GetFriendsByUser")]
        public IActionResult GetFriendsByUser()
        {
            var userId = _manager.GetUserId(User);
            return Ok(_service.GetFriendsByUser(userId));
        }
        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
