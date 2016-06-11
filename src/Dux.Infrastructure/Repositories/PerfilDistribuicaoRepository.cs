using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class PerfilDistribuicaoRepository : GenericRepository<PerfilDistribuicao>, IPerfilDistribuicaoRepository 
    {
        private readonly DuxContext _ctx;

        public PerfilDistribuicaoRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public bool Any(int id, int casaId)
        {
            return _ctx.PerfilDistribuicao.Any(p => p.Id.Equals(id) && p.CasaId.Equals(casaId));
        }

        public PerfilDistribuicao GetPerfilDistribuicao(int perfilId, int casaId)
        {
            return _ctx.PerfilDistribuicao
                        .Include(p=> p.LayoutsDistribuicao)
                        .FirstOrDefault(p => p.Id.Equals(perfilId) && p.CasaId.Equals(casaId));
        }

        public List<PerfilDistribuicao> GetPerfis(int casaId)
        {
            return _ctx.PerfilDistribuicao.Where(p => p.CasaId.Equals(casaId)).ToList();
        }
    }
}
