using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Services;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
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
            return Ok();
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