using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface IListaRepository : IGenericRepository<Lista>
    {
        Lista GetLista(int listaId, int casaId);
    }
}