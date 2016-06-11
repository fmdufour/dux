using Dux.Domain;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Dux.Infrastructure
{
    public class DuxContext : IdentityDbContext<Usuario>
    {

        public DuxContext(DbContextOptions<DuxContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Grupo> Grupos { get; set; }
        public DbSet<Casa> Casas { get; set; }        
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lista> Listas { get; set; }        
        public DbSet<Distribuicao> Distribuicoes { get; set; }
        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<Client> Clients { get; set; }        
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<PerfilDistribuicao> PerfilDistribuicao { get; set; }
        public DbSet<PerfilLista> PerfilLista { get; set; }
        public DbSet<LayoutDistribuicao> LayoutDistribuicao { get; set; }
        public DbSet<LayoutLista> LayoutLista { get; set; }
        public DbSet<LayoutAgendamento> LayoutAgendamento { get; set; }     
        new public DbSet<UsuarioRole> UserRoles { get; set; } 
        new public DbSet<UsuarioClaims> UserClaims { get; set; }
        public DbSet<UsuarioCasaSelec> UsuarioCasaSelec { get; set; }
        public DbSet<Acessos> Acessos { get; set; }
        public DbSet<UsuarioLista> UsuarioListas { get; set; }
        public DbSet<NomeLista> NomesLista { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            foreach (var entity in builder.Model.GetEntityTypes())
            {
                entity.Relational().TableName = entity.DisplayName();
            }

            base.OnModelCreating(builder);

            builder.Entity<UsuarioCasa>()
                .HasKey(t => new { t.CasaId, t.UsuarioId });            

            builder.Entity<UsuarioCasa>()
               .HasOne(p=> p.Casa)
               .WithMany(p => p.UsuariosCasa)
               .HasForeignKey(p=> p.CasaId);

            builder.Entity<UsuarioCasa>()
                .HasOne(p=> p.Usuario)
                .WithMany(p=> p.CasasUsuario)
                .HasForeignKey(p=> p.UsuarioId);

            builder.Entity<Usuario>().ToTable("Usuarios");
            builder.Entity<Usuario>().Property(p=> p.Id).ForSqlServerHasColumnName("UsuarioId");

            builder.Entity<IdentityRole>().ToTable("Roles");
            builder.Entity<IdentityUserRole<string>>().ToTable("UsuarioRoles");
            builder.Entity<IdentityUserLogin<string>>().ToTable("UsuarioLogins");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UsuarioClaims");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");

            builder.Entity<UsuarioCasaSelec>()
                .HasKey(t => new { t.UsuarioId});

        }

    }
}
