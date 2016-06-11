using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;
using System.Security.Claims;

namespace Dux.Application
{
    public class AcessoService : IAcessoService
    {
        private readonly IUnitOfWork _uow;

        public AcessoService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public bool TemAcesso(Usuario usuario, int casaId, string claim)
        {
            List<Claim> claims = _uow.UsuarioManager.GetClaims(usuario, casaId);

            return claims.Any(p => p.Type.Equals(claim));
        }        
    }
}
