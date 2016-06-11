using Dux.Domain;
using Dux.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class LayoutDistribuicaoRepository : GenericRepository<LayoutDistribuicao>, ILayoutDistribuicaoRepository 
    {
        private readonly DuxContext _ctx;

        public LayoutDistribuicaoRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public void AddOrUpdate(List<LayoutDistribuicao> layoutsDistribuicao)
        {
            foreach (LayoutDistribuicao layout in layoutsDistribuicao)
            {
                if (layout.Id > 0)
                {
                    Update(layout);
                }
                else
                {
                    _ctx.Add(layout);
                }
            }
        }

        public LayoutDistribuicao GetLayoutDistribuicao(int id)
        {
            return _ctx.LayoutDistribuicao.FirstOrDefault(p => p.Id == id);
        }
    }
}
