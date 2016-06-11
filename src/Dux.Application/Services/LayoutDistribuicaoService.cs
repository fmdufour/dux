using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;

namespace Dux.Application
{
    public class LayoutDistribuicaoService : ILayoutDistribuicaoService
    {
        private readonly IUnitOfWork _uow;

        public LayoutDistribuicaoService(IUnitOfWork uow)
        {
            _uow = uow;
        }       
    }
}
