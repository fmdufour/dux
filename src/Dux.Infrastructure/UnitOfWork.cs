using System;
using Dux.Domain;
using Dux.Domain.Interfaces;
using Dux.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Dux.Infrastructure
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        #region Private member variables

        private DuxContext _context;

        private IUsuarioCasaSelecRepository _usuarioCasaSelecRepository;

        private UsuarioManager _usuarioManager;

        private RoleManager<IdentityRole> _roleManager;

        private IRefreshTokenRepository _refreshTokenRepository;

        private IPerfilListaRepository _perfilListaRepository;

        private IPerfilDistribuicaoRepository _perfilDistribuicaoRepository;

        private ILayoutListaRepository _layoutListaRepository;

        private ILayoutDistribuicaoRepository _layoutDistribuicaoRepository;

        private ILayoutAgendamentoRepository _layoutAgendamentoRepository;

        private IGrupoRepository _grupoRepository;

        private IEventoRepository _eventoRepository;

        private IDistribuicaoRepository _distribuicaoRepository;

        private IClientRepository _clientRepository;

        private ICasaRepository _casaRepository;

        private IListaRepository _listaRepository;

        private IAgendamentoRepository _agendamentoRepository;

        private IUsuarioListaRepository _usuarioListaRepository;

        private INomeListaRepository _nomeListaRepository;


        #endregion

        public UnitOfWork(DuxContext ctx, UsuarioManager usuarioManager, RoleManager<IdentityRole> roleManager, ILogger<UnitOfWork> logger)
        {
            _context = ctx;
            _usuarioManager = usuarioManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        #region Public Repository Creation properties...

        public INomeListaRepository NomeListaRepository
        {
            get
            {
                if (this._nomeListaRepository == null)
                    this._nomeListaRepository = new NomeListaRepository(_context);
                return _nomeListaRepository;
            }
        }

        public IUsuarioListaRepository UsuarioListaRepository
        {
            get
            {
                if (this._usuarioListaRepository == null)
                    this._usuarioListaRepository = new UsuarioListaRepository(_context);
                return _usuarioListaRepository;
            }
        }

        public UsuarioManager UsuarioManager
        {
            get
            {
                return _usuarioManager;
            }
        }

        public RoleManager<IdentityRole> RoleManager
        {
            get
            {
                return _roleManager;
            }
        }

        public IListaRepository ListaRepository
        {
            get
            {
                if (this._listaRepository == null)
                    this._listaRepository = new ListaRepository(_context);
                return _listaRepository;
            }
        }

        public IAgendamentoRepository AgendamentoRepository
        {
            get
            {
                if (this._agendamentoRepository == null)
                    this._agendamentoRepository = new AgendamentoRepository(_context);
                return _agendamentoRepository;
            }
        }

        public IRefreshTokenRepository RefreshTokenRepository
        {
            get
            {
                if (this._refreshTokenRepository == null)
                    this._refreshTokenRepository = new RefreshTokenRepository(_context);
                return _refreshTokenRepository;
            }
        }

        public IPerfilListaRepository PerfilListaRepository
        {
            get
            {
                if (this._perfilListaRepository == null)
                    this._perfilListaRepository = new PerfilListaRepository(_context);
                return _perfilListaRepository;
            }
        }

        public IPerfilDistribuicaoRepository PerfilDistribuicaoRepository
        {
            get
            {
                if (this._perfilDistribuicaoRepository == null)
                    this._perfilDistribuicaoRepository = new PerfilDistribuicaoRepository(_context);
                return _perfilDistribuicaoRepository;
            }
        }

        public ILayoutListaRepository LayoutListaRepository
        {
            get
            {
                if (this._layoutListaRepository == null)
                    this._layoutListaRepository = new LayoutListaRepository(_context);
                return _layoutListaRepository;
            }
        }

        public ILayoutDistribuicaoRepository LayoutDistribuicaoRepository
        {
            get
            {
                if (this._layoutDistribuicaoRepository == null)
                    this._layoutDistribuicaoRepository = new LayoutDistribuicaoRepository(_context);
                return _layoutDistribuicaoRepository;
            }
        }

        public ILayoutAgendamentoRepository LayoutAgendamentoRepository
        {
            get
            {
                if (this._layoutAgendamentoRepository == null)
                    this._layoutAgendamentoRepository = new LayoutAgendamentoRepository(_context);
                return _layoutAgendamentoRepository;
            }
        }

        public IGrupoRepository GrupoRepository
        {
            get
            {
                if (this._grupoRepository == null)
                    this._grupoRepository = new GrupoRepository(_context);
                return _grupoRepository;
            }
        }

        public IEventoRepository EventoRepository
        {
            get
            {
                if (this._eventoRepository == null)
                    this._eventoRepository = new EventoRepository(_context);
                return _eventoRepository;
            }
        }

        public IDistribuicaoRepository DistribuicaoRepository
        {
            get
            {
                if (this._distribuicaoRepository == null)
                    this._distribuicaoRepository = new DistribuicaoRepository(_context);
                return _distribuicaoRepository;
            }
        }

        public IClientRepository ClientRepository
        {
            get
            {
                if (this._clientRepository == null)
                    this._clientRepository = new ClientRepository(_context);
                return _clientRepository;
            }
        }

        public ICasaRepository CasaRepository
        {
            get
            {
                if (this._casaRepository == null)
                    this._casaRepository = new CasaRepository(_context);
                return _casaRepository;
            }
        }

        public IUsuarioCasaSelecRepository UsuarioCasaSelecRepository
        {
            get
            {
                if (this._usuarioCasaSelecRepository == null)
                    this._usuarioCasaSelecRepository = new UsuarioCasaSelecRepository(_context);
                return _usuarioCasaSelecRepository;
            }
        }


        #endregion


        public int Save()
        {
            try
            {
                return _context.SaveChanges();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message + "\n" + e.StackTrace);
                throw e;
            }
        }


        private bool disposed = false;
        private readonly ILogger<UnitOfWork> _logger;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {                    
                    _context.Dispose();                    
                }
            }
            this.disposed = true;
        }


        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
