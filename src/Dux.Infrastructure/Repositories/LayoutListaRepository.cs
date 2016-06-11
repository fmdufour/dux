using Dux.Domain;
using Dux.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class LayoutListaRepository : GenericRepository<LayoutLista>, ILayoutListaRepository 
    {
        private readonly DuxContext _ctx;

        public LayoutListaRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }        

        public void AddOrUpdate(LayoutLista layout)
        {
            if (layout.Id > 0)
            {
                Update(layout);
            }
            else
            {
                Insert(layout);
            }
        }

        public LayoutLista GetLayoutLista(int id)
        {
            return _ctx.LayoutLista.FirstOrDefault(p => p.Id == id);
        }
    }
}
