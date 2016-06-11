using System;
using System.Collections.Generic;

namespace Dux.Domain.Interfaces
{
    public interface IEventoRepository : IGenericRepository<Evento>
    {
        Evento GetEvento(int id);
        List<Evento> GetEventos(int casaId, DateTime inicio, DateTime final);
        Evento GetEventoInclude(int eventoId, int casaId);
        Evento GetEventoInclListas(int eventoId, int casaId);
        Evento GetEvento(int id, int casaId);
    }
}