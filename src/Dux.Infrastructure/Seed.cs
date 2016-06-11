using System;
using System.Linq;
using Dux.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;

namespace Dux.Infrastructure
{
    public class Seed
    {
        private DuxContext _ctx;
        private UsuarioManager _usr;
        
        private RoleManager<IdentityRole> _role;

        public Seed(DuxContext ctx, UsuarioManager usr, RoleManager<IdentityRole> role)
        {
            _ctx = ctx;
            _usr = usr;
            _role = role;
        }

        public async void EnsureSeedData()
        {
            Usuario teste;
            Grupo grupoWoods;
            Casa woods;
            Casa ws;



            #region adiciona Client
            if (!_ctx.Clients.Any())
            {
                _ctx.Clients.Add(new Client
                {
                    Id = "dux",
                    Active = true,
                    Name = "Ducsa",
                    RefreshTokenLifeTime = 3600,
                    Secret = "dwajioda"
                });

            }
            #endregion


            #region adiciona Grupo
            if (!_ctx.Grupos.Any())
            {
                grupoWoods = new Grupo
                {
                    NomeGrupo = "Grupo Woods"
                };

                _ctx.Grupos.Add(grupoWoods);

                _ctx.SaveChanges();
            }
            #endregion

            #region adiciona Casa
            if (!_ctx.Casas.Any())
            {
                grupoWoods = _ctx.Grupos.First();

                ws = new Casa
                {
                    NomeCasa = "Woods Samba",
                    GrupoId = grupoWoods.Id
                };

                woods = new Casa
                {
                    NomeCasa = "Woods",
                    GrupoId = grupoWoods.Id
                };

                _ctx.Casas.Add(woods);
                _ctx.Casas.Add(ws);

                _ctx.SaveChanges();
            }

            #endregion

            #region adiciona Usuario e UsuarioCasa
            if (!_ctx.Users.Any())
            {

                teste = new Usuario { Nome = "Teste1 da Silva", UserName = "teste", Email = "teste@gmail.com", EmailConfirmed = true };

                Usuario teste2 = new Usuario { Nome = "Teste2 da Silva", UserName = "teste2", Email = "teste2@gmail.com", EmailConfirmed = true };

                Usuario teste3 = new Usuario { Nome = "Teste3 da Silva", UserName = "teste3", Email = "teste3@gmail.com", EmailConfirmed = true };


                await _usr.CreateAsync(teste, "Wtf!99541");
                await _usr.CreateAsync(teste2, "Wtf!99541");
                await _usr.CreateAsync(teste3, "Wtf!99541");

                woods = _ctx.Casas.First(p => p.NomeCasa == "Woods");
                ws = _ctx.Casas.First(p => p.NomeCasa == "Woods Samba");

                UsuarioCasa usuarioCasa = new UsuarioCasa { UsuarioId = teste.Id, CasaId = woods.Id };
                UsuarioCasa usuarioCasa2 = new UsuarioCasa { UsuarioId = teste.Id, CasaId = ws.Id };
                teste.CasasUsuario = new List<UsuarioCasa>();
                teste.CasasUsuario.Add(usuarioCasa);
                teste.CasasUsuario.Add(usuarioCasa2);

                UsuarioCasa uCasa3 = new UsuarioCasa { UsuarioId = teste2.Id, CasaId = woods.Id };
                teste2.CasasUsuario = new List<UsuarioCasa>();
                teste2.CasasUsuario.Add(uCasa3);

                UsuarioCasa uCasa4 = new UsuarioCasa { UsuarioId = teste3.Id, CasaId = woods.Id };
                teste3.CasasUsuario = new List<UsuarioCasa>();
                teste3.CasasUsuario.Add(uCasa4);

                _ctx.SaveChanges();

            }
            #endregion

            #region Adiciona Claim Master no usuario teste
            if (!_ctx.UserClaims.Any())
            {
                teste = await _usr.FindByEmailAsync("teste@gmail.com");
                woods = _ctx.Casas.FirstOrDefault(p => p.NomeCasa == "Woods");

                _ctx.UserClaims.Add(new UsuarioClaims
                {
                    CasaId = woods.Id,
                    ClaimType = "Master",
                    ClaimValue = "1",
                    UserId = teste.Id
                });

                _ctx.SaveChanges();
            }
            #endregion


            #region adiciona Perfil Distribuicao

            if (!_ctx.PerfilDistribuicao.Any())
            {
                woods = _ctx.Casas.FirstOrDefault(p => p.NomeCasa == "Woods");

                Usuario u1 = await _usr.FindByEmailAsync("teste@gmail.com");
                Usuario u2 = await _usr.FindByEmailAsync("teste2@gmail.com");
                Usuario u3 = await _usr.FindByEmailAsync("teste3@gmail.com");


                PerfilDistribuicao perfilDist = new PerfilDistribuicao
                {
                    NomePerfil = "Perfil Teste",
                    CasaId = woods.Id
                };

                List<LayoutDistribuicao> layDist = new List<LayoutDistribuicao>();
                layDist.Add(new LayoutDistribuicao
                {
                    qtdNomesF = 10,
                    qtdNomesM = 20,
                    UsuarioId = u1.Id
                });
                layDist.Add(new LayoutDistribuicao
                {
                    qtdNomesF = 1010,
                    qtdNomesM = 2020,
                    UsuarioId = u2.Id
                });
                layDist.Add(new LayoutDistribuicao
                {
                    qtdNomesF = 15,
                    qtdNomesM = 30,
                    UsuarioId = u3.Id
                });

                perfilDist.LayoutsDistribuicao = layDist;

                _ctx.PerfilDistribuicao.Add(perfilDist);

                _ctx.SaveChanges();
            }

            #endregion


            #region Acessos
            if (!_ctx.Acessos.Any())
            {
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "PerLis",
                    Descricao = "Perfil de Listas"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "PerDis",
                    Descricao = "Perfil de Distribuicao de Convidados"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "PerCas",
                    Descricao = "Perfil de Mapa da Casa"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "Evento",
                    Descricao = "Eventos"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "Lista",
                    Descricao = "Listas"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "Reserv",
                    Descricao = "Reservas"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "AgTar",
                    Descricao = "Agendar Tarefas para as Listas"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "Distr",
                    Descricao = "Distribuicao de Convidados"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "AddNm",
                    Descricao = "Adicionar nomes na Lista"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "RemNm",
                    Descricao = "Remover qualquer nome das Listas"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "VerList",
                    Descricao = "Visualizar Lista completa do Evento"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "ConfPres",
                    Descricao = "Confirmar presenca de Convidados"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "AceUsu",
                    Descricao = "Definir Acessos dos Usuários"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "AddUsu",
                    Descricao = "Adicionar Usuarios"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "BloqUsu",
                    Descricao = "Bloquear Usuarios"
                });
                _ctx.Acessos.Add(new Acessos
                {
                    TipoClaim = "PodeComis",
                    Descricao = "Pode adicionar Comissarios"
                });

                //_ctx.SaveChanges();
            }
            #endregion
        }
    }
}

