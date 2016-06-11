using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dux.Domain;

namespace Dux.Domain
{
    public class DistComis
    {
        public List<Distribuicao> Dist { get; set; }
        public string Nome { get; set; }
        public int ListaId { get; set; }
    }
}
