using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web
{
    public class UsuarioTemClaim : AuthorizationHandler<UsuarioTemClaim>, IAuthorizationRequirement
    {
        private readonly string[] _claims;

        public UsuarioTemClaim(string[] claims)
        {
            _claims = claims;
        }

        protected override void Handle(AuthorizationContext context, UsuarioTemClaim requirement)
        {
            bool valido = false;

            foreach(var acesso in _claims)
            {
                if (context.User.HasClaim(p=> p.Type == acesso))
                {
                    valido = true;
                    break;
                }
            }

            if (valido)
            {
               context.Succeed(requirement);

               return;
            }

            context.Fail();
        }
    }
}
