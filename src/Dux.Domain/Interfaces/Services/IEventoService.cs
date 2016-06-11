using System.Collections.Generic;
using Dux.Domain;
using System;

namespace Dux.Domain.Interfaces
{
    public interface IEventoService
    {
        void SalvaEvento(Evento evento, int casaId, int perfilListaId);
        List<Evento> GetEventos(int casaId, string userId, DateTime inicio, DateTime final);
        Evento GetEvento(int id, int casaId);
    }
}