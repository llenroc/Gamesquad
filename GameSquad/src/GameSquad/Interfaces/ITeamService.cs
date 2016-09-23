using System.Collections.Generic;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface ITeamService
    {
        Team getTeamInfo(int id);
        List<Team> getTeams();
        void SaveTeam(Team team);
        List<Team> TeamsByUser(string userId);
        List<ApplicationUser> UsersByTeam(int teamId);
        void AddMemberToTeam(string userId, int teamId);
    }
}