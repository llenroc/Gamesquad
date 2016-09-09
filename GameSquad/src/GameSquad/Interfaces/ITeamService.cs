using GameSquad.Models;
using System.Collections.Generic;

namespace GameSquad.Services
{
    public interface ITeamService
    {
        Team getTeamInfo(int id);
        void SaveTeam(Team team);
        List<Team> getTeams();
        
    }
}