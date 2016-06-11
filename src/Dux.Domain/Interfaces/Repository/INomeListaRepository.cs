using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dux.Domain.Interfaces
{
    public interface INomeListaRepository : IGenericRepository<NomeLista>
    {
        int CountNomesLista(int listaId, string usuarioId, bool Masc);
        List<NomeLista> GetNomesPromoter(int listaId, string usuarioId);
        void RemoveTodosNomes(int listaId, string usuarioId);
        Task<List<NomeLista>> GetNomesLista(int listaId);
        NomeLista GetNome(int listaId, int nomeId);
        Task<List<NomeLista>> GetNomesInclLista(int listaId);
    }
}