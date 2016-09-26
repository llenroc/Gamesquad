using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Services;
using GameSquad.Models;
using System.Security.Principal;
using Microsoft.AspNetCore.Identity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/profile")]
    public class UserProfileController : Controller
    {
        private UserManager<ApplicationUser> _manager;
        private IUserProfileService _service;
        public UserProfileController(IUserProfileService service, UserManager<ApplicationUser> manager)
        {
            _service = service;
            _manager = manager;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok();
        }
       

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]ApplicationUser user)
        {
            if (ModelState.IsValid)
            {
                await _service.SaveUserInfo(this.User, user);
                return Ok();
            }
            else
            {
                return BadRequest();


            }
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
