using System.Collections.Generic;
using Dux.Domain;

namespace Dux.Domain.Interfaces
{
    public interface IGrupoService
    {
        Grupo AddGrupo(Grupo grupo);
        IEnumerable<Grupo> GetGrupos();
    }
}