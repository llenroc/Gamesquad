﻿using GameSquad.Models;
using GameSquad.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameSquad.Services
{
    public class TeamService : ITeamService
    {

        private IGenericRepository _repo;
        public TeamService(IGenericRepository repo)
        {
            _repo = repo;
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
                    Rank = u.Rank
                }).ToList()
            }).FirstOrDefault();
            return _data;
        }

        ////get members
        //public ICollection<ApplicationUser> getMembers(string id)
        //{
        //    var data = _repo.Query<ApplicationUser>().Where(u => u.Id == id).ToList();
        //    return data; 
        //}

        //get user by id
        //public Team getTeamLeaderById(string id)
        //{
        //    var data = _repo.Query<Team>().Where(c => c.UserId == id).Include(u => u.TeamLeader);
        //    return data;
        //}


        //save Team

        public void SaveTeam(Team team)
        {

            if (team.Id == 0)
            {
                _repo.Add(team);
            }

            else
            {
                _repo.Update(team);
            }

        }

        public List<Team> getTeams()
        {
            var data = _repo.Query<Team>().ToList();
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
            var join = new TeamMembers {
                TeamId = teamId,
                Team = _repo.Query<Team>().FirstOrDefault(t => t.Id == teamId),
                ApplicationUserId = userId,
                ApplicationUser =  _repo.Query<ApplicationUser>().FirstOrDefault( c => c.Id == userId)

                
            };

            _repo.Add(join);
            _repo.SaveChanges();
        }
    }
}