using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;

namespace Dux.Application
{
    public class CasaService : ICasaService
    {
        private readonly IUnitOfWork _uow;

        public CasaService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public Casa GetCasa(int casaId)
        {
            return _uow.CasaRepository.GetCasa(casaId);
        }

        public List<Casa> GetCasasUsuario(string id)
        {
            return _uow.CasaRepository.GetCasasUsuario(id);
        }

        public List<Usuario> GetUsuariosDistCasa(int casaId)
        {
            return _uow.UsuarioManager.FindUsuariosDist(casaId);
        }

        public Casa SelecionaCasa(string usuarioId, int casaId)
        {
            List<Casa> casasUsuario = _uow.CasaRepository.GetCasasUsuario(usuarioId);

            Casa casaSelecionada = casasUsuario.FirstOrDefault(p => p.Id.Equals(casaId));

            if (casaSelecionada == null)
            {
                throw new RegraException("O Usuário não tem permissão para selecionar essa Casa");
            }

            _uow.CasaRepository.SelecionaCasa(usuarioId, casaId);

            _uow.Save();

            return casaSelecionada;
        }
    }
}
