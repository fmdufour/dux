using System;
using System.Collections.Generic;

namespace Dux.Domain
{
    public class UsuarioCasa    
    {        
        public int CasaId { get; set; }
        public Casa Casa { get; set; }

        public string UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public bool Bloqueado { get; set; }
        public DateTime? DataBloqueio { get; set; }
    }
}