using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class EventoVM {

        public int Id { get; set; }

        [Required(ErrorMessage = "Informe o Nome do Evento")]
        [MaxLength(255,ErrorMessage = "A nome do Evento só pode ter no máximo 50 caracteres")]
        public string NomeEvento { get; set; }

        [Required (ErrorMessage = "Informe a Data do Evento")]
        public DateTime DtaInicio { get; set; }        

        [Required(ErrorMessage = "Informe a data do Evento")]
        [RegularExpression("(([0-1][0-9])|(2[0-3]))[0-5][0-9]", ErrorMessage = "Informe a Hora do Evento no formato correto")]
        public string horaEvento { get; set; }

        [Required(ErrorMessage = "Selecione a cor do Evento para exibição na agenda")]
        public string CorCalendario { get; set; }               

        public int? perfilListaId { get; set; }
    }
}
