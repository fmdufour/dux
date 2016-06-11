
using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;

namespace Dux.Application
{
    public class PerfilDistribuicaoService : IPerfilDistribuicaoService
    {
        private readonly IUnitOfWork _uow;

        public PerfilDistribuicaoService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public void CriaPerfil(PerfilDistribuicao perfilDist)
        {
            List<LayoutDistribuicao> remover = new List<LayoutDistribuicao>();

            foreach (LayoutDistribuicao layout in perfilDist.LayoutsDistribuicao)
            {
                if (layout.qtdNomesF == 0 && layout.qtdNomesM == 0)
                {
                    remover.Add(layout);
                }
            }
            foreach (var layout in remover)
            {
                perfilDist.LayoutsDistribuicao.Remove(layout);
            }

            _uow.PerfilDistribuicaoRepository.Insert(perfilDist);
            _uow.Save();
        }

        public void EditaPerfil(PerfilDistribuicao perfilDist, int casaId)
        {
            List<LayoutDistribuicao> remover = new List<LayoutDistribuicao>();

            if (!_uow.PerfilDistribuicaoRepository.Any(perfilDist.Id, casaId))
            {
                throw new RegraException("Edição de perfil de distribuição que não pertence a casa. perfil dist: " +
                    perfilDist.Id + " casaId: " + casaId);
            }

            foreach (LayoutDistribuicao layout in perfilDist.LayoutsDistribuicao)
            {
                if (layout.qtdNomesF == 0 && layout.qtdNomesM == 0)
                {
                    remover.Add(layout);
                }
                layout.PerfilDistribuicaoId = perfilDist.Id;
            }
            foreach (var layout in remover)
            {
                perfilDist.LayoutsDistribuicao.Remove(layout);
                if (layout.Id > 0)
                {
                    _uow.LayoutDistribuicaoRepository.Delete(layout);
                }
            }

            _uow.PerfilDistribuicaoRepository.Update(perfilDist);
            _uow.LayoutDistribuicaoRepository.AddOrUpdate(perfilDist.LayoutsDistribuicao);

            _uow.Save();
        }

        public void ExcluiPerfil(int perfilId, int casaId)
        {
            PerfilDistribuicao perfil = _uow.PerfilDistribuicaoRepository.GetPerfilDistribuicao(perfilId, casaId);

            if (perfil == null)
            {
                throw new RegraException("Perfil para exclusão não encontrado");
            }

            _uow.PerfilDistribuicaoRepository.Delete(perfil);
            _uow.Save();
        }

        public PerfilDistribuicao GetPerfilTodosUsuarios(int perfilDistId, int casaId)
        {
            PerfilDistribuicao perfil = _uow.PerfilDistribuicaoRepository.GetPerfilDistribuicao(perfilDistId, casaId);

            if (perfil == null)
            {
                throw new RegraException("Usuário tentando editar perfil que não é de sua casa");
            }

            List<Usuario> usuarios = _uow.UsuarioManager.FindUsuariosDist(casaId);

            foreach (var usuario in usuarios)
            {
                if (!perfil.LayoutsDistribuicao.Any(p => p.UsuarioId.Equals(usuario.Id)))
                {
                    perfil.LayoutsDistribuicao.Add(new LayoutDistribuicao
                    {
                        UsuarioId = usuario.Id,
                        qtdNomesF = 0,
                        qtdNomesM = 0
                    });
                }
            }
            return perfil;
        }

        public List<PerfilDistribuicao> GetPerfis(int casaId)
        {
            return _uow.PerfilDistribuicaoRepository.GetPerfis(casaId);
        }        
    }
}
