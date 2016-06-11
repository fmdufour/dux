using System.Collections.Generic;

namespace Dux.Domain
{
    public class Lista : BaseEntity
    {
        public Evento Evento { get; set; }
        public int EventoId { get; set; }                
        public bool FechadaM { get; set; }
        public bool FechadaF { get; set; }
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
        public List<Agendamento> LayoutAgendamentos { get; set; }
        public List<UsuarioLista> UsuarioListas { get; set; }
    }
}