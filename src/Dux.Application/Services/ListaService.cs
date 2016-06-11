using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;

namespace Dux.Application
{
    public class ListaService : IListaService
    {
        private readonly IAcessoService _acessoService;
        private readonly IUnitOfWork _uow;

        public ListaService(IUnitOfWork uow, IAcessoService acessoService)
        {
            _uow = uow;
            _acessoService = acessoService;
        }

        public void CriaLista(Lista lista, int casaId, int perfilDistId)
        {
            Evento evento = _uow.EventoRepository.GetEvento(lista.EventoId);

            if (!evento.CasaId.Equals(casaId))
            {
                throw new RegraException("Tentando adicionar Lista a evento que não pertence a casa" +
                            "casaId:" + casaId + " nomeLista:" + lista.NomeLista);
            }


            //adiciona lista
            lista.FechadaM = false;
            lista.FechadaF = false;
            _uow.ListaRepository.Insert(lista);


            //verifica se existe perfil de distribuicao
            if (perfilDistId > 0)
            {
                PerfilDistribuicao perfilDist = _uow.PerfilDistribuicaoRepository.GetPerfilDistribuicao(perfilDistId, casaId);

                if (perfilDist == null)
                {
                    throw new RegraException("Tentando criar lista com perfil de distribuição que não pertence a casa"
                        + "casaId:" + casaId + " perfilDistId:" + perfilDistId);
                }

                //adiciona distribuicoes
                foreach (var dist in perfilDist.LayoutsDistribuicao)
                {
                    //adiciona acesso do usuario a essa lista
                    _uow.UsuarioListaRepository.Insert(new UsuarioLista
                    {
                        ListaId = lista.Id,
                        UsuarioId = dist.UsuarioId,
                        EventoId = lista.EventoId,
                        TemAcesso = true
                    });

                    //adiciona a distribuicao do usuario a lista
                    _uow.DistribuicaoRepository.Insert(new Distribuicao
                    {
                        qtdNomesF = dist.qtdNomesF,
                        qtdNomesM = dist.qtdNomesM,
                        ListaId = lista.Id,
                        UsuarioId = dist.UsuarioId
                    });
                }
            }

            _uow.Save();
        }

        public void EditaLista(Lista lista, int casaId)
        {
            Lista listaAnt = _uow.ListaRepository.GetLista(lista.Id, casaId);

            if (listaAnt == null)
            {
                throw new RegraException("Tentando editar Lista que não pertence a casa." +
                    "casaId:" + casaId + " listaId:" + lista.Id);
            }

            listaAnt.NomeLista = lista.NomeLista;
            listaAnt.PrecoF = lista.PrecoF;
            listaAnt.PrecoM = lista.PrecoM;
            listaAnt.ListaF = lista.ListaF;
            listaAnt.ListaM = lista.ListaM;
            listaAnt.dtaEdicao = DateTime.Now;
            listaAnt.ExigirCelular = lista.ExigirCelular;
            listaAnt.ExigirRg = lista.ExigirRg;
            listaAnt.ValorConsumaF = lista.ValorConsumaF;
            listaAnt.ValorConsumaM = lista.ValorConsumaM;

            _uow.ListaRepository.Update(listaAnt);

            _uow.Save();
        }

        public Lista GetLista(int listaId, int casaId, string usuarioId)
        {
            Lista lista = _uow.ListaRepository.GetLista(listaId, casaId);

            if (lista == null)
            {
                throw new RegraException("Tentando acessar lista que não pertence a casa. "
                    + "listaId:" + listaId + " casaId:" + casaId + " usuarioId:" + usuarioId);
            }

            Usuario usuario = _uow.UsuarioManager.FindByIdInclude(usuarioId);

            if (_acessoService.TemAcesso(usuario, casaId, NomeClaims.Listas)
                || _acessoService.TemAcesso(usuario, casaId, NomeClaims.Master))
            {
                return lista;
            }


            List<UsuarioLista> listasUsuario = _uow.UsuarioListaRepository.GetListas(usuarioId, lista.EventoId);

            if (listasUsuario.Any(p=> p.ListaId == lista.Id))
            {
                return lista;
            }

            throw new RegraException("Tentando acessar lista que não tem acesso."
                     + "listaId:" + listaId + " casaId:" + casaId + "usuarioId: " + usuarioId);

        }

        public List<Lista> GetListasEvento(int eventoId, int casaId, string usuarioId)
        {
            Evento evento = _uow.EventoRepository.GetEventoInclude(eventoId, casaId);

            Usuario usuario = _uow.UsuarioManager.FindByIdInclude(usuarioId);

            if (evento == null)
            {
                throw new RegraException("Tentando acessar listas que não pertencem a casa. "
                    + "eventoId:" + eventoId + " casaId:" + casaId);
            }

            if (_acessoService.TemAcesso(usuario, casaId, NomeClaims.Listas)
                || _acessoService.TemAcesso(usuario, casaId, NomeClaims.Master))
            {
                //se usuario tem acesso a listas retorna todas as listas do evento
                return evento.Listas;
            }
            else
            {
                //retorna apenas listas que o usuário tem acesso (foram distribuidos convidados para ele)
                List<UsuarioLista> listasUsuario = _uow.UsuarioListaRepository.GetListas(usuarioId, eventoId);

                return evento.Listas
                                    .Where(p => listasUsuario.Any(o => o.ListaId == p.Id))
                                    .ToList();
            }
        }

        public List<ListaPromoter> GetListasPromoter(int eventoId, string usuarioId, int casaId)
        {
            List<ListaPromoter> listas = new List<ListaPromoter>();

            List<UsuarioLista> listasPromoter = _uow.UsuarioListaRepository.GetListasIncl(usuarioId, eventoId);

            foreach (var uLista in listasPromoter)
            {
                Distribuicao distribuicao = _uow.DistribuicaoRepository.GetDist(usuarioId, uLista.ListaId);


                int nomesM = _uow.NomeListaRepository.CountNomesLista(uLista.ListaId, usuarioId, true);
                int nomesF = _uow.NomeListaRepository.CountNomesLista(uLista.ListaId, usuarioId, false);

                listas.Add(new ListaPromoter
                {
                    Id = uLista.ListaId,
                    NomeLista = uLista.Lista.NomeLista,
                    NomesInserF = nomesF,
                    QtdNomesF = distribuicao.qtdNomesF,
                    ListaM = uLista.Lista.ListaM,
                    ListaF = uLista.Lista.ListaF,
                    NomesInserM = nomesM,
                    QtdNomesM = distribuicao.qtdNomesM,
                    PrecoF = uLista.Lista.PrecoM,
                    PrecoM = uLista.Lista.PrecoF,
                    ValorConsumaM = uLista.Lista.ValorConsumaM,
                    ValorConsumaF = uLista.Lista.ValorConsumaF
                });
            }

            return listas;
        }
    }
}
