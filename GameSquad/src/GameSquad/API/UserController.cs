using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Services;
using GameSquad.Models;
using Microsoft.AspNetCore.Identity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private UserManager<ApplicationUser> _manager;
        private IUserService _service;
        public UserController(IUserService service, UserManager<ApplicationUser> manager)
        {
            _service = service;
            _manager = manager;
        } 

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.GetAllUsers());
        }

        
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var uid = _manager.GetUserId(User);
            var data = _service.GetUserById(id, uid);
            return Ok(data);
        }


        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]ApplicationUser user)
        {
            if (ModelState.IsValid)
            {
                var uid = _manager.GetUserId(User);
                _service.SaveProfile(user, uid);
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