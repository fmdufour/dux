using System;

namespace Dux.Domain
{
    public class LayoutAgendamento : BaseEntity
    {
        public bool DepoisEvento { get; set; }
        public int qtdHoras { get; set; }
        public int qtdMinutos { get; set; }
        public TipoAgendamento TipoAgendamento { get; set; }
        public bool FecharListaM { get; set; }
        public bool FecharListaF { get; set; }
        public bool trocarValorM { get; set; }
        public bool trocarValorF { get; set; }
        public float NovoValorM { get; set; }
        public float NovoValorF { get; set; }
        public LayoutLista LayoutLista { get; set; }
        public int LayoutListaId { get; set; }
    }
}