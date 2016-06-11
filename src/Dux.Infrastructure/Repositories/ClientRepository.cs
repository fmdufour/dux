using Dux.Domain;
using Dux.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Repositories
{
    public class ClientRepository : GenericRepository<Client>, IClientRepository 
    {
        private readonly DuxContext _ctx;

        public ClientRepository(DuxContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }

        public Client GetClient(string id)
        {
            return _ctx.Clients.FirstOrDefault(p => p.Id == id);
        }
    }
}
