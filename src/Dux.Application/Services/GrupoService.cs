using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;

namespace Dux.Application
{
    public class GrupoService : IGrupoService
    {
        private readonly IUnitOfWork _uow;

        public GrupoService(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
        }

        public Grupo AddGrupo(Grupo grupo)
        {
            _uow.GrupoRepository.Insert(grupo);
            _uow.Save();
            return grupo;
        }

        public IEnumerable<Grupo> GetGrupos()
        {
            return null;//_uow.GrupoRepository..ToList();
        }
       
    }
}
