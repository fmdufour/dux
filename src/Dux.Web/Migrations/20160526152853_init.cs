using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Dux.Web.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Acessos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(nullable: true),
                    TipoClaim = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Acessos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    AllowedOrigin = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: false),
                    RefreshTokenLifeTime = table.Column<int>(nullable: false),
                    Secret = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Grupo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NomeGrupo = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grupo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RefreshToken",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ClientId = table.Column<string>(nullable: false),
                    ExpiresUtc = table.Column<DateTime>(nullable: false),
                    IssuedUtc = table.Column<DateTime>(nullable: false),
                    ProtectedTicket = table.Column<string>(nullable: false),
                    Subject = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshToken", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    NormalizedName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                });

            migrationBuilder.CreateTable(
                name: "Casa",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AcessoBloqueado = table.Column<bool>(nullable: false),
                    GrupoId = table.Column<int>(nullable: false),
                    NomeCasa = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Casa", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Casa_Grupo_GrupoId",
                        column: x => x.GrupoId,
                        principalTable: "Grupo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    UsuarioId = table.Column<string>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    Comissario = table.Column<bool>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    GrupoId = table.Column<int>(nullable: true),
                    ImgPerfil = table.Column<string>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    Nome = table.Column<string>(nullable: true),
                    NormalizedEmail = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    PromoterId = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    Sobrenome = table.Column<string>(nullable: true),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    UltimoAcesso = table.Column<DateTime>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.UsuarioId);
                    table.ForeignKey(
                        name: "FK_Usuarios_Grupo_GrupoId",
                        column: x => x.GrupoId,
                        principalTable: "Grupo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Usuarios_Usuarios_PromoterId",
                        column: x => x.PromoterId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaims_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Evento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CasaId = table.Column<int>(nullable: false),
                    CorCalendario = table.Column<string>(nullable: true),
                    DtaInicio = table.Column<DateTime>(nullable: false),
                    NomeEvento = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Evento_Casa_CasaId",
                        column: x => x.CasaId,
                        principalTable: "Casa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerfilDistribuicao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CasaId = table.Column<int>(nullable: false),
                    NomePerfil = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerfilDistribuicao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerfilDistribuicao_Casa_CasaId",
                        column: x => x.CasaId,
                        principalTable: "Casa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerfilLista",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CasaId = table.Column<int>(nullable: false),
                    NomePerfil = table.Column<string>(nullable: true),
                    Observacoes = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerfilLista", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerfilLista_Casa_CasaId",
                        column: x => x.CasaId,
                        principalTable: "Casa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsuarioCasa",
                columns: table => new
                {
                    CasaId = table.Column<int>(nullable: false),
                    UsuarioId = table.Column<string>(nullable: false),
                    Bloqueado = table.Column<bool>(nullable: false),
                    DataBloqueio = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioCasa", x => new { x.CasaId, x.UsuarioId });
                    table.ForeignKey(
                        name: "FK_UsuarioCasa_Casa_CasaId",
                        column: x => x.CasaId,
                        principalTable: "Casa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsuarioCasa_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsuarioCasaSelec",
                columns: table => new
                {
                    UsuarioId = table.Column<string>(nullable: false),
                    CasaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioCasaSelec", x => x.UsuarioId);
                    table.ForeignKey(
                        name: "FK_UsuarioCasaSelec_Casa_CasaId",
                        column: x => x.CasaId,
                        principalTable: "Casa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsuarioCasaSelec_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsuarioClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    CasaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsuarioClaims_Casa_CasaId",
                        column: x => x.CasaId,
                        principalTable: "Casa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsuarioClaims_Usuarios_UserId",
                        column: x => x.UserId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsuarioLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UsuarioLogins_Usuarios_UserId",
                        column: x => x.UserId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsuarioRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    CasaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UsuarioRoles_Casa_CasaId",
                        column: x => x.CasaId,
                        principalTable: "Casa",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsuarioRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsuarioRoles_Usuarios_UserId",
                        column: x => x.UserId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lista",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AgendarTarefas = table.Column<bool>(nullable: false),
                    EventoId = table.Column<int>(nullable: false),
                    ExigirCelular = table.Column<bool>(nullable: false),
                    ExigirRg = table.Column<bool>(nullable: false),
                    FechadaF = table.Column<bool>(nullable: false),
                    FechadaM = table.Column<bool>(nullable: false),
                    ListaF = table.Column<bool>(nullable: false),
                    ListaM = table.Column<bool>(nullable: false),
                    NomeLista = table.Column<string>(nullable: true),
                    PrecoF = table.Column<decimal>(nullable: false),
                    PrecoM = table.Column<decimal>(nullable: false),
                    ValorConsumaF = table.Column<decimal>(nullable: false),
                    ValorConsumaM = table.Column<decimal>(nullable: false),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lista", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lista_Evento_EventoId",
                        column: x => x.EventoId,
                        principalTable: "Evento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LayoutDistribuicao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PerfilDistribuicaoId = table.Column<int>(nullable: false),
                    UsuarioId = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false),
                    qtdNomesF = table.Column<int>(nullable: false),
                    qtdNomesM = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LayoutDistribuicao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LayoutDistribuicao_PerfilDistribuicao_PerfilDistribuicaoId",
                        column: x => x.PerfilDistribuicaoId,
                        principalTable: "PerfilDistribuicao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LayoutDistribuicao_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LayoutLista",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AgendarTarefas = table.Column<bool>(nullable: false),
                    ExigirCelular = table.Column<bool>(nullable: false),
                    ExigirRg = table.Column<bool>(nullable: false),
                    ListaF = table.Column<bool>(nullable: false),
                    ListaM = table.Column<bool>(nullable: false),
                    NomeLista = table.Column<string>(nullable: true),
                    PerfilDistribuicaoId = table.Column<int>(nullable: true),
                    PerfilListaId = table.Column<int>(nullable: false),
                    PrecoF = table.Column<decimal>(nullable: false),
                    PrecoM = table.Column<decimal>(nullable: false),
                    ValorConsumaF = table.Column<decimal>(nullable: false),
                    ValorConsumaM = table.Column<decimal>(nullable: false),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LayoutLista", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LayoutLista_PerfilDistribuicao_PerfilDistribuicaoId",
                        column: x => x.PerfilDistribuicaoId,
                        principalTable: "PerfilDistribuicao",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LayoutLista_PerfilLista_PerfilListaId",
                        column: x => x.PerfilListaId,
                        principalTable: "PerfilLista",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Agendamento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Executado = table.Column<bool>(nullable: false),
                    FecharListaF = table.Column<bool>(nullable: false),
                    FecharListaM = table.Column<bool>(nullable: false),
                    HoraAcao = table.Column<DateTime>(nullable: false),
                    ListaId = table.Column<int>(nullable: false),
                    NovoValorF = table.Column<float>(nullable: false),
                    NovoValorM = table.Column<float>(nullable: false),
                    TipoAgendamento = table.Column<int>(nullable: false),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false),
                    trocarValorF = table.Column<bool>(nullable: false),
                    trocarValorM = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agendamento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Agendamento_Lista_ListaId",
                        column: x => x.ListaId,
                        principalTable: "Lista",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Distribuicao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ListaId = table.Column<int>(nullable: false),
                    UsuarioId = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false),
                    qtdNomesF = table.Column<int>(nullable: false),
                    qtdNomesM = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Distribuicao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Distribuicao_Lista_ListaId",
                        column: x => x.ListaId,
                        principalTable: "Lista",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Distribuicao_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NomeLista",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ListaId = table.Column<int>(nullable: false),
                    Masculino = table.Column<bool>(nullable: false),
                    Nome = table.Column<string>(nullable: true),
                    PrecoEntrada = table.Column<decimal>(nullable: false),
                    PresencaConf = table.Column<bool>(nullable: false),
                    UsuarioId = table.Column<string>(nullable: true),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false),
                    numCelular = table.Column<string>(nullable: true),
                    numRg = table.Column<string>(nullable: true),
                    valorConsuma = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NomeLista", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NomeLista_Lista_ListaId",
                        column: x => x.ListaId,
                        principalTable: "Lista",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NomeLista_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UsuarioLista",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EventoId = table.Column<int>(nullable: true),
                    ListaId = table.Column<int>(nullable: false),
                    TemAcesso = table.Column<bool>(nullable: false),
                    UsuarioId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsuarioLista", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsuarioLista_Evento_EventoId",
                        column: x => x.EventoId,
                        principalTable: "Evento",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UsuarioLista_Lista_ListaId",
                        column: x => x.ListaId,
                        principalTable: "Lista",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsuarioLista_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LayoutAgendamento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DepoisEvento = table.Column<bool>(nullable: false),
                    FecharListaF = table.Column<bool>(nullable: false),
                    FecharListaM = table.Column<bool>(nullable: false),
                    LayoutListaId = table.Column<int>(nullable: false),
                    NovoValorF = table.Column<float>(nullable: false),
                    NovoValorM = table.Column<float>(nullable: false),
                    TipoAgendamento = table.Column<int>(nullable: false),
                    dtaCriacao = table.Column<DateTime>(nullable: false),
                    dtaEdicao = table.Column<DateTime>(nullable: false),
                    qtdHoras = table.Column<int>(nullable: false),
                    qtdMinutos = table.Column<int>(nullable: false),
                    trocarValorF = table.Column<bool>(nullable: false),
                    trocarValorM = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LayoutAgendamento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LayoutAgendamento_LayoutLista_LayoutListaId",
                        column: x => x.LayoutListaId,
                        principalTable: "LayoutLista",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Agendamento_ListaId",
                table: "Agendamento",
                column: "ListaId");

            migrationBuilder.CreateIndex(
                name: "IX_Casa_GrupoId",
                table: "Casa",
                column: "GrupoId");

            migrationBuilder.CreateIndex(
                name: "IX_Distribuicao_ListaId",
                table: "Distribuicao",
                column: "ListaId");

            migrationBuilder.CreateIndex(
                name: "IX_Distribuicao_UsuarioId",
                table: "Distribuicao",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Evento_CasaId",
                table: "Evento",
                column: "CasaId");

            migrationBuilder.CreateIndex(
                name: "IX_LayoutAgendamento_LayoutListaId",
                table: "LayoutAgendamento",
                column: "LayoutListaId");

            migrationBuilder.CreateIndex(
                name: "IX_LayoutDistribuicao_PerfilDistribuicaoId",
                table: "LayoutDistribuicao",
                column: "PerfilDistribuicaoId");

            migrationBuilder.CreateIndex(
                name: "IX_LayoutDistribuicao_UsuarioId",
                table: "LayoutDistribuicao",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_LayoutLista_PerfilDistribuicaoId",
                table: "LayoutLista",
                column: "PerfilDistribuicaoId");

            migrationBuilder.CreateIndex(
                name: "IX_LayoutLista_PerfilListaId",
                table: "LayoutLista",
                column: "PerfilListaId");

            migrationBuilder.CreateIndex(
                name: "IX_Lista_EventoId",
                table: "Lista",
                column: "EventoId");

            migrationBuilder.CreateIndex(
                name: "IX_NomeLista_ListaId",
                table: "NomeLista",
                column: "ListaId");

            migrationBuilder.CreateIndex(
                name: "IX_NomeLista_UsuarioId",
                table: "NomeLista",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_PerfilDistribuicao_CasaId",
                table: "PerfilDistribuicao",
                column: "CasaId");

            migrationBuilder.CreateIndex(
                name: "IX_PerfilLista_CasaId",
                table: "PerfilLista",
                column: "CasaId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_GrupoId",
                table: "Usuarios",
                column: "GrupoId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Usuarios",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Usuarios",
                column: "NormalizedUserName");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_PromoterId",
                table: "Usuarios",
                column: "PromoterId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioCasa_CasaId",
                table: "UsuarioCasa",
                column: "CasaId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioCasa_UsuarioId",
                table: "UsuarioCasa",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioCasaSelec_CasaId",
                table: "UsuarioCasaSelec",
                column: "CasaId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioCasaSelec_UsuarioId",
                table: "UsuarioCasaSelec",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioLista_EventoId",
                table: "UsuarioLista",
                column: "EventoId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioLista_ListaId",
                table: "UsuarioLista",
                column: "ListaId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioLista_UsuarioId",
                table: "UsuarioLista",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName");

            migrationBuilder.CreateIndex(
                name: "IX_RoleClaims_RoleId",
                table: "RoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioClaims_UserId",
                table: "UsuarioClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioClaims_CasaId",
                table: "UsuarioClaims",
                column: "CasaId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioLogins_UserId",
                table: "UsuarioLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioRoles_RoleId",
                table: "UsuarioRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioRoles_UserId",
                table: "UsuarioRoles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioRoles_CasaId",
                table: "UsuarioRoles",
                column: "CasaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Acessos");

            migrationBuilder.DropTable(
                name: "Agendamento");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Distribuicao");

            migrationBuilder.DropTable(
                name: "LayoutAgendamento");

            migrationBuilder.DropTable(
                name: "LayoutDistribuicao");

            migrationBuilder.DropTable(
                name: "NomeLista");

            migrationBuilder.DropTable(
                name: "RefreshToken");

            migrationBuilder.DropTable(
                name: "UsuarioCasa");

            migrationBuilder.DropTable(
                name: "UsuarioCasaSelec");

            migrationBuilder.DropTable(
                name: "UsuarioLista");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "UsuarioClaims");

            migrationBuilder.DropTable(
                name: "UsuarioLogins");

            migrationBuilder.DropTable(
                name: "UsuarioRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "LayoutLista");

            migrationBuilder.DropTable(
                name: "Lista");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "PerfilDistribuicao");

            migrationBuilder.DropTable(
                name: "PerfilLista");

            migrationBuilder.DropTable(
                name: "Evento");

            migrationBuilder.DropTable(
                name: "Casa");

            migrationBuilder.DropTable(
                name: "Grupo");
        }
    }
}
