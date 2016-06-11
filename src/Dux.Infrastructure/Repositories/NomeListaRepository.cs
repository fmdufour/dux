using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class NomeListaRepository : GenericRepository<NomeLista>, INomeListaRepository
    {
        private readonly DuxContext _ctx;

        public NomeListaRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public int CountNomesLista(int listaId, string usuarioId, bool Masc)
        {
            return _ctx.NomesLista.Count(p => p.ListaId == listaId
                                     && p.UsuarioId == usuarioId
                                     && p.Masculino == Masc);
        }

        public NomeLista GetNome(int listaId, int nomeId)
        {
            return _ctx.NomesLista.SingleOrDefault(p => p.Id == nomeId && p.ListaId == listaId);
        }

        public async Task<List<NomeLista>> GetNomesInclLista(int listaId)
        {
            return await _ctx.NomesLista
                            .Include(p=> p.Lista)
                            .Include(p=> p.Promoter)
                            .Where(p => p.ListaId == listaId).ToListAsync();
        }

        public async Task<List<NomeLista>> GetNomesLista(int listaId)
        {
            return await _ctx.NomesLista.Where(p => p.ListaId == listaId).ToListAsync();
        }

        public List<NomeLista> GetNomesPromoter(int listaId, string usuarioId)
        {
            return _ctx.NomesLista.Where(p => p.ListaId == listaId
                                             && p.UsuarioId == usuarioId).ToList();
        }

        public void RemoveTodosNomes(int listaId, string usuarioId)
        {
            List<NomeLista> nomes = _ctx.NomesLista.Where(p => p.ListaId == listaId && p.UsuarioId == usuarioId).ToList();

            _ctx.NomesLista.RemoveRange(nomes);
        }
    }
}
