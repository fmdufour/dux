using System;

namespace Dux.Domain
{

    public enum TipoAgendamento
    {
        FecharLista = 0,
        AlterarValor = 1
    }

    public class Agendamento : BaseEntity
    {
        public bool Executado { get; set; }
        public DateTime HoraAcao { get; set; }
        
        public TipoAgendamento TipoAgendamento { get; set; }
        public bool FecharListaM { get; set; }
        public bool FecharListaF { get; set; }
        public bool trocarValorM { get; set; }
        public bool trocarValorF { get; set; }
        public float NovoValorM { get; set; }
        public float NovoValorF { get; set; }

        public Lista Lista { get; set; }
        public int ListaId { get; set; }
    }
}