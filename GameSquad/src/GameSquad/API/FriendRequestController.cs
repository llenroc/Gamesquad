using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using GameSquad.Models;
using GameSquad.Services;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class FriendRequestController : Controller
    {
        private IFreindRequestService _service;
        private readonly UserManager<ApplicationUser> _userManager;

        public FriendRequestController(UserManager<ApplicationUser> manager, IFreindRequestService service)
        {
            _service = service;
            _userManager = manager;
        }

        


        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            var userId = _userManager.GetUserId(this.User);

            var friendRequests = _service.FriendRequestsByUser(userId);
            return Ok(friendRequests);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]ApplicationUser userTo)
        {

            try
            {
                var userFromId = _userManager.GetUserId(this.User);

                _service.SendRequest(userTo.Id, userFromId);

                return Ok();
            }
            catch
            {
                return BadRequest();
            }


        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]string value)
        {
            //try
            //{
            //    var userFromId = _userManager.GetUserId(this.User);
                

            //    return Ok();
            //}
            //catch
            //{
            //    return BadRequest();
            //}
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var userTo = _userManager.GetUserId(User);
            _service.RemoveRequest(userTo, id);
            return Ok();
        }
    }
   
}
