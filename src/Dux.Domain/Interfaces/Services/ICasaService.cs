using System.Collections.Generic;
using Dux.Domain;

namespace Dux.Domain.Interfaces
{
    public interface ICasaService
    {
        Casa GetCasa(int casaId);
        List<Casa> GetCasasUsuario(string id);
        Casa SelecionaCasa(string usuarioId, int casaId);
        List<Usuario> GetUsuariosDistCasa(int casaId);
    }
}