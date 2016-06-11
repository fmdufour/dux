using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;

namespace Dux.Application
{
    public class AgendamentoService : IAgendamentoService
    {
        private readonly IUnitOfWork _uow;

        public AgendamentoService(IUnitOfWork uow)
        {
            _uow = uow;
        }

    }
}
