using Dux.Domain;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Dux.Application
{
    public class AuthService : IAuthService
    {        
        private readonly ILogger<AuthService> _logger;
        private readonly IUnitOfWork _uow;
        private readonly IEmailService _emailService;

        public AuthService(IUnitOfWork uow, ILogger<AuthService> logger,  IEmailService emailService)
        {
            _uow = uow;
            _logger = logger;
            _emailService = emailService;
        }

        public Client FindClient(string clientId)
        {
            return _uow.ClientRepository.GetClient(clientId);
        }

        public bool AddRefreshToken(RefreshToken token)
        {

            var existingToken = _uow.RefreshTokenRepository.GetBySubjectAndId(token.Subject, token.Id);  
                                  

            if (existingToken != null)
            {
                var result = RemoveRefreshToken(existingToken);
            }


            _uow.RefreshTokenRepository.Insert(token);            

            return _uow.Save() > 0;
        }

        public bool RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = _uow.RefreshTokenRepository.GetRefreshToken(refreshTokenId);

            if (refreshToken != null)
            {
                _uow.RefreshTokenRepository.Delete(refreshToken);
                return _uow.Save() > 0;
            }

            return false;
        }

        public bool RemoveRefreshToken(RefreshToken refreshToken)
        {
            _uow.RefreshTokenRepository.Delete(refreshToken);
            return _uow.Save() > 0;
        }

        public RefreshToken FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = _uow.RefreshTokenRepository.GetRefreshToken(refreshTokenId);

            return refreshToken;
        }


        public async Task<Usuario> GetUsuarioEmail(string email)
        {
            return await _uow.UsuarioManager.FindByEmailAsync(email);
        }

        public async Task<bool> CheckPasswordAsync(Usuario user, string password)
        {
            return await _uow.UsuarioManager.CheckPasswordAsync(user, password);
        }

        public async Task<int> GetCasaSelecionada(Usuario user)
        {
            user = _uow.UsuarioManager.FindUserByNameInclude(user.UserName);

            UsuarioCasaSelec u = await _uow.UsuarioCasaSelecRepository.GetCasaSelecAsync(user.Id);

            if (u == null)
            {
                //seleciona a primeira casa
                int casaId = user.CasasUsuario.First().CasaId;

                _uow.CasaRepository.SelecionaCasa(user.Id, casaId);

                return casaId;
            }

            return u.CasaId;
        }

        public async Task<List<string>> GetRolesUsuario(Usuario user, int casaId)
        {
            var roles = _uow.UsuarioManager.FindUserByNameInclude(user.UserName).Roles;

            List<string> rolesUser = new List<string>();

            foreach (var role in roles)
            {
                var roleIdentity = await _uow.RoleManager.FindByIdAsync(role.RoleId);
                rolesUser.Add(roleIdentity.Name);
            }

            return rolesUser;
        }

        public List<Usuario> GetUsuarios(int casaId)
        {
            return _uow.UsuarioManager.GetUsuarios(casaId);
        }

        public async Task SalvaUsuario(Usuario usuario, List<int> casas, string usuarioId)
        {
            List<Casa> casasUsuario = _uow.CasaRepository.GetCasasUsuario(usuarioId);

            foreach (var c in casas)
            {
                if (!casasUsuario.Any( a=> a.Id.Equals(c)))
                {
                    throw new RegraException("Usuario tentando criar usuario com casas que ele não tem acesso. "
                        + "userId: " + usuarioId + " tentando add a casa: " + c); 
                }
            }

            string senhaTemp = Util.GeraSenhaTemp();

            usuario.UserName = usuario.Email;
            usuario.Comissario = false;

            var b = await _uow.UsuarioManager.CreateAsync(usuario, senhaTemp);            

            usuario.CasasUsuario = new List<UsuarioCasa>();

            foreach (var casaId in casas)
            {
                usuario.CasasUsuario.Add(new UsuarioCasa { CasaId = casaId, UsuarioId = usuario.Id });
            }            

            await _uow.UsuarioManager.UpdateAsync(usuario);

            await EnviaFormResetSenha(usuario.Email);
        }

        public async Task BloqueiaUsuarioAsync(string usuarioId, int casaId)
        {
            Usuario user = _uow.UsuarioManager.FindByIdInclude(usuarioId);

            if (user == null)
            {
                throw new RegraException("Nenhum Usuário encontrado com o Id fornecido para bloqueio. "
                    + "usuarioId: " + usuarioId + " casaId: " + casaId);
            }            
                        
            if (!user.CasasUsuario.Any(p=> p.CasaId.Equals(casaId)))
            {
                throw new RegraException("Usuario para bloqueio não pertence a casa que está querendo bloquea-lo. "
                    + "casaId: " + casaId + " usuarioId: " + usuarioId);
            }

            if (user.Comissario)
            {
                throw new RegraException("Tentando bloquear comissário por api usada para bloquear usuários" +
                    "usuarioId:" + usuarioId + " casaId:" + casaId);
            }

            user.CasasUsuario.First(p => p.CasaId.Equals(casaId)).Bloqueado = true;
            user.CasasUsuario.First(p => p.CasaId.Equals(casaId)).DataBloqueio = DateTime.Now;

            await _uow.UsuarioManager.UpdateAsync(user);
        }

        public async Task DesbloqueiaUsuarioAsync(string usuarioId, int casaId)
        {
            Usuario user = _uow.UsuarioManager.FindByIdInclude(usuarioId);

            if (user == null)
            {
                throw new RegraException("Nenhum Usuário encontrado com o Id fornecido para desbloqueio. "
                    + "usuarioId: " + usuarioId + " casaId: " + casaId);
            }

            if (!user.CasasUsuario.Any(p => p.CasaId.Equals(casaId)))
            {
                throw new RegraException("Usuario para desbloqueio não pertence a casa que está querendo desbloquea-lo. "
                    + "casaId: " + casaId + " usuarioId: " + usuarioId);
            }

            if (user.Comissario)
            {
                throw new RegraException("Tentando desbloquear comissário por api usada para desbloquear usuários" +
                    "usuarioId:" + usuarioId + " casaId:" + casaId);
            }

            user.CasasUsuario.First(p => p.CasaId.Equals(casaId)).Bloqueado = false;
            user.CasasUsuario.First(p => p.CasaId.Equals(casaId)).DataBloqueio = null;

            await _uow.UsuarioManager.UpdateAsync(user);
        }

        public bool AcessoUsuarioBloqueado(string id, int casaId)
        {
            return _uow.CasaRepository.AcessoUsuarioBloqueado(id, casaId);
        }


        //retorna 0 caso não tenha outra casa disponivel
        public int TentaSelecOutraCasa(string id, int casaId)
        {
            Usuario user = _uow.UsuarioManager.FindByIdInclude(id);

            if (user.CasasUsuario.Count == 1)
            {
                //retorna 0 pois sabemos que o acesso a essa casa está bloqueado
                return 0;
            }

            UsuarioCasa casa = user.CasasUsuario.FirstOrDefault(p => !p.CasaId.Equals(casaId) && !p.Bloqueado);

            if (casa == null)
            {
                //retorna 0 pois nao existe outra casa para acesso
                return 0;
            }

            _uow.CasaRepository.SelecionaCasa(id, casa.CasaId);

            return casa.CasaId;
        }

        public async Task<List<string>> ResetaSenha(string email, string senha, string code)
        {
            List<string> erros = new List<string>();

            var user = await _uow.UsuarioManager.FindByEmailAsync(email);

            if (user == null)
            {
                erros.Add("Não existe usuário com esse email");
                return erros;
            }

            var result = await _uow.UsuarioManager.ResetPasswordAsync(user, code, senha);

            if (!result.Succeeded)
            {
                erros.Add("Ocorreu um erro ao alterar a senha.");
                erros.Add("Lembre-se que sua senha deve conter letras e números");
                erros.Add("Se o erro persistir peça novamente a alteração pelo site");
            }

            return erros;
        }

        public async Task EnviaFormResetSenha(string email)
        {
            Usuario usuario = await _uow.UsuarioManager.FindByEmailAsync(email);

            if (usuario == null)
            {
                return;//usuario nao existe
            }

            string code = await _uow.UsuarioManager.GeneratePasswordResetTokenAsync(usuario);

            string url = "http://localhost:5000/Usuario/ResetSenha?code=" + WebUtility.UrlEncode(code);

            await _emailService.SendEmailAsync(email, "Sistema Dux - Configure sua nova senha", 
                                                Email.ResetaSenha(usuario.Nome, code, url));

        }

        public List<Claim> GetClaims(Usuario user, int casaId)
        {
            return _uow.UsuarioManager.GetClaims(user, casaId);
        }

        public List<Acessos> GetTodosAcessos()
        {
            return _uow.UsuarioManager.GetAcessos(); 
        }

        public async Task<List<Acessos>> GetAcessosUsuario(string usuarioId, int casaId)
        {
            Usuario usuario = await _uow.UsuarioManager.FindByIdAsync(usuarioId);
            List<Claim> claims = _uow.UsuarioManager.GetClaims(usuario, casaId);
            List<Acessos> todosAcessos = _uow.UsuarioManager.GetAcessos();
            List<Acessos> acessosUsuario = new List<Acessos>();

            foreach (var claim in claims)
            {
                if (claim.Type != NomeClaims.Master)
                {
                    acessosUsuario.Add(todosAcessos.First(p => p.TipoClaim.Equals(claim.Type)));
                }
            }

            return acessosUsuario;
        }

        public async Task DefineAcessos(string usuarioId, int casaId, List<Acessos> acessos)
        {
            Usuario usuario = await _uow.UsuarioManager.FindByIdAsync(usuarioId);
            List<Claim> claims = _uow.UsuarioManager.GetClaims(usuario, casaId);

            List<Claim> claimsAdd = new List<Claim>();

            foreach (var acesso in acessos)
            {
                Claim claim = new Claim(acesso.TipoClaim, "1");

                if (!claims.Any(p => p.Type.Equals(acesso)))
                {
                    //se nao existe ainda adiciona
                    claimsAdd.Add(claim);
                }
                else
                {
                    //se existe remove da lista
                    claims.Remove(claim);
                }
            }


            //adiciona claims novos do usuário
            _uow.UsuarioManager.AddClaims(usuario, claimsAdd, casaId);


            //o que sobrou da lista de claims deve ser excluida
            _uow.UsuarioManager.RemoveClaims(usuario, claims, casaId);

            _uow.Save();
        }

        public Usuario GetUsuario(string usuarioId, int casaId)
        {
            Usuario u = _uow.UsuarioManager.FindByIdInclude(usuarioId);

            if (!u.CasasUsuario.Any(p=> p.CasaId.Equals(casaId)))
            {
                throw new RegraException("Tentando dar GET em casa que não pertence a casa. casaId:" + casaId
                    + " usuarioId:" + usuarioId);
            }

            return u;
        }

        public List<Usuario> GetComissarios(int casaId, string usuarioId)
        {
            List<Usuario> comissarios = _uow.UsuarioManager.GetComissarios(casaId, usuarioId);

            return comissarios;
        }

        public async Task SalvaComissario(Usuario usuario, List<int> casas, string usuarioId)
        {
            List<Casa> casasUsuario = _uow.CasaRepository.GetCasasUsuario(usuarioId);

            foreach (var c in casas)
            {
                if (!casasUsuario.Any(a => a.Id.Equals(c)))
                {
                    throw new RegraException("Usuario tentando criar usuario com casas que ele não tem acesso. "
                        + "userId: " + usuarioId + " tentando add a casa: " + c);
                }
            }

            string senhaTemp = Util.GeraSenhaTemp();

            usuario.UserName = usuario.Email;
            //define quem é seu promoter
            usuario.PromoterId = usuarioId;
            usuario.Comissario = true;

            var b = await _uow.UsuarioManager.CreateAsync(usuario, senhaTemp);

            usuario.CasasUsuario = new List<UsuarioCasa>();

            //para adicionar claim comissario
            List<Claim> comissario = new List<Claim>();
            comissario.Add(new Claim(NomeClaims.Comissario, "1"));
            
            foreach (var casaId in casas)
            {
                usuario.CasasUsuario.Add(new UsuarioCasa { CasaId = casaId, UsuarioId = usuario.Id });
                _uow.UsuarioManager.AddClaims(usuario, comissario, casaId);
            }            

            await _uow.UsuarioManager.UpdateAsync(usuario);

            await EnviaFormResetSenha(usuario.Email);
        }

        public async Task BloqueiaComissarioAsync(string promoterId, string comissarioId, int casaId)
        {
            Usuario user = _uow.UsuarioManager.FindByIdInclude(comissarioId);

            if (user == null)
            {
                throw new RegraException("Nenhum Usuário encontrado com o Id fornecido para bloqueio. "
                    + "comissarioId: " + comissarioId + " casaId: " + casaId + " promoterId:"+ promoterId);
            }

            if (!user.Comissario || user.PromoterId != promoterId)
            {
                throw new RegraException("Tentando bloquear usuário que não é comissário dele "
                    + "promoterId: " +promoterId+ " comissarioId:" + comissarioId + " casaId: " + casaId);
            }

            if (!user.CasasUsuario.Any(p => p.CasaId.Equals(casaId)))
            {
                throw new RegraException("comissario para bloqueio não pertence a casa que está querendo bloquea-lo. "
                    + "promoterId: " + promoterId + " comissarioId:" + comissarioId + " casaId: " + casaId);
            }

            user.CasasUsuario.First(p => p.CasaId.Equals(casaId)).Bloqueado = true;
            user.CasasUsuario.First(p => p.CasaId.Equals(casaId)).DataBloqueio = DateTime.Now;

            await _uow.UsuarioManager.UpdateAsync(user);
        }

        public async Task DesbloqueiaComissarioAsync(string promoterId, string comissarioId, int casaId)
        {
            Usuario user = _uow.UsuarioManager.FindByIdInclude(comissarioId);

            if (user == null)
            {
                throw new RegraException("Nenhum Usuário encontrado com o Id fornecido para desbloqueio. "
                    + "comissarioId: " + comissarioId + " casaId: " + casaId + " promoterId:" + promoterId);
            }

            if (!user.Comissario || user.PromoterId != promoterId)
            {
                throw new RegraException("Tentando desbloquear usuário que não é comissário dele "
                    + "promoterId: " + promoterId + " comissarioId:" + comissarioId + " casaId: " + casaId);
            }

            if (!user.CasasUsuario.Any(p => p.CasaId.Equals(casaId)))
            {
                throw new RegraException("comissario para desbloqueio não pertence a casa que está querendo desbloquea-lo. "
                    + "promoterId: " + promoterId + " comissarioId:" + comissarioId + " casaId: " + casaId);
            }

            user.CasasUsuario.First(p => p.CasaId.Equals(casaId)).Bloqueado = true;
            user.CasasUsuario.First(p => p.CasaId.Equals(casaId)).DataBloqueio = null;

            await _uow.UsuarioManager.UpdateAsync(user);
        }

    }
}
