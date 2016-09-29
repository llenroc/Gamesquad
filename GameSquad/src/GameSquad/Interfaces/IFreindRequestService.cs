namespace GameSquad.Services
{
    public interface IFreindRequestService
    {
        void SendRequest(string userTo, string userFrom);
    }
}