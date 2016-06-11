using System.Collections.Generic;
using Dux.Domain;

namespace Dux.Domain.Interfaces
{
    public interface IDistribuicaoService
    {
        List<Distribuicao> GetDist(int casaId, int listaId);
        void SalvaDist(int listaId, int casaId, List<Distribuicao> distribuicoes);
        Distribuicao GetDistribuicao(int listaId, string usuarioId);
    }
}