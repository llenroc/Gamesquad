using GameSquad.Hubs;
using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class TeamService : ITeamService
    {
        private IHubContext _hubManager;
        private IGenericRepository _repo;
        public TeamService(IGenericRepository repo)
        {
            _repo = repo;
            _hubManager = Startup.ConnectionManager.GetHubContext<ChatHub>();
        }

        //get team info by id
        public object getTeamInfo(int id)
        {
            var _data = _repo.Query<Team>().Where(t => t.Id == id).Select(t => new
            {
                Id = t.Id,
                TeamName = t.TeamName,
                PlayStyle = t.PlayStyle,
                TeamLeader = t.TeamLeader,
                TeamMembers = t.TeamMembers.Select(tm => tm.ApplicationUser).Select(u => new
                {
                    Id = u.Id,
                    UserName = u.UserName,
                    Rank = u.Rank,
                    IsOnline = u.IsOnline
                }).ToList()
            }).FirstOrDefault();
            return _data;
        }

        public int SaveTeam(Team team)
        {

            if (team.Id == 0)
            {
                _repo.Add(team);
                return team.Id;
            }

            else
            {
                _repo.Update(team);
                return 0;
            }

        }

        public List<Team> getTeams()
        {
            var data = _repo.Query<Team>().Include(m => m.TeamMembers).ToList();
            return data;
        }
        //data table paging
        public List<dynamic> GetTableData(TSearch _data)
        {
            List<dynamic> data = new List<dynamic>();
            var id = _data.PageCount;
            string nFilter = _data.NameFilter ?? "";
            string tFilter = _data.TypeFilter ?? "";
            string lFilter = _data.LeaderFilter ?? "";
            data.Add(_repo.Query<Team>().Where(t => t.TeamName.Contains(nFilter) && t.PlayStyle.Contains(tFilter) && t.TeamLeader.Contains(lFilter)).Skip(5 * id).Take(5).Select(t => new
            {
                Id = t.Id,
                TeamName = t.TeamName,
                PlayStyle = t.PlayStyle,
                TeamLeader = t.TeamLeader,
                TeamMembers = t.TeamMembers     //_repo.Query<TeamMembers>().Where(m => m.TeamId == t.Id).ToList()
            }).ToList());
            return data;
        }

        public List<ApplicationUser> UsersByTeam(int teamId)
        {
            var users = _repo.Query<TeamMembers>().Where(tm => tm.TeamId == teamId).Select(tm => tm.ApplicationUser).ToList();
            return users;
        }

        public List<Team> TeamsByUser(string userId)
        {
            var teams = _repo.Query<TeamMembers>().Where(tm => tm.ApplicationUserId == userId).Select(tm => tm.Team).ToList();
            return teams;
        }

        public void AddMemberToTeam( string userId, int teamId)
        {
            var user = _repo.Query<ApplicationUser>().FirstOrDefault(c => c.Id == userId);
            var team = _repo.Query<Team>().FirstOrDefault(t => t.Id == teamId);

            var join = new TeamMembers {
                TeamId = teamId,
                Team = team,
                ApplicationUserId = userId,
                ApplicationUser = user


            };

            _repo.Add(join);
            _repo.SaveChanges();

            //Signalr Stuff for insta add new group to chag
            _hubManager.Clients.User(user.UserName).joinNewGroup(team.TeamName);
          



        }

        public void RemoveMember(string userId, int teamId)
        {
            var remove = new TeamMembers
            {
                TeamId = teamId,
                Team = _repo.Query<Team>().FirstOrDefault(c => c.Id == teamId),
                ApplicationUserId = userId,
                ApplicationUser = _repo.Query<ApplicationUser>().FirstOrDefault(m => m.Id == userId)

            };


            _repo.Delete(remove);
            _repo.SaveChanges();
        }

        public void DeleteTeam(int id)
        {

        }
    }
}