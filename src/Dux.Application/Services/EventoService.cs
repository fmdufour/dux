using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;

namespace Dux.Application
{
    public class EventoService : IEventoService
    {
        private readonly IUnitOfWork _uow;

        public EventoService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public Evento GetEvento(int id, int casaId)
        {
            Evento evento = _uow.EventoRepository.GetEvento(id, casaId);

            if (evento == null)
            {
                throw new RegraException("Tentando acessar evento que não pertence a casa\n" +
                    "eventoId:" + id + " casaId:" + casaId);
            }

            return evento;
        }

        public List<Evento> GetEventos(int casaId, string userId, DateTime inicio, DateTime final)
        {
            List<Evento> eventos = _uow.EventoRepository.GetEventos(casaId, inicio, final);

            return eventos;
        }

        public void SalvaEvento(Evento evento, int casaId, int perfilListaId)
        {

            evento.CasaId = casaId;
            _uow.EventoRepository.Insert(evento);


            if (perfilListaId > 0)
            {
                PerfilLista perfilLista = _uow.PerfilListaRepository.GetPerfilIncl(perfilListaId, casaId);

                if (perfilLista == null)
                {
                    throw new RegraException("Usuario tentando criar evento com perfil lista que não pertence a casa. " +
                    "perfilListaId: " + perfilLista.Id + " casaId:" + casaId);
                }

                //cria listas e agendamentos de acordo com o perfil lista

                foreach (var layLista in perfilLista.LayoutListas)
                {
                    //insere nova lista

                    Lista lista = new Lista
                    {
                        NomeLista = layLista.NomeLista,
                        AgendarTarefas = layLista.AgendarTarefas,
                        EventoId = evento.Id,
                        ListaF = layLista.ListaF,
                        PrecoF = layLista.PrecoF,
                        ListaM = layLista.ListaM,
                        PrecoM = layLista.PrecoM,
                        ValorConsumaF = layLista.ValorConsumaF,
                        ValorConsumaM = layLista.ValorConsumaM,
                        FechadaM = false,
                        FechadaF = false,
                        ExigirCelular = layLista.ExigirCelular,
                        ExigirRg = layLista.ExigirRg
                    };

                    _uow.ListaRepository.Insert(lista);

                    foreach (var layAgend in layLista.LayoutAgendamentos)
                    {
                        //agenda tarefas da lista
                        Agendamento agend = new Agendamento
                        {
                            TipoAgendamento = layAgend.TipoAgendamento,
                            Executado = false,
                            FecharListaF = layAgend.FecharListaF,
                            FecharListaM = layAgend.FecharListaM,
                            ListaId = lista.Id,
                            NovoValorF = layAgend.NovoValorF,
                            NovoValorM = layAgend.NovoValorM,
                            trocarValorF = layAgend.trocarValorF,
                            trocarValorM = layAgend.trocarValorM                            
                        };

                        DateTime horaAcao = evento.DtaInicio;
                        if (layAgend.DepoisEvento)
                        {
                            if (layAgend.qtdHoras > 0)
                            {
                                agend.HoraAcao = horaAcao.AddHours(layAgend.qtdHoras);
                            }
                            if (layAgend.qtdMinutos > 0)
                            {
                                agend.HoraAcao = horaAcao.AddMinutes(layAgend.qtdMinutos);

                            }
                        }
                        else
                        {
                            if (layAgend.qtdHoras > 0)
                            {
                                agend.HoraAcao = horaAcao.AddHours(-layAgend.qtdHoras);
                            }
                            if (layAgend.qtdMinutos > 0)
                            {
                                agend.HoraAcao = horaAcao.AddMinutes(-layAgend.qtdMinutos);
                            }
                        }
                        _uow.AgendamentoRepository.Insert(agend);
                    }


                    if (layLista.PerfilDistribuicaoId != null)
                    {
                        //distribui convidados para as listas

                        PerfilDistribuicao perfilDist =
                                                _uow.PerfilDistribuicaoRepository.GetPerfilDistribuicao((int)layLista.PerfilDistribuicaoId, casaId);

                        foreach (var layDist in perfilDist.LayoutsDistribuicao)
                        {
                            Distribuicao dist = new Distribuicao
                            {
                                ListaId = lista.Id,
                                UsuarioId = layDist.UsuarioId,
                                qtdNomesF = layDist.qtdNomesF,
                                qtdNomesM = layDist.qtdNomesM,
                            };

                            _uow.DistribuicaoRepository.Insert(dist);

                            //add acesso do usuário para aquela lista
                            _uow.UsuarioListaRepository.AddAcesso(evento.Id, dist.UsuarioId, lista.Id);
                        }
                    }
                }
            }

            _uow.Save();
        }
    }
}
