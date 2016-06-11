using System.Collections.Generic;

namespace Dux.Domain
{
    public class LayoutLista : BaseEntity
    {
        public PerfilLista PerfilLista { get; set; }
        public int PerfilListaId { get; set; }

        public PerfilDistribuicao PerfilDistribuicao { get; set; }
        public int? PerfilDistribuicaoId { get; set; }

        public string NomeLista { get; set; }
        public bool ListaM { get; set; }
        public bool ListaF { get; set; }
        public decimal PrecoM { get; set; }
        public decimal PrecoF { get; set; }
        public decimal ValorConsumaM { get; set; }
        public decimal ValorConsumaF { get; set; }
        public bool ExigirCelular { get; set; }
        public bool ExigirRg { get; set; }
        public bool AgendarTarefas { get; set; }
        public virtual ICollection<LayoutAgendamento> LayoutAgendamentos { get; set; }               
    }
}