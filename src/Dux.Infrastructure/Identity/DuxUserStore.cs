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
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Dux.Infrastructure
{
    public class DuxUserStore : UserStore<Usuario, IdentityRole, DuxContext, string>
    {
        public DuxUserStore(DuxContext context, IdentityErrorDescriber describer = null)
            : base(context, describer)
        {
        }

        
        public Usuario FindByIdInclude(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            return Context.Set<Usuario>()
                .Include(p => p.CasasUsuario)
                .Include(p => p.Roles)                
                .SingleOrDefault(u => u.Id.Equals(id));
        }

        public List<Usuario> FindUsuariosDist(int casaId)
        {
            List<Usuario> usuariosCasa = Context.Set<Usuario>()
                                                    .Where(p => p.CasasUsuario.Any(o => o.CasaId.Equals(casaId)
                                                            &&  !p.Comissario))
                                                    .ToList();

            List<Usuario> promoters = new List<Usuario>();

            foreach (var usu  in usuariosCasa)
            {
                if(GetClaims(usu, casaId).Any(p => p.Type == NomeClaims.AddNomesLista))
                {
                    promoters.Add(usu);
                }
            }

            return promoters;
        }

        public List<Usuario> GetUsuarios(int casaId)
        {
            return Context.Set<Usuario>()
                    .Include(p=> p.CasasUsuario)
                    .Where(p => !p.Comissario
                           && p.CasasUsuario.Count(o => o.CasaId.Equals(casaId)) > 0)
                    .ToList();
        }

        public List<Usuario> GetComissarios(int casaId, string usuarioId)
        {
            return Context.Set<Usuario>()
                    .Include(p => p.CasasUsuario)
                    .Where(p => p.Comissario
                           &&   p.PromoterId == usuarioId
                           &&   p.CasasUsuario.Count(o => o.CasaId == casaId) > 0)
                    .ToList();
        }

        public List<Acessos> GetAcessos()
        {
            return Context.Set<Acessos>().ToList(); 
        }

        public void RemoveClaims(Usuario user, IEnumerable<Claim> claims, int casaId)
        {
            List<UsuarioClaims> claimsParaRemover = Context.Set<UsuarioClaims>().Where(p => p.UserId.Equals(user.Id)
                                                        && p.CasaId.Equals(casaId)
                                                        && claims.Any(c => c.Type.Equals(p.ClaimType))).ToList();

            Context.Set<UsuarioClaims>().RemoveRange(claimsParaRemover);
        }


        public List<Claim> GetClaims(Usuario usuario, int casaId)
        {
            if (usuario == null)
            {
                throw new ArgumentNullException(nameof(usuario));
            }

            return Context.Set<UsuarioClaims>()
                            .Where(uc => uc.UserId.Equals(usuario.Id) && uc.CasaId.Equals(casaId))
                            .Select(c => new Claim(c.ClaimType, c.ClaimValue))
                            .ToList();
        }

        public void AddClaims(Usuario user, IEnumerable<Claim> claims, int casaId)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (claims == null)
            {
                throw new ArgumentNullException(nameof(claims));
            }
            foreach (var claim in claims)
            {
                Context.Set<UsuarioClaims>().Add(new UsuarioClaims { UserId = user.Id, ClaimType = claim.Type, ClaimValue = claim.Value, CasaId = casaId });
            }                        
        }

        public void ReplaceClaims(Usuario user, Claim claim, Claim newClaim, int casaId)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            if (claim == null)
            {
                throw new ArgumentNullException(nameof(claim));
            }
            if (newClaim == null)
            {
                throw new ArgumentNullException(nameof(newClaim));
            }

            var matchedClaims = Context.Set<UsuarioClaims>().Where(uc => uc.UserId.Equals(user.Id) 
                                                                    && uc.ClaimValue == claim.Value 
                                                                    && uc.ClaimType == claim.Type
                                                                    && uc.CasaId.Equals(casaId));
            foreach (var matchedClaim in matchedClaims)
            {
                matchedClaim.ClaimValue = newClaim.Value;
                matchedClaim.ClaimType = newClaim.Type;
            }
        }

        public Usuario FindUserByNameInclude(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException(nameof(name));
            }

            return Context.Set<Usuario>()
                .Include(p => p.CasasUsuario)                
                .SingleOrDefault(u => u.UserName.Equals(name));
        }
    }
}
    