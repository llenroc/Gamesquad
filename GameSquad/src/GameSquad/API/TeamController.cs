
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Services;
using GameSquad.Models;
using Microsoft.AspNetCore.Identity;
using GameSquad.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ITeamService _service;
        public TeamController(ITeamService service, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _service = service;
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
            return Ok(_service.getTeamInfo(id));
        }
        //
        //path for table data API
        [HttpGet("GetTableData")]
        public IActionResult GetTableData([FromBody] TSearch _data)
        {
            return Ok();
        }

        [HttpGet("GetTeamsByUser")]
        public IActionResult GetTeamsByUser()
        {
            var userId = _userManager.GetUserId(User);
            return Ok(_service.TeamsByUser(userId));
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Team team)
        {

            if (ModelState.IsValid)
            {
                var id =_service.SaveTeam(team);
                if(id != 0)
                {
                    this.AddMemberToTeam(id);
                }
                return Ok();
            }
            else
            {
                return BadRequest();

            }
        }

        [HttpGet("AddMemberToTeam/{teamId}")]
        public IActionResult AddMemberToTeam(int teamId)
        {

            if (ModelState.IsValid)
            {
                var userId = _userManager.GetUserId(User);
                _service.AddMemberToTeam(userId, teamId);
                return Ok();
            }
            else
            {
                return BadRequest();

            }
        }

        [HttpGet("RemoveMember/{teamId}")]
        public IActionResult RemoveMember(int teamId)
        {

            if (ModelState.IsValid)
            {
                var userId = _userManager.GetUserId(User);
                _service.RemoveMember(userId, teamId);
                return Ok();
            }
            else
            {
                return BadRequest();

            }
        }



        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.DeleteTeam(id);
            return Ok();
        }
    }
}
