using System.Collections.Generic;
using Dux.Domain;
using System.Threading.Tasks;

namespace Dux.Domain.Interfaces
{
    public interface INomeListaService
    {
        List<string> AddNomes(List<NomeLista> nomes, int listaId, int casaId, string usuarioId);
        List<NomeLista> GetNomesPromoter(int listaId, string usuarioId);
        Task<List<NomeLista>> GetNomesLista(int listaId, int casaId, string usuarioId);
        void ConfirmaPresenca(int nomeId, int listaId, int casaId, string usuarioId);
        Task<List<NomeListaGeral>> GetNomesEvento(int eventoId, int casaId, string usuarioId);
    }
}