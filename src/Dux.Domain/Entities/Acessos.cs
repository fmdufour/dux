using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Domain
{
    public class Acessos : BaseEntity
    {
        public string TipoClaim { get; set; }
        public string Descricao { get; set; }
    }
}
