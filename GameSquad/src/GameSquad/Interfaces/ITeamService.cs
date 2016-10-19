using System.Collections.Generic;
using GameSquad.Models;

namespace GameSquad.Services
{
    public interface ITeamService
    {
        void AddMemberToTeam(string userId, int teamId);
        object getTeamInfo(int id);
        List<Team> getTeams();
        void RemoveMember(string userId, int teamId);
        int SaveTeam(Team team);
        List<Team> TeamsByUser(string userId);
        List<ApplicationUser> UsersByTeam(int teamId);
        List<dynamic> GetTableData(TSearch id);
        void DeleteTeam(int id);
    }
}