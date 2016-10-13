using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GameSquad.Models;
using Microsoft.AspNetCore.Identity;
using GameSquad.Services;
using GameSquad.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GameSquad.API
{
    [Route("api/[controller]")]
    public class TeamSearchController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ITeamService _service;
        public TeamSearchController(ITeamService service, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _service = service;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{_data}")]
        public IActionResult Get(TSearch _data)
        {
            return Ok();
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]TSearch _data)
        {
            var data = _service.GetTableData(_data);
            var teams = data[0];
            var userId = _userManager.GetUserId(User);
            var vms = new List<CheckTeamMemberVM>();
            foreach (var team in teams)
            {
                var isMember = false;
                foreach (var member in team.TeamMembers)
                {
                    if (member.ApplicationUserId == userId)
                    {
                        isMember = true;
                    }
                }
                var vm = new CheckTeamMemberVM()
                {
                    Team = team,
                    IsMember = isMember
                };
                vms.Add(vm);

            }
            var value = new { data = vms };
            return Ok(value);
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
