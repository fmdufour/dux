using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class UsuarioListaRepository : GenericRepository<UsuarioLista>, IUsuarioListaRepository
    {
        private readonly DuxContext _ctx;

        public UsuarioListaRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public List<UsuarioLista> GetListas(string usuarioId, int eventoId)
        {
            return _ctx.UsuarioListas.Where(p =>   p.UsuarioId.Equals(usuarioId)
                                                && p.EventoId.Equals(eventoId))
                                                .ToList();
        }

        public List<UsuarioLista> GetListasIncl(string usuarioId, int eventoId)
        {
            return _ctx.UsuarioListas
                                    .Include(p=> p.Lista)
                                    .Where(p => p.UsuarioId.Equals(usuarioId)
                                                && p.EventoId.Equals(eventoId))
                                                .ToList();
        }

        public void RetiraAcesso(int listaId, string usuarioId)
        {
            UsuarioLista u = _ctx.UsuarioListas.Single(p => p.ListaId == listaId
                                                       && p.UsuarioId == usuarioId);

            _ctx.UsuarioListas.Remove(u);
        }
        
        public void AddAcesso(int eventoId, string usuarioId, int listaId)
        {
            UsuarioLista uLista = new UsuarioLista
            {
                TemAcesso = true,
                EventoId = eventoId,
                UsuarioId = usuarioId,
                ListaId = listaId
            };

            _ctx.UsuarioListas.Add(uLista);
        }
    }
}
