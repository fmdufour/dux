using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface ICasaRepository : IGenericRepository<Casa>
    {
        Casa GetCasa(int id);
        List<Casa> GetCasasUsuario(string id);
        void SelecionaCasa(string usuarioId, int casaId);
        bool AcessoUsuarioBloqueado(string id, int casaId);
    }
}