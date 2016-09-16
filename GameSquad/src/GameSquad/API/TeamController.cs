
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Services;
using GameSquad.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {

        private ITeamService _service;
        public TeamController(ITeamService service)
        {
            _service = service;
        }


        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.getTeams());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_service.getTeamInfo(id));
        }

        [HttpGet("GetUsersByTeam/{id}")]
        public IActionResult GetUsersByTeam(int id)
        {
            return Ok(_service.UsersByTeam(id));
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Team team)
        {

            if (ModelState.IsValid)
            {
                _service.SaveTeam(team);
                return Ok();
            }
            else
            {
                return BadRequest();

            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
