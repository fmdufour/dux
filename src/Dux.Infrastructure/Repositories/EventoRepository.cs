using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories   
{
    public class EventoRepository : GenericRepository<Evento>, IEventoRepository 
    {
        private readonly DuxContext _ctx;

        public EventoRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public Evento GetEvento(int id)
        {
            return _ctx.Eventos.FirstOrDefault(p => p.Id == id);
        }

        public Evento GetEvento(int id, int casaId)
        {
            return _ctx.Eventos.SingleOrDefault(p => p.Id == id && p.CasaId == casaId);
        }

        public Evento GetEventoInclListas(int eventoId, int casaId)
        {
            return _ctx.Eventos
                       .Include(p => p.Listas)
                       .SingleOrDefault(p => p.Id == eventoId
                               && p.CasaId == casaId);
        }

        public Evento GetEventoInclude(int eventoId, int casaId)
        {
            return _ctx.Eventos
                       .Include(p => p.Listas)
                       .Single(p => p.Id == eventoId && p.CasaId == casaId);
        }

        public List<Evento> GetEventos(int casaId, DateTime inicio, DateTime final)
        {
            return _ctx.Eventos.Where(p => p.CasaId.Equals(casaId)
                                        && p.DtaInicio > inicio
                                        && p.DtaInicio < final).ToList();
        }
    }
}
