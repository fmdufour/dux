using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class UsuarioCasaSelecRepository : GenericRepository<Casa>, IUsuarioCasaSelecRepository
    {
        private DuxContext _ctx;

        public UsuarioCasaSelecRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public async Task<UsuarioCasaSelec> GetCasaSelecAsync(string userId)
        {
            //_ctx = new DuxContext();
            return await _ctx.UsuarioCasaSelec.SingleOrDefaultAsync(p => p.UsuarioId.Equals(userId));
        }
    }
}
