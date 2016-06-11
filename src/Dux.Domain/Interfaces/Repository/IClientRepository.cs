namespace Dux.Domain.Interfaces
{
    public interface IClientRepository : IGenericRepository<Client>
    {
        Client GetClient(string id);
    }
}