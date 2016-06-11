using System.Collections.Generic;
using Dux.Domain;

namespace Dux.Domain.Interfaces
{
    public interface IListaService
    {
        List<Lista> GetListasEvento(int eventoId, int casaId, string usuarioId);
        Lista GetLista(int listaId, int casaId, string usuarioId);
        void CriaLista(Lista lista, int casaId, int perfilDistId);
        void EditaLista(Lista lista, int casaId);
        List<ListaPromoter> GetListasPromoter(int eventoId, string usuarioId, int casaId);
    }
}