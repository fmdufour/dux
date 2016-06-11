using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface IPerfilListaRepository : IGenericRepository<PerfilLista>
    {
        PerfilLista GetPerfilLista(int id);
        List<PerfilLista> GetPerfis(int casaId);
        bool Any(int id, int casaId);
        void RemoveExcluidos(List<LayoutLista> layListas);
        PerfilLista GetPerfilIncl(int id, int casaId);
    }
}