using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;

namespace Dux.Application
{
    public class LayoutAgendamentoService : ILayoutAgendamentoService
    {
        private readonly IUnitOfWork _uow;

        public LayoutAgendamentoService(IUnitOfWork uow)
        {
            _uow = uow;
        }       
    }
}
