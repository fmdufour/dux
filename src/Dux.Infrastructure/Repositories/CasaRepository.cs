using Dux.Domain;
using Dux.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class CasaRepository : GenericRepository<Casa>, ICasaRepository 
    {
        private readonly DuxContext _ctx;

        public CasaRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public bool AcessoUsuarioBloqueado(string id, int casaId)
        {
            bool a = _ctx.Users
                       .Include(p=> p.CasasUsuario)
                       .Single(p => p.Id.Equals(id))
                       .CasasUsuario.Single(p => p.CasaId.Equals(casaId)).Bloqueado;
            return a;
        }

        public Casa GetCasa(int id)
        {
            return _ctx.Casas.FirstOrDefault(p => p.Id == id);
        }

        public List<Casa> GetCasasUsuario(string id)
        {
            Usuario usuario = _ctx.Users
                                .Include(p => p.CasasUsuario)
                                .Single(p => p.Id.Equals(id));

            List<Casa> casas = new List<Casa>();

            foreach (var casa in usuario.CasasUsuario)
            {
                casas.Add(_ctx.Casas.Single(p => p.Id.Equals(casa.CasaId)));
            }

            return casas;
        }

        public void SelecionaCasa(string usuarioId, int casaId)
        {
            UsuarioCasaSelec usuarioCasaSelec = _ctx.UsuarioCasaSelec.SingleOrDefault(p => p.UsuarioId.Equals(usuarioId));

            if (usuarioCasaSelec == null)
            {
                usuarioCasaSelec = new UsuarioCasaSelec { CasaId = casaId, UsuarioId = usuarioId };
                _ctx.UsuarioCasaSelec.Add(usuarioCasaSelec);
                return;
            }

            usuarioCasaSelec.CasaId = casaId;
            _ctx.UsuarioCasaSelec.Attach(usuarioCasaSelec);
            _ctx.Entry(usuarioCasaSelec).State = EntityState.Modified;
        }
    }
}
