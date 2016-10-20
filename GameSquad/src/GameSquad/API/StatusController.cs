using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Services;
using Microsoft.AspNetCore.Identity;
using GameSquad.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]

    public class StatusController : Controller
    {

        private IStatusService _service;
        private readonly UserManager<ApplicationUser> _userManager;
        public StatusController(IStatusService service, UserManager<ApplicationUser> userManager)
        {
            _service = service;
            _userManager = userManager;
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
        [Authorize]
        public IActionResult Post([FromBody]Status status)
        {
            try
            {
                var userId = _userManager.GetUserId(this.User);
                _service.SaveStatus(userId, status.LookingFor, status.StatusMessage);
                return Ok();
            }
            catch
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

    public class Status
    {

        public string LookingFor { get; set; }
        public string StatusMessage { get; set; }
    }
}
