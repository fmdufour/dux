using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;

namespace Dux.Application
{
    public class PerfilListaService : IPerfilListaService
    {
        private readonly IUnitOfWork _uow;

        public PerfilListaService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public List<string> EditaPerfil(PerfilLista perfilLista, int casaId)
        {
            List<string> erros = new List<string>();

            if (!_uow.PerfilListaRepository.Any(perfilLista.Id, casaId))
            {
                throw new RegraException("Usuario tentando editar perfil lista que não pertence a casa. " +
                    "perfilListaId: " + perfilLista.Id + " casaId:" + casaId);
            }

            if (perfilLista.LayoutListas == null || perfilLista.LayoutListas.Count == 0)
            {
                erros.Add("Adicione listas no perfil");
                return erros;
            }

            List<LayoutLista> layListas = perfilLista.LayoutListas.ToList();

            perfilLista.LayoutListas = null;

            _uow.PerfilListaRepository.Update(perfilLista);

            layListas.ForEach(p =>
            {
                p.PerfilListaId = perfilLista.Id;

                if (p.PerfilDistribuicaoId == 0)
                {
                    p.PerfilDistribuicaoId = null;
                }

                if (p.ListaF == false && p.ListaM == false)
                {
                    erros.Add("Na lista " + p.NomeLista + " não é permitido nenhum convidado, selecione Masc. e/ou Fem.");
                }

            });

            //remove listas excluidas na ediçao
            _uow.PerfilListaRepository.RemoveExcluidos(layListas);

            foreach (var layout in layListas)
            {
                List<LayoutAgendamento> layAgend = layout.LayoutAgendamentos.ToList();

                layout.LayoutAgendamentos = null;

                _uow.LayoutListaRepository.AddOrUpdate(layout);

                layAgend.ForEach(p => p.LayoutListaId = layout.Id);

                //remove layouts agendamentos excluidos da lista
                if (layAgend.Any())
                {
                    _uow.LayoutAgendamentoRepository.RemoveExcluidos(layAgend);
                }

                foreach (var agend in layAgend)
                {
                    _uow.LayoutAgendamentoRepository.AddOrUpdate(agend);
                }
            }

            if (erros.Count == 0)
            {
                _uow.Save();
            }
            return erros;
        }

        public PerfilLista GetPerfilIncl(int id, int casaId)
        {
            return _uow.PerfilListaRepository.GetPerfilIncl(id, casaId);
        }

        public List<PerfilLista> GetPerfis(int casaId)
        {
            return _uow.PerfilListaRepository.GetPerfis(casaId);
        }

        public List<string> SalvaPerfil(PerfilLista perfilLista)
        {
            List<string> erros = new List<string>();

            if (perfilLista.LayoutListas == null || perfilLista.LayoutListas.Count == 0)
            {
                erros.Add("Adicione listas no perfil");
                return erros;
            }

            List<LayoutLista> layListas = perfilLista.LayoutListas.ToList();

            perfilLista.LayoutListas = null;

            _uow.PerfilListaRepository.Insert(perfilLista);

            layListas.ForEach(p => 
            {
                p.PerfilListaId = perfilLista.Id;
                if (p.PerfilDistribuicaoId == 0)
                {
                    p.PerfilDistribuicaoId = null;
                }

                if (p.ListaF == false && p.ListaM == false)
                {
                    erros.Add("Na lista " + p.NomeLista + " não é permitido nenhum convidado, selecione Masc. e/ou Fem.");
                }
            });            

            foreach (var layout in layListas)
            {
                List<LayoutAgendamento> layAgend = layout.LayoutAgendamentos.ToList();

                layout.LayoutAgendamentos = null;

                _uow.LayoutListaRepository.Insert(layout);

                layAgend.ForEach(p => p.LayoutListaId = layout.Id);

                foreach (var agend in layAgend)
                {
                    _uow.LayoutAgendamentoRepository.Insert(agend);
                }
            }

            if (erros.Count == 0)
            {
                _uow.Save();
            }
            return erros;
        }
    }
}
