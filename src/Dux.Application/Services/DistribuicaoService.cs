using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;

namespace Dux.Application
{
    public class DistribuicaoService : IDistribuicaoService
    {
        private readonly ICasaService _casaService;
        private readonly IUnitOfWork _uow;

        public DistribuicaoService(IUnitOfWork uow, ICasaService casaService)
        {
            _uow = uow;
            _casaService = casaService;
        }

        public List<Distribuicao> GetDist(int casaId, int listaId)
        {
            Lista lista = _uow.ListaRepository.GetLista(listaId, casaId);

            if (lista == null)
            {
                throw new RegraException("Tentando recuperar distribuicao de convidados de lista que não pertence a casa." +
                    "casaId:" + casaId + " listaId:" + listaId);
            }

            List<Usuario> usuariosDist = _casaService.GetUsuariosDistCasa(casaId);

            List<Distribuicao> distribuicoes = _uow.DistribuicaoRepository.GetDist(listaId);

            foreach (var usu in usuariosDist)
            {
                if (!distribuicoes.Any(p=> p.UsuarioId == usu.Id))
                {
                    distribuicoes.Add(new Distribuicao
                    {
                        ListaId = listaId,
                        qtdNomesF = 0,
                        qtdNomesM = 0,
                        UsuarioId = usu.Id,                        
                    });
                }
            }

            return distribuicoes;
        }

        public Distribuicao GetDistribuicao(int listaId, string usuarioId)
        {
            Distribuicao dist = _uow.DistribuicaoRepository.GetDistribuicao(listaId, usuarioId);

            if (dist == null)
            {
                throw new RegraException("Tentando acessar distribuicao de lista que não tem acesso" +
                    "listaId:" + listaId + " usuarioId:" + usuarioId);
            }

            return dist;
        }

        public void SalvaDist(int listaId, int casaId, List<Distribuicao> distribuicoes)
        {
            Lista lista = _uow.ListaRepository.GetLista(listaId, casaId);

            if (lista == null)
            {
                throw new RegraException("Tentando distribuir convidados para lista que não pertence a casa." +
                    "casaId:" + casaId + " listaId:" + listaId);
            }

            foreach (var dist in distribuicoes)
            {                
                if (dist.qtdNomesF == 0 && dist.qtdNomesM == 0)
                {
                    if (dist.Id > 0)
                    {
                        _uow.DistribuicaoRepository.Delete(dist);
                        _uow.UsuarioListaRepository.RetiraAcesso(listaId, dist.UsuarioId);
                    }                    
                }
                else
                {
                    dist.ListaId = listaId;

                    if (dist.Id > 0)
                    {
                        _uow.DistribuicaoRepository.Update(dist);
                    }
                    else
                    {
                        //add distribuicao para usuario na lista
                        _uow.DistribuicaoRepository.Insert(dist);

                        //add acesso do usuário para aquela lista
                        _uow.UsuarioListaRepository.AddAcesso(lista.EventoId, dist.UsuarioId, lista.Id);
                    }
                }
            }

            _uow.Save();
        }

        public List<DistribuicoesComis> GetDistribuicoesPromoter(string usuarioId, int casaId, int eventoId)
        {
            Evento evento = _uow.EventoRepository.GetEvento(eventoId);

            if (evento.CasaId != casaId)
            {
                throw new RegraException("");
            }

            return new List<DistribuicoesComis>();

        }
    }
}
