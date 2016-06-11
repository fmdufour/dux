using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Dux.Infrastructure;

namespace Dux.Web.Migrations
{
    [DbContext(typeof(DuxContext))]
    partial class DuxContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rc2-20901")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Dux.Domain.Acessos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Descricao");

                    b.Property<string>("TipoClaim");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.ToTable("Acessos");
                });

            modelBuilder.Entity("Dux.Domain.Agendamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Executado");

                    b.Property<bool>("FecharListaF");

                    b.Property<bool>("FecharListaM");

                    b.Property<DateTime>("HoraAcao");

                    b.Property<int>("ListaId");

                    b.Property<float>("NovoValorF");

                    b.Property<float>("NovoValorM");

                    b.Property<int>("TipoAgendamento");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.Property<bool>("trocarValorF");

                    b.Property<bool>("trocarValorM");

                    b.HasKey("Id");

                    b.HasIndex("ListaId");

                    b.ToTable("Agendamento");
                });

            modelBuilder.Entity("Dux.Domain.Casa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AcessoBloqueado");

                    b.Property<int>("GrupoId");

                    b.Property<string>("NomeCasa");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.HasIndex("GrupoId");

                    b.ToTable("Casa");
                });

            modelBuilder.Entity("Dux.Domain.Client", b =>
                {
                    b.Property<string>("Id");

                    b.Property<bool>("Active");

                    b.Property<string>("AllowedOrigin")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 100);

                    b.Property<int>("RefreshTokenLifeTime");

                    b.Property<string>("Secret")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Client");
                });

            modelBuilder.Entity("Dux.Domain.Distribuicao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ListaId");

                    b.Property<string>("UsuarioId");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.Property<int>("qtdNomesF");

                    b.Property<int>("qtdNomesM");

                    b.HasKey("Id");

                    b.HasIndex("ListaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Distribuicao");
                });

            modelBuilder.Entity("Dux.Domain.Evento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CasaId");

                    b.Property<string>("CorCalendario");

                    b.Property<DateTime>("DtaInicio");

                    b.Property<string>("NomeEvento");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.HasIndex("CasaId");

                    b.ToTable("Evento");
                });

            modelBuilder.Entity("Dux.Domain.Grupo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("NomeGrupo");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.ToTable("Grupo");
                });

            modelBuilder.Entity("Dux.Domain.LayoutAgendamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("DepoisEvento");

                    b.Property<bool>("FecharListaF");

                    b.Property<bool>("FecharListaM");

                    b.Property<int>("LayoutListaId");

                    b.Property<float>("NovoValorF");

                    b.Property<float>("NovoValorM");

                    b.Property<int>("TipoAgendamento");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.Property<int>("qtdHoras");

                    b.Property<int>("qtdMinutos");

                    b.Property<bool>("trocarValorF");

                    b.Property<bool>("trocarValorM");

                    b.HasKey("Id");

                    b.HasIndex("LayoutListaId");

                    b.ToTable("LayoutAgendamento");
                });

            modelBuilder.Entity("Dux.Domain.LayoutDistribuicao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("PerfilDistribuicaoId");

                    b.Property<string>("UsuarioId");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.Property<int>("qtdNomesF");

                    b.Property<int>("qtdNomesM");

                    b.HasKey("Id");

                    b.HasIndex("PerfilDistribuicaoId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("LayoutDistribuicao");
                });

            modelBuilder.Entity("Dux.Domain.LayoutLista", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AgendarTarefas");

                    b.Property<bool>("ExigirCelular");

                    b.Property<bool>("ExigirRg");

                    b.Property<bool>("ListaF");

                    b.Property<bool>("ListaM");

                    b.Property<string>("NomeLista");

                    b.Property<int?>("PerfilDistribuicaoId");

                    b.Property<int>("PerfilListaId");

                    b.Property<decimal>("PrecoF");

                    b.Property<decimal>("PrecoM");

                    b.Property<decimal>("ValorConsumaF");

                    b.Property<decimal>("ValorConsumaM");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.HasIndex("PerfilDistribuicaoId");

                    b.HasIndex("PerfilListaId");

                    b.ToTable("LayoutLista");
                });

            modelBuilder.Entity("Dux.Domain.Lista", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AgendarTarefas");

                    b.Property<int>("EventoId");

                    b.Property<bool>("ExigirCelular");

                    b.Property<bool>("ExigirRg");

                    b.Property<bool>("FechadaF");

                    b.Property<bool>("FechadaM");

                    b.Property<bool>("ListaF");

                    b.Property<bool>("ListaM");

                    b.Property<string>("NomeLista");

                    b.Property<decimal>("PrecoF");

                    b.Property<decimal>("PrecoM");

                    b.Property<decimal>("ValorConsumaF");

                    b.Property<decimal>("ValorConsumaM");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.HasIndex("EventoId");

                    b.ToTable("Lista");
                });

            modelBuilder.Entity("Dux.Domain.NomeLista", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ListaId");

                    b.Property<bool>("Masculino");

                    b.Property<string>("Nome");

                    b.Property<decimal>("PrecoEntrada");

                    b.Property<bool>("PresencaConf");

                    b.Property<string>("UsuarioId");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.Property<string>("numCelular");

                    b.Property<string>("numRg");

                    b.Property<decimal>("valorConsuma");

                    b.HasKey("Id");

                    b.HasIndex("ListaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("NomeLista");
                });

            modelBuilder.Entity("Dux.Domain.PerfilDistribuicao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CasaId");

                    b.Property<string>("NomePerfil");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.HasIndex("CasaId");

                    b.ToTable("PerfilDistribuicao");
                });

            modelBuilder.Entity("Dux.Domain.PerfilLista", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CasaId");

                    b.Property<string>("NomePerfil");

                    b.Property<string>("Observacoes");

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.HasIndex("CasaId");

                    b.ToTable("PerfilLista");
                });

            modelBuilder.Entity("Dux.Domain.RefreshToken", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<DateTime>("ExpiresUtc");

                    b.Property<DateTime>("IssuedUtc");

                    b.Property<string>("ProtectedTicket")
                        .IsRequired();

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.HasKey("Id");

                    b.ToTable("RefreshToken");
                });

            modelBuilder.Entity("Dux.Domain.Usuario", b =>
                {
                    b.Property<string>("Id")
                        .HasAnnotation("SqlServer:ColumnName", "UsuarioId");

                    b.Property<int>("AccessFailedCount");

                    b.Property<bool>("Comissario");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<int?>("GrupoId");

                    b.Property<string>("ImgPerfil");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("Nome");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("PromoterId");

                    b.Property<string>("SecurityStamp");

                    b.Property<string>("Sobrenome");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<DateTime>("UltimoAcesso");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<DateTime>("dtaCriacao");

                    b.Property<DateTime>("dtaEdicao");

                    b.HasKey("Id");

                    b.HasIndex("GrupoId");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .HasName("UserNameIndex");

                    b.HasIndex("PromoterId");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("Dux.Domain.UsuarioCasa", b =>
                {
                    b.Property<int>("CasaId");

                    b.Property<string>("UsuarioId");

                    b.Property<bool>("Bloqueado");

                    b.Property<DateTime?>("DataBloqueio");

                    b.HasKey("CasaId", "UsuarioId");

                    b.HasIndex("CasaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("UsuarioCasa");
                });

            modelBuilder.Entity("Dux.Domain.UsuarioCasaSelec", b =>
                {
                    b.Property<string>("UsuarioId");

                    b.Property<int>("CasaId");

                    b.HasKey("UsuarioId");

                    b.HasIndex("CasaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("UsuarioCasaSelec");
                });

            modelBuilder.Entity("Dux.Domain.UsuarioLista", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EventoId");

                    b.Property<int>("ListaId");

                    b.Property<bool>("TemAcesso");

                    b.Property<string>("UsuarioId");

                    b.HasKey("Id");

                    b.HasIndex("EventoId");

                    b.HasIndex("ListaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("UsuarioLista");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UsuarioClaims");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUserClaim<string>");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("UsuarioLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UsuarioRoles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUserRole<string>");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Dux.Domain.UsuarioClaims", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>");

                    b.Property<int>("CasaId");

                    b.HasIndex("CasaId");

                    b.ToTable("UsuarioClaims");

                    b.HasDiscriminator().HasValue("UsuarioClaims");
                });

            modelBuilder.Entity("Dux.Domain.UsuarioRole", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>");

                    b.Property<int>("CasaId");

                    b.HasIndex("CasaId");

                    b.ToTable("UsuarioRole");

                    b.HasDiscriminator().HasValue("UsuarioRole");
                });

            modelBuilder.Entity("Dux.Domain.Agendamento", b =>
                {
                    b.HasOne("Dux.Domain.Lista")
                        .WithMany()
                        .HasForeignKey("ListaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.Casa", b =>
                {
                    b.HasOne("Dux.Domain.Grupo")
                        .WithMany()
                        .HasForeignKey("GrupoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.Distribuicao", b =>
                {
                    b.HasOne("Dux.Domain.Lista")
                        .WithMany()
                        .HasForeignKey("ListaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId");
                });

            modelBuilder.Entity("Dux.Domain.Evento", b =>
                {
                    b.HasOne("Dux.Domain.Casa")
                        .WithMany()
                        .HasForeignKey("CasaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.LayoutAgendamento", b =>
                {
                    b.HasOne("Dux.Domain.LayoutLista")
                        .WithMany()
                        .HasForeignKey("LayoutListaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.LayoutDistribuicao", b =>
                {
                    b.HasOne("Dux.Domain.PerfilDistribuicao")
                        .WithMany()
                        .HasForeignKey("PerfilDistribuicaoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId");
                });

            modelBuilder.Entity("Dux.Domain.LayoutLista", b =>
                {
                    b.HasOne("Dux.Domain.PerfilDistribuicao")
                        .WithMany()
                        .HasForeignKey("PerfilDistribuicaoId");

                    b.HasOne("Dux.Domain.PerfilLista")
                        .WithMany()
                        .HasForeignKey("PerfilListaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.Lista", b =>
                {
                    b.HasOne("Dux.Domain.Evento")
                        .WithMany()
                        .HasForeignKey("EventoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.NomeLista", b =>
                {
                    b.HasOne("Dux.Domain.Lista")
                        .WithMany()
                        .HasForeignKey("ListaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId");
                });

            modelBuilder.Entity("Dux.Domain.PerfilDistribuicao", b =>
                {
                    b.HasOne("Dux.Domain.Casa")
                        .WithMany()
                        .HasForeignKey("CasaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.PerfilLista", b =>
                {
                    b.HasOne("Dux.Domain.Casa")
                        .WithMany()
                        .HasForeignKey("CasaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.Usuario", b =>
                {
                    b.HasOne("Dux.Domain.Grupo")
                        .WithMany()
                        .HasForeignKey("GrupoId");

                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("PromoterId");
                });

            modelBuilder.Entity("Dux.Domain.UsuarioCasa", b =>
                {
                    b.HasOne("Dux.Domain.Casa")
                        .WithMany()
                        .HasForeignKey("CasaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.UsuarioCasaSelec", b =>
                {
                    b.HasOne("Dux.Domain.Casa")
                        .WithMany()
                        .HasForeignKey("CasaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.UsuarioLista", b =>
                {
                    b.HasOne("Dux.Domain.Evento")
                        .WithMany()
                        .HasForeignKey("EventoId");

                    b.HasOne("Dux.Domain.Lista")
                        .WithMany()
                        .HasForeignKey("ListaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Dux.Domain.Usuario")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.UsuarioClaims", b =>
                {
                    b.HasOne("Dux.Domain.Casa")
                        .WithMany()
                        .HasForeignKey("CasaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Dux.Domain.UsuarioRole", b =>
                {
                    b.HasOne("Dux.Domain.Casa")
                        .WithMany()
                        .HasForeignKey("CasaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
