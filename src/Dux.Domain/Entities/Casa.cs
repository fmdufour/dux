using System.Collections.Generic;

namespace Dux.Domain
{
    public class Casa : BaseEntity
    {        
        public string NomeCasa { get; set; }
        public bool AcessoBloqueado { get; set; }
        public virtual ICollection<UsuarioCasa> UsuariosCasa { get; set; }
        public int GrupoId { get; set; }
        public virtual Grupo Grupo { get; set; }
        public virtual ICollection<Evento> Eventos { get; set; }
    }
}