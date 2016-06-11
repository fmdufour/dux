using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Server;
using Dux.Application;
using Dux.Domain;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;



namespace Dux.Web.Providers
{
    public sealed class AuthorizationProvider : OpenIdConnectServerProvider
    {        
        private IAuthService _authService;

        public override Task ValidateTokenRequest(ValidateTokenRequestContext context)
        {                    
            string clientId = string.Empty;
            string clientSecret = string.Empty;
            Client client = null;

            _authService = (IAuthService)context.HttpContext.RequestServices.GetService(typeof(IAuthService));
            if (context.ClientId == null)
            {
                //Remove the comments from the below line context.SetError, and invalidate context 
                //if you want to force sending clientId/secrects once obtain access tokens. 
                //context.Validate();
                context.Reject("Nao foram fornecidas todas as credenciais necessarias");

                return Task.FromResult<object>(null);
            }
           
            client = _authService.FindClient(context.ClientId);
           
            if (client == null)
            {
                context.Reject("O clientId fornecido nao eh valido");
                return Task.FromResult<object>(null);
            }

            if (!client.Active)
            {
                context.Reject("O Client nao esta mais ativo");
                return Task.FromResult<object>(null);
            }

            context.Validate();

            return Task.FromResult<object>(null);
        }

        public async override Task GrantResourceOwnerCredentials(
            GrantResourceOwnerCredentialsContext context)
        {
            _authService = (IAuthService)context.HttpContext.RequestServices.GetService(typeof(IAuthService));
            Client client = _authService.FindClient(context.ClientId);
            string allowedOrigin = string.Empty;

            allowedOrigin = client.AllowedOrigin == null ? "*" : client.AllowedOrigin;

            //comentado pois está dando conflito com cors adicionado anteriormente
            //context.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            var user =  await _authService.GetUsuarioEmail(context.UserName);

            var valid = await _authService.CheckPasswordAsync(user, context.Password);            

            if (valid)
            {                                                
                int casaId = await _authService.GetCasaSelecionada(user);
                
                //verifica se usuario esta bloqueado para aquela casa
                if (_authService.AcessoUsuarioBloqueado(user.Id, casaId))
                {
                    //tenta obter acesso em outra casa
                    int novaCasaSelec = _authService.TentaSelecOutraCasa(user.Id, casaId);

                    if (novaCasaSelec == 0)
                    {
                        context.Reject("O seu acesso foi bloqueado");
                        return;
                    }

                    casaId = novaCasaSelec;
                }                                                                                               

                var identity = new ClaimsIdentity(OpenIdConnectServerDefaults.AuthenticationScheme);

                foreach (var claim in  _authService.GetClaims(user, casaId))
                {
                    identity.AddClaim(claim.Type, claim.Value, "access_token", "id_token");
                }
                
                identity.AddClaim("casa", casaId.ToString(), "access_token", "id_token");

                identity.AddClaim(ClaimTypes.NameIdentifier, user.Id, "access_token", "id_token");

                identity.AddClaim(ClaimTypes.Name, user.UserName, "access_token", "id_token");


                var principal = new ClaimsPrincipal(identity);                

                var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "client_id", (context.ClientId == null) ? string.Empty : context.ClientId
                    },
                    {
                        "userName", context.UserName
                    }
                });

                var ticket = new AuthenticationTicket(principal, props, OpenIdConnectServerDefaults.AuthenticationScheme);

                List<string> scopes = new List<string>();
                if (context.Request.HasScope("offline_access"))
                {
                    scopes.Add("offline_access");
                }

                ticket.SetScopes(scopes);

                context.Validate(ticket);
            }
        }

        public override Task DeserializeRefreshToken(DeserializeRefreshTokenContext context)
        {
            _authService = (IAuthService)context.HttpContext.RequestServices.GetService(typeof(IAuthService));
            var refreshToken = _authService.FindRefreshToken(context.RefreshToken);

            if (refreshToken != null)
            {
                var result = _authService.RemoveRefreshToken(refreshToken.Id);
                //Get protectedTicket from refreshToken class

                context.Ticket = context.DataFormat.Unprotect(refreshToken.ProtectedTicket);
                
            }
            
            return Task.FromResult<object>(null);
        }


        public override Task SerializeRefreshToken(SerializeRefreshTokenContext context)
        {
            _authService = (IAuthService)context.HttpContext.RequestServices.GetService(typeof(IAuthService));
            var clientid = string.Empty;
            context.Ticket.Properties.Items.TryGetValue("client_id", out clientid);

            if (string.IsNullOrEmpty(clientid))
            {
                return Task.FromResult(0);
            }

            var refreshTokenId = Guid.NewGuid().ToString("n");

            Client client = _authService.FindClient(clientid);

            var refreshTokenLifeTime = client.RefreshTokenLifeTime;

            var token = new RefreshToken()
            {
                Id = refreshTokenId,
                ClientId = clientid,
                Subject = context.Ticket.Principal.Identity.Name,
                IssuedUtc = DateTime.Now,
                ExpiresUtc = DateTime.Now.AddMinutes(Convert.ToDouble(refreshTokenLifeTime))
            };

            context.Ticket.Properties.IssuedUtc = token.IssuedUtc;
            context.Ticket.Properties.ExpiresUtc = token.ExpiresUtc;
            

            token.ProtectedTicket = context.DataFormat.Protect(context.Ticket);

            var result = _authService.AddRefreshToken(token);

            if (result)
            {
                context.RefreshToken = refreshTokenId;
            }

            return Task.FromResult<object>(null);
        }


        public override async Task GrantRefreshToken(GrantRefreshTokenContext context)
        {
            //_authService = (IAuthService)context.HttpContext.ApplicationServices.GetService(typeof(IAuthService));
            _authService = (IAuthService)context.HttpContext.RequestServices.GetService(typeof(IAuthService));
            string originalClient = string.Empty;
            context.Ticket.Properties.Items.TryGetValue("client_id", out originalClient);
            var currentClient = context.ClientId;

            if (originalClient != currentClient)
            {
                context.Reject("O Refresh token foi criado para outro client_id");                
            }

            string username = string.Empty;

            context.Ticket.Properties.Items.TryGetValue("userName", out username);


            var user = await _authService.GetUsuarioEmail(username);            

            var identity = new ClaimsIdentity(OpenIdConnectServerDefaults.AuthenticationScheme);

            int casaId = await _authService.GetCasaSelecionada(user);

            //verifica se usuario esta bloqueado para aquela casa
            if (_authService.AcessoUsuarioBloqueado(user.Id, casaId))
            {
                //tenta obter acesso em outra casa
                int novaCasaSelec = _authService.TentaSelecOutraCasa(user.Id, casaId);

                if (novaCasaSelec == 0)
                {
                    context.Reject("O seu acesso foi bloqueado");
                    return;
                }

                casaId = novaCasaSelec;
            }

            foreach (var claim in _authService.GetClaims(user, casaId))
            {
                identity.AddClaim(claim.Type, claim.Value, "access_token", "id_token");
            }

            identity.AddClaim("casa", casaId.ToString(), "access_token", "id_token");

            identity.AddClaim(ClaimTypes.NameIdentifier, user.Id, "access_token", "id_token");

            identity.AddClaim(ClaimTypes.Name, user.UserName, "access_token", "id_token");


            var principal = new ClaimsPrincipal(identity);


            var newTicket = new AuthenticationTicket(principal,
                context.Ticket.Properties,
                OpenIdConnectServerDefaults.AuthenticationScheme);

            context.Validate(newTicket);            
        }    

    }
}
