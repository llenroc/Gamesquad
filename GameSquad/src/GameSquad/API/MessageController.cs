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
    public class MessageController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private IMessageService _service;
        public MessageController(IMessageService service, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _service = service;
        }
        // GET: api/values
       [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_service.getMessageInfo(id));
        }

        // GET api/values/5
        [HttpGet("GetMsgsByUser")]
        public IActionResult GetMsgsByUser()
        {
            var userId = _userManager.GetUserId(User);
            return Ok(_service.MsgsByUser(userId));
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Messages message)
        {
            if (ModelState.IsValid)
            {
                _service.sendMessage(message);
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
        public IActionResult Delete(int id)
        {
            _service.DeleteMessage(id);
            return Ok();
        }
    }
}
