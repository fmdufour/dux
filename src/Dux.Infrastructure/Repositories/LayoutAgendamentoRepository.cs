using Dux.Domain;
using Dux.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class LayoutAgendamentoRepository : GenericRepository<LayoutAgendamento>, ILayoutAgendamentoRepository 
    {
        private readonly DuxContext _ctx;

        public LayoutAgendamentoRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public void AddOrUpdate(LayoutAgendamento agend)
        {
            if (agend.Id > 0)
            {
                Update(agend);
            }
            else
            {
                Insert(agend);
            }
        }

        public LayoutAgendamento GetLayoutAgendamento(int id)
        {
            return _ctx.LayoutAgendamento.FirstOrDefault(p => p.Id == id);
        }

        public void RemoveExcluidos(List<LayoutAgendamento> layAgend)
        {
            List<LayoutAgendamento> excluidos = _ctx.LayoutAgendamento.Where(p => !layAgend.Any(o => o.Id == p.Id)).ToList();

            _ctx.LayoutAgendamento.RemoveRange(excluidos);
        }
    }
}
