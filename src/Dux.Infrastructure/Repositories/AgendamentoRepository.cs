using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class AgendamentoRepository : GenericRepository<Agendamento>, IAgendamentoRepository 
    {
        private readonly DuxContext _ctx;

        public AgendamentoRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }
    }
}
