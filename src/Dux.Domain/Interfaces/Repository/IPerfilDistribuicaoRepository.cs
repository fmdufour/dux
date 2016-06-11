using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface IPerfilDistribuicaoRepository : IGenericRepository<PerfilDistribuicao>
    {
        PerfilDistribuicao GetPerfilDistribuicao(int perfilId, int casaId);
        List<PerfilDistribuicao> GetPerfis(int casaId);
        bool Any(int id, int casaId);
    }
}