using System.Collections.Generic;

namespace Dux.Domain
{
    public class PerfilDistribuicao : BaseEntity
    {
        public int CasaId { get; set; }
        public Casa Casa { get; set; }
        public string NomePerfil { get; set; }
        public List<LayoutDistribuicao> LayoutsDistribuicao { get; set; }        
    }
}