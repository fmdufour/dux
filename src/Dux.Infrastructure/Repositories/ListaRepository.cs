using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class ListaRepository : GenericRepository<Lista>, IListaRepository
    {
        private readonly DuxContext _ctx;

        public ListaRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public Lista GetLista(int listaId, int casaId)
        {
            return _ctx.Listas
                .SingleOrDefault(p => p.Id.Equals(listaId) 
                                    && p.Evento.CasaId.Equals(casaId));
        }
    }
}
