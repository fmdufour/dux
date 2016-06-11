using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Domain
{
    public class UsuarioCasaSelec
    {
        public string UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }

        public int CasaId { get; set; }
        public virtual Casa Casa { get; set; }
    }
}
