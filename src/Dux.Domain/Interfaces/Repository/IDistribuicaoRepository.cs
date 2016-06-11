using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface IDistribuicaoRepository : IGenericRepository<Distribuicao>
    {
        List<Distribuicao> GetDist(int listaId);
        Distribuicao GetDist(string usuarioId, int listaId);
        Distribuicao GetDistribuicao(int listaId, string usuarioId);
    }
}