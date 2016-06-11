using Dux.Domain;
using Dux.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class GrupoRepository : GenericRepository<Grupo>, IGrupoRepository 
    {
        private readonly DuxContext _ctx;

        public GrupoRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public Grupo GetGrupo(int id)
        {
            return _ctx.Grupos.FirstOrDefault(p => p.Id == id);
        }
    }
}
