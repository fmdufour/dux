using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Domain
{
    public class UsuarioClaims : IdentityUserClaim<string>
    {
        public override string ClaimType { get; set; }
        public override string ClaimValue { get; set; }        
        public int CasaId { get; set; }
        public Casa Casa { get; set; }
    }
}
