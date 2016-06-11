using System.Collections.Generic;
using Dux.Domain;

namespace Dux.Domain.Interfaces
{
    public interface IPerfilListaService
    {
        List<PerfilLista> GetPerfis(int casaId);
        List<string> EditaPerfil(PerfilLista perfilLista, int casaId);
        List<string> SalvaPerfil(PerfilLista perfilLista);
        PerfilLista GetPerfilIncl(int id, int casaId);
    }
}