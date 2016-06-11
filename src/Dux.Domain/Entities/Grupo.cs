using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Domain
{
    public class Grupo : BaseEntity
    {        
        public string NomeGrupo { get; set; }
        public virtual ICollection<Casa> Casas { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }      
    }
}
