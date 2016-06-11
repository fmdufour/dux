using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class DistribuicaoRepository : GenericRepository<Distribuicao>, IDistribuicaoRepository 
    {
        private readonly DuxContext _ctx;

        public DistribuicaoRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public List<Distribuicao> GetDist(int listaId)
        {
            return _ctx.Distribuicoes
                            .Where(p => p.ListaId == listaId)
                            .ToList();
        }

        public Distribuicao GetDist(string usuarioId, int listaId)
        {
            return _ctx.Distribuicoes
                                .Single(p => p.UsuarioId == usuarioId
                                        && p.ListaId == listaId);
        }

        public Distribuicao GetDistribuicao(int listaId, string usuarioId)
        {
            return _ctx.Distribuicoes.Single(p => p.UsuarioId == usuarioId
                                                 && p.ListaId == listaId);
        }
    }
}
