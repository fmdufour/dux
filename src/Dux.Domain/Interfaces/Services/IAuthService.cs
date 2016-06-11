using System.Threading.Tasks;
using Dux.Domain;
using System.Collections.Generic;
using System.Security.Claims;

namespace Dux.Domain.Interfaces
{
    public interface IAuthService
    {
        Client FindClient(string clientId);
        bool AddRefreshToken(RefreshToken token);
        RefreshToken FindRefreshToken(string refreshTokenId);
        bool RemoveRefreshToken(string refreshTokenId);
        bool RemoveRefreshToken(RefreshToken refreshToken);
        Task<Usuario> GetUsuarioEmail(string userName);
        Task<bool> CheckPasswordAsync(Usuario user, string password);
        Task<int> GetCasaSelecionada(Usuario user);
        Task<List<string>> GetRolesUsuario(Usuario user, int casaId);
        List<Usuario> GetUsuarios(int casaId);
        Task SalvaUsuario(Usuario usuario, List<int> casas, string usuarioId);
        Task BloqueiaUsuarioAsync(string usuarioId, int casaId);
        Task DesbloqueiaUsuarioAsync(string usuarioId, int casaId);
        bool AcessoUsuarioBloqueado(string id, int casaId);
        int TentaSelecOutraCasa(string id, int casaId);
        Task<List<string>> ResetaSenha(string email, string senha, string code);
        Task EnviaFormResetSenha(string email);
        List<Claim> GetClaims(Usuario user, int casaId);
        List<Acessos> GetTodosAcessos();
        Task<List<Acessos>> GetAcessosUsuario(string userId, int casaId);
        Task DefineAcessos(string usuarioId, int casaId, List<Acessos> acessos);
        Usuario GetUsuario(string usuarioId, int casaId);
        List<Usuario> GetComissarios(int casaId, string usuarioid);
        Task SalvaComissario(Usuario usuario, List<int> casas, string usuarioId);
        Task BloqueiaComissarioAsync(string promoterId, string comissarioId, int casaId);
        Task DesbloqueiaComissarioAsync(string promoterId, string id, int casaId);
    }
}