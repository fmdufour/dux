using Dux.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using System.Globalization;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Builder;

namespace Dux.Infrastructure
{
    public class UsuarioManager : UserManager<Usuario>
    {
        private readonly DuxUserStore _duxUserStore;

        public UsuarioManager(DuxUserStore store, IOptions<IdentityOptions> optionsAccessor,
            IPasswordHasher<Usuario> passwordHasher, IEnumerable<IUserValidator<Usuario>> userValidators,
            IEnumerable<IPasswordValidator<Usuario>> passwordValidators, ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors, IServiceProvider services,
            ILogger<UserManager<Usuario>> logger)
            : base(
                store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors,services, logger)            
        {
            _duxUserStore = store;
        }

        public List<Usuario> FindUsuariosDist(int casaId)
        {
            return _duxUserStore.FindUsuariosDist(casaId);
        }


        public Usuario FindUserByNameInclude(string name)
        {
            return _duxUserStore.FindUserByNameInclude(name);
        }

        public Usuario FindByIdInclude(string id)
        {
            return _duxUserStore.FindByIdInclude(id);
        }


        public List<Usuario> GetUsuarios(int casaId)
        {
            return _duxUserStore.GetUsuarios(casaId);
        }

        public List<Claim> GetClaims(Usuario usuario, int casaId)
        {
            return _duxUserStore.GetClaims(usuario, casaId);
        }

        public void AddClaims(Usuario user, IEnumerable<Claim> claims, int casaId)
        {
            _duxUserStore.AddClaims(user, claims, casaId);
        }

        public void ReplaceClaims(Usuario user, Claim claim, Claim newClaim, int casaId)
        {
            _duxUserStore.ReplaceClaims(user, claim, newClaim, casaId);
        }

        public void RemoveClaims(Usuario user, IEnumerable<Claim> claims, int casaId)
        {
            _duxUserStore.RemoveClaims(user, claims, casaId);
        }

        public List<Acessos> GetAcessos()
        {
            return _duxUserStore.GetAcessos();
        }

        public List<Usuario> GetComissarios(int casaId, string usuarioId)
        {
            return _duxUserStore.GetComissarios(casaId, usuarioId);
        }
    }
}
    