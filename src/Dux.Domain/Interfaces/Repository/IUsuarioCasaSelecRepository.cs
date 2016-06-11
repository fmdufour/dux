using System.Threading.Tasks;
using Dux.Domain;

namespace Dux.Domain.Interfaces
{
    public interface IUsuarioCasaSelecRepository
    {
        Task<UsuarioCasaSelec> GetCasaSelecAsync(string userId);
    }
}