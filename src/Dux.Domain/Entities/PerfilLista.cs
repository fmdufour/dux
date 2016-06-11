using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Domain
{
    public class PerfilLista : BaseEntity
    {
        public int CasaId { get; set; }
        public Casa Casa { get; set; }
        public string NomePerfil { get; set; }
        public string Observacoes { get; set; }
        public virtual ICollection<LayoutLista> LayoutListas { get; set; }
    }
}
