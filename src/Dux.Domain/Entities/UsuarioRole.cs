using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Domain
{
    public class UsuarioRole : IdentityUserRole<string>
    {
        public override string UserId { get; set; }
        public override string RoleId { get; set; }        
        public int CasaId { get; set; }
        public Casa Casa { get; set; }
    }
}
