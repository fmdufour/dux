using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class PerfilListaRepository : GenericRepository<PerfilLista>, IPerfilListaRepository 
    {
        private readonly DuxContext _ctx;

        public PerfilListaRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public bool Any(int id, int casaId)
        {
            return _ctx.PerfilLista.Any(p => p.Id.Equals(id) && p.CasaId.Equals(casaId));
        }

        public PerfilLista GetPerfilIncl(int id, int casaId)
        {
            PerfilLista perfil = _ctx.PerfilLista
                                            .Include(p => p.LayoutListas)
                                            .Single(p => p.Id.Equals(id) && p.CasaId.Equals(casaId));

            //carrega agendamento das listas
            foreach (var lista in perfil.LayoutListas)
            {
                perfil.LayoutListas.First(p => p.Id.Equals(lista.Id)).LayoutAgendamentos = 
                    _ctx.LayoutAgendamento.Where(p => p.LayoutListaId.Equals(lista.Id)).ToList();
            }

            return perfil;
                                            
        }

        public PerfilLista GetPerfilLista(int id)
        {
            return _ctx.PerfilLista.FirstOrDefault(p => p.Id == id);
        }

        public List<PerfilLista> GetPerfis(int casaId)
        {
            return _ctx.PerfilLista.Where(p => p.CasaId.Equals(casaId)).ToList();
        }

        public void RemoveExcluidos(List<LayoutLista> layListas)
        {
            List<LayoutLista> excluidos = _ctx.LayoutLista
                                                .Include(p=> p.LayoutAgendamentos)
                                                .Where(p => !layListas.Any(o => o.Id == p.Id)).ToList();

            foreach (var e in excluidos)
            {
                if (e.LayoutAgendamentos != null && e.LayoutAgendamentos.Any())
                {
                    _ctx.LayoutAgendamento.RemoveRange(e.LayoutAgendamentos);
                }
            }
            _ctx.RemoveRange(excluidos);
        }
    }
}
