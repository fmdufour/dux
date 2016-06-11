using System.Collections.Generic;
using Dux.Domain;

namespace Dux.Domain.Interfaces
{
    public interface IAcessoService
    {
        bool TemAcesso(Usuario usuario, int casaId, string claim);
    }
}