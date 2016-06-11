using System;
using Dux.Domain;
using System.Linq;
using System.Collections.Generic;
using Dux.Domain.Interfaces;
using Dux.Infrastructure;
using Dux.Infrastructure.Exceptions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Dux.Application
{
    public class NomeListaService : INomeListaService
    {
        private readonly IUnitOfWork _uow;

        public NomeListaService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public List<string> AddNomes(List<NomeLista> nomes, int listaId, int casaId, string usuarioId)
        {
            Lista lista = _uow.ListaRepository.GetLista(listaId, casaId);

            if (lista == null)
            {
                throw new RegraException("Tentando adicionar nomes em lista que não pertence a Casa." +
                    "casaId:" + casaId + " usuarioId:" + usuarioId + " listaId:" + listaId);
            }

            Distribuicao dist = _uow.DistribuicaoRepository.GetDistribuicao(listaId, usuarioId);

            List<NomeLista> nomesAntigos = _uow.NomeListaRepository.GetNomesPromoter(listaId, usuarioId);

            //pega nomes que não estão mais na lista do promoter
            List<NomeLista> nomesRetirados = nomesAntigos.Where(p => !nomes.Any(n => n.Nome.Trim() == p.Nome)).ToList();

            //qtd real de nomes já inseridos
            int qtdM = nomesAntigos.Count(p => p.Masculino) - nomesRetirados.Count(p => p.Masculino);
            int qtdF = nomesAntigos.Count(p => !p.Masculino) - nomesRetirados.Count(p => !p.Masculino);


            List<string> erros = new List<string>();


            //remove nomes retirados da lista
            foreach(var nome in nomesRetirados)
            {
                if (nome.PresencaConf)
                {
                    erros.Add("O Convidado " + nome.Nome + " não foi retirado da lista pois sua presença já foi confirmada");
                    if (nome.Masculino)
                    {
                        qtdM++;
                    }
                    else
                    {
                        qtdF++;
                    }
                }
                else
                {
                    _uow.NomeListaRepository.Delete(nome);
                }
            }

            foreach (var nome in nomes)
            {
                NomeLista nomeAux;

                //se nome já foi adicionado anteriormente
                if ((nomeAux = nomesAntigos.FirstOrDefault(p => p.Nome == nome.Nome.Trim())) != null)
                {
                    if (VerificaMudancaDeGenero(nome, nomeAux, lista, usuarioId, erros, qtdM, qtdF, dist))
                    {
                        continue;
                    }

                    nomeAux.numCelular = nome.numCelular;
                    nomeAux.numRg = nome.numRg;
                    _uow.NomeListaRepository.Update(nomeAux);
                }
                else
                {
                    nome.Nome = nome.Nome.Trim();

                    //verifica se pode colocar nome do gênero selecionado
                    if (lista.ListaM && nome.Masculino || lista.ListaF && !nome.Masculino)
                    {
                        //verifica se não excede quantidade de nomes distribuida para promoter
                        if (nome.Masculino && (dist.qtdNomesM > qtdM) || !nome.Masculino && (dist.qtdNomesF > qtdF))
                        {
                            PreencheNome(nome, lista, usuarioId);

                            if (nome.Masculino)
                            {
                                qtdM++;
                            }
                            else
                            {
                                qtdF++;
                            }

                            _uow.NomeListaRepository.Insert(nome);
                        }
                        else
                        {
                            if (nome.Masculino && (dist.qtdNomesM == 0) || !nome.Masculino && (dist.qtdNomesF == 0))
                            {
                                erros.Add("O Nome " + nome.Nome + " não foi adicionado pois não foram distribuídos convidados da Lista "
                                 + (nome.Masculino ? "Masc." : "Fem.") + " para seu usuário");
                            }
                            erros.Add("O Nome " + nome.Nome + " não foi adicionado pois sua lista "
                                 + (nome.Masculino ? "Masc." : "Fem.") + " está cheia");
                        }
                    }
                    else
                    {
                        erros.Add("O Nome " + nome.Nome + " não foi adicionado pois nessa lista não são permitidos "
                                 + "nomes " + (nome.Masculino ? "Masc." : "Fem."));
                    }
                }
            }

            _uow.Save();

            return erros;
        }

        private bool VerificaMudancaDeGenero(NomeLista nome, NomeLista nomeAux, Lista lista, string usuarioId, List<string> erros,
                                             int qtdM, int qtdF, Distribuicao dist)
        {
            //verifica se é o mesmo nome mas mudou o gênero
            if ( (nomeAux.Masculino && !nome.Masculino) || (!nomeAux.Masculino && nome.Masculino))
            {
                //deve mudar o nome para o gênero escolhido
                //se a presença já foi confirmada não pode ser alterado
                if (nomeAux.PresencaConf)
                {
                    erros.Add("As informações do Convidado " + nomeAux.Nome + " não foram alteradas pois sua presença já foi confirmada");
                    return true;
                }

                //deleta nome antigo
                _uow.NomeListaRepository.Delete(nomeAux);


                //se o gênero for mudado para Masculino
                if (lista.ListaM && nome.Masculino)
                {                    
                    qtdF--;

                    if (dist.qtdNomesM > qtdM)
                    {
                        //adiciona nome com gênero alterado 
                        qtdM++;
                        PreencheNome(nome, lista, usuarioId);
                        _uow.NomeListaRepository.Insert(nome);
                    }
                    else
                    {
                        erros.Add("O nome " + nome.Nome + " não foi adicionado pois excede o número de convidados Masc. distribuidos para seu usuário");
                    }
                }
                else if(lista.ListaF && !nome.Masculino)
                {                    
                    qtdM--;

                    if (dist.qtdNomesF > qtdF)
                    {
                        //adiciona nome com gênero alterado 
                        qtdF++;
                        PreencheNome(nome, lista, usuarioId);
                        _uow.NomeListaRepository.Insert(nome);
                    }
                    else
                    {
                        erros.Add("O nome " + nome.Nome + " não foi adicionado pois excede o número de convidados Fem. distribuidos para seu usuário");
                    }
                }
                else
                {
                    erros.Add("O Nome " + nome.Nome + " não foi adicionado pois nessa lista não são permitidos "
                                 + "nomes " + (nome.Masculino ? "Masc." : "Fem."));
                }

                return true;
            }

            return false;
        } 

        public List<NomeLista> GetNomesPromoter(int listaId, string usuarioId)
        {
            List<NomeLista> nomes = _uow.NomeListaRepository.GetNomesPromoter(listaId, usuarioId);

            return nomes;
        }

        private void PreencheNome(NomeLista nome, Lista lista, string usuarioId)
        {
            nome.ListaId = lista.Id;
            nome.PrecoEntrada = nome.Masculino ? lista.PrecoM : lista.PrecoF;
            nome.valorConsuma = nome.Masculino ? lista.ValorConsumaM : lista.ValorConsumaF;
            nome.UsuarioId = usuarioId;
            nome.PresencaConf = false;
        }

        public async Task<List<NomeLista>> GetNomesLista(int listaId, int casaId, string usuarioId)
        {
            Lista lista = _uow.ListaRepository.GetLista(listaId, casaId);

            if (lista == null)
            {
                throw new RegraException("Tentando consultar nomes de lista que não pertence a Casa." +
                    "casaId:" + casaId + " usuarioId:" + usuarioId + " listaId:" + listaId);
            }

            return await _uow.NomeListaRepository.GetNomesLista(listaId);
        }

        public void ConfirmaPresenca(int nomeId, int listaId, int casaId, string usuarioId)
        {
            Lista lista = _uow.ListaRepository.GetLista(listaId, casaId);

            if (lista == null)
            {
                throw new RegraException("Tentando confirmar presença de nome de lista que não pertence a Casa." +
                    "casaId:" + casaId + " usuarioId:" + usuarioId + " listaId:" + listaId + " nomeId:" + nomeId);
            }

            NomeLista nome = _uow.NomeListaRepository.GetNome(listaId, nomeId);

            if (nome == null)
            {
                throw new RegraException("Tentando confirmar presença de nome que não pertence a lista" +
                    "casaId:" + casaId + " usuarioId:" + usuarioId + " listaId:" + listaId + " nomeId:" + nomeId);
            }

            nome.PresencaConf = true;
            _uow.NomeListaRepository.Update(nome);
            _uow.Save();            
        }

        public async Task<List<NomeListaGeral>> GetNomesEvento(int eventoId, int casaId, string usuarioId)
        {
            Evento evento = _uow.EventoRepository.GetEventoInclListas(eventoId, casaId);

            if (evento == null)
            {
                throw new RegraException("Tentando consultar nomes de evento que não pertence a Casa." +
                    "casaId:" + casaId + " usuarioId:" + usuarioId + " eventoId:" + eventoId);
            }

            List<NomeListaGeral> nomes = new List<NomeListaGeral>();

            foreach (var lista in evento.Listas)
            {
                foreach (var nome in await _uow.NomeListaRepository.GetNomesInclLista(lista.Id))
                {
                    NomeListaGeral nm = new NomeListaGeral
                    {
                        Nome = nome.Nome,
                        Masculino = nome.Masculino,
                        Genero = nome.Masculino ? "Masculino" : "Feminino",
                        NomeLista = nome.Lista.NomeLista,
                        numCelular = nome.numCelular,
                        numRg = nome.numRg,
                        PrecoEntrada = nome.PrecoEntrada,
                        PresencaConf = nome.PresencaConf,                        
                        valorConsuma = nome.valorConsuma,
                        ListaId = nome.ListaId,
                        Id = nome.Id
                    };

                    if (nome.Promoter != null)
                    {
                        nm.Promoter = nome.Promoter.Nome;
                    }

                    nomes.Add(nm);
                }                
            }

            return nomes.OrderBy(p => p.dtaAdicionado).ToList();
        }
    }
}
