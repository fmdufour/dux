using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface IUsuarioListaRepository : IGenericRepository<UsuarioLista>
    {
        List<UsuarioLista> GetListas(string usuarioId, int eventoId);
        List<UsuarioLista> GetListasIncl(string usuarioId, int eventoId);
        void RetiraAcesso(int listaId, string usuarioId);
        void AddAcesso(int eventoId, string usuarioId, int id);
    }
}