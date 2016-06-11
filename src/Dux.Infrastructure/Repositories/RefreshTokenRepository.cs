using Dux.Domain;
using Dux.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class RefreshTokenRepository : GenericRepository<RefreshToken>, IRefreshTokenRepository 
    {
        private readonly DuxContext _ctx;

        public RefreshTokenRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public RefreshToken GetBySubjectAndId(string subject, string id)
        {
            return _ctx.RefreshTokens.FirstOrDefault(p => p.Subject == subject && p.Id == id);
        }

        public RefreshToken GetRefreshToken(string id)
        {
            return _ctx.RefreshTokens.FirstOrDefault(p => p.Id == id);
        }


    }
}
