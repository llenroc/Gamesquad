using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Services;
using GameSquad.Models;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private IPostService _service;
        public PostController(IPostService service)
        {
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.GetPosts());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_service.GetPostById(id));
        }

       // POST api/values
       [HttpPost]
        public async Task<IActionResult> Post([FromBody]Post post)
        {
            if (ModelState.IsValid)
            {
                await _service.SavePost(this.User, post);
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
            _service.DeletePost(id);
            return Ok();
        }
    }
}
