using Dux.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class LayoutAgendamentoVM
    {
        [MaxLength(255,ErrorMessage = "A descrição do agendamento só pode ter no máximo 255 caracteres")]
        public string DescricaoAgendamento { get; set; }

        public bool DepoisEvento { get; set; }        

        public int qtdHoras { get; set; }

        [Range(0,59,ErrorMessage = "A quantidade de minutos do agendamento deve ser um número entre 0 e 59")]
        public int qtdMinutos { get; set; }

        [Required(ErrorMessage = "Informe o tipo do agendamento")]
        public TipoAgendamento TipoAgendamento { get; set; }

        public bool trocarValorM { get; set; }
        public bool trocarValorF { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "O novo valor da lista após o agendamento deve ser um número positivo")]
        public float NovoValorM { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "O novo valor da lista após o agendamento deve ser um número positivo")]
        public float NovoValorF { get; set; }

        public bool FecharListaM { get; set; }
        public bool FecharListaF { get; set; }      
    }
}
