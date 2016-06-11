using System.Collections.Generic;
using Dux.Domain;

namespace Dux.Domain.Interfaces
{
    public interface IPerfilDistribuicaoService
    {
        List<PerfilDistribuicao> GetPerfis(int casaId);
        void CriaPerfil(PerfilDistribuicao perfilDist);
        PerfilDistribuicao GetPerfilTodosUsuarios(int perfilDistId, int casaId);
        void EditaPerfil(PerfilDistribuicao perfilDist, int casaId);
        void ExcluiPerfil(int perfilId, int casaId);
    }
}