using GameSquad.Models;

namespace GameSquad.Services
{
    public interface IStatusService
    {
        void SaveStatus(string userId, string lookingFor, string statusMessage);
    }
}