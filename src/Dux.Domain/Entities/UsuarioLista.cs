using System.ComponentModel.DataAnnotations.Schema;

namespace Dux.Domain
{
    public class UsuarioLista
    {
        public int Id { get; set; }
        public string UsuarioId { get; set; }

        public int ListaId { get; set; }
        public Lista Lista { get; set; }

        public int? EventoId { get; set; }
        public Evento Evento { get; set; }

        public bool TemAcesso { get; set; }                        
    }
}
