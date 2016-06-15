using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Dux.Infrastructure;
using Dux.Domain;
using Dux.Domain.Interfaces;
using Dux.Application;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Dux.Web.Providers;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Dux.Web.ViewModels;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;

namespace Dux.Web
{
    public class Startup
    {

        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)                
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
                        
            Configuration = builder.Build();
        }


        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DuxContext>(options =>
                                        //options.UseSqlServer(@"Data Source=(localdb)\v11.0;Initial Catalog=DuxWeb;Integrated Security=True;Connect Timeout=15;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False", 
                                        options.UseSqlServer(@"Data Source=dux.clk44wtj7jgj.sa-east-1.rds.amazonaws.com,1433;Initial Catalog=Dux;User Id=dux;Password=wtf99541;Connect Timeout=15;MultipleActiveResultSets=True", 
                                        b => b.MigrationsAssembly("Dux.Web"))
                            );

            services.AddScoped<DuxUserStore>();
            services.AddScoped<UsuarioManager>();


            services.AddIdentity<Usuario, IdentityRole>(o=>
            {
                o.Password.RequireDigit = true;
                o.Password.RequiredLength = 6;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequireUppercase = false;            
            })
                .AddEntityFrameworkStores<DuxContext>()
                .AddUserStore<DuxUserStore>()
                .AddUserManager<UsuarioManager>()
                .AddDefaultTokenProviders();                

            services.AddMvc().AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver =
                        new CamelCasePropertyNamesContractResolver();
                }); 

            

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IGrupoService, GrupoService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICasaService, CasaService>();
            services.AddScoped<IPerfilDistribuicaoService, PerfilDistribuicaoService>();
            services.AddScoped<IPerfilListaService, PerfilListaService>();
            services.AddScoped<IEventoService, EventoService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IListaService, ListaService>();
            services.AddScoped<IAcessoService, AcessoService>();
            services.AddScoped<IDistribuicaoService, DistribuicaoService>();
            services.AddScoped<INomeListaService, NomeListaService>();
            services.AddTransient<Seed, Seed>();


            services.AddCors(options =>
            {
              options.AddPolicy("AllowAllOrigins", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            services.AddAuthentication(o => o.SignInScheme = JwtBearerDefaults.AuthenticationScheme);

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Listas", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.Listas, NomeClaims.Master }));
                });

                options.AddPolicy("Promoter", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.AddNomesLista, NomeClaims.Master }));
                });

                options.AddPolicy("ListasOuPromoter", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.Listas, NomeClaims.AddNomesLista, NomeClaims.Master }));
                });

                options.AddPolicy("PerfilDist", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.PerfilDist, NomeClaims.Master }));
                });

                options.AddPolicy("PerfilLista", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.PerfilLista, NomeClaims.Master }));
                });

                options.AddPolicy("Eventos", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.Eventos, NomeClaims.Master }));
                });

                options.AddPolicy("AddUsuario", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.AddUsuario, NomeClaims.Master }));
                });

                options.AddPolicy("BloqUsuario", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.BloqUsuario, NomeClaims.Master }));
                });

                options.AddPolicy("AcessoUsuario", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.AcessoUsuario, NomeClaims.Master }));
                });

                options.AddPolicy("Distribuicao", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.Distribuicao, NomeClaims.Master }));
                });

                options.AddPolicy("Promoter", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.AddNomesLista, NomeClaims.Master }));
                });

                options.AddPolicy("VerLista", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.VerListaCompl, NomeClaims.Master }));
                });

                options.AddPolicy("ConfPresenca", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.ConfPresenca, NomeClaims.Master }));
                });


                options.AddPolicy("PodeComiss", policy =>
                {
                    policy.AddRequirements(new UsuarioTemClaim(new[] { NomeClaims.PodeAddComis, NomeClaims.Master }));
                });

            });

            services.AddDistributedMemoryCache();
            services.AddLogging();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app, ILoggerFactory loggerFactory)//, Seed seed)
        {            
            //seed.EnsureSeedData();
            //app.UseDeveloperExceptionPage();
            app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Use(async (context, next) =>
                {
                    var error = context.Features[typeof(IExceptionHandlerFeature)] as IExceptionHandlerFeature;

                    if (error != null && error.Error != null)
                    {
                        context.Response.StatusCode = 500;
                        context.Response.ContentType = "application/json";
                        // TODO: Shouldn't pass the exception message straight out, change this.
                        await context.Response.WriteAsync(
                            JsonConvert.SerializeObject
                            (new { success = false, error = error.Error.Message }));
                    }
                    // We're not trying to handle anything else so just let the default 
                    // handler handle.
                    else await next();
                });
            });
            app.UseRuntimeInfoPage();

            loggerFactory.AddDebug();
            loggerFactory.AddConsole(LogLevel.Information);


            Mapper.Initialize(config =>
            {
                Mapper.CreateMap<CasaVM, Casa>().ReverseMap();                
                Mapper.CreateMap<PerfilDistVM, PerfilDistribuicao>().ReverseMap();
                Mapper.CreateMap<LayoutDistribuicao, LayoutDistribuicaoVM>().ReverseMap();
                Mapper.CreateMap<LayoutAgendamentoVM, LayoutAgendamento>().ReverseMap();
                Mapper.CreateMap<LayoutListaVM, LayoutLista>().ReverseMap();
                Mapper.CreateMap<PerfilListaVM, PerfilLista>().ReverseMap();
                Mapper.CreateMap<EventoVM, Evento>().ReverseMap();
                Mapper.CreateMap<Usuario, UsuarioDistVM>();
                Mapper.CreateMap<UsuarioCriarVM, Usuario>();
                Mapper.CreateMap<Usuario, UsuarioVM>().ReverseMap();
                Mapper.CreateMap<Lista, ListaVM>().ReverseMap();
                Mapper.CreateMap<Distribuicao, LayoutDistribuicaoVM>().ReverseMap();
                Mapper.CreateMap<Distribuicao, DistribuicaoVM>().ReverseMap();
                Mapper.CreateMap<NomeVM, NomeLista>().ReverseMap();
                Mapper.CreateMap<NomeListaVM, NomeLista>().ReverseMap();
            });

            app.UseStaticFiles();

            app.UseCors("AllowAllOrigins");

            // Add a new middleware issuing tokens.
            app.UseOpenIdConnectServer(options =>
            {
                options.AllowInsecureHttp = true;
                options.Provider = new AuthorizationProvider();
                //options.UseJwtTokens();   
                options.AccessTokenLifetime = TimeSpan.FromMinutes(1);             
            });

            // Add a new middleware validating the encrypted
            // access tokens issued by the OIDC server.
            app.UseOAuthValidation();

            app.UseMvc(config =>
            {
                config.MapRoute(
                    name: "Default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "App", action = "Index" }
                    );                                
            });            

            
        }
    }
}
