using Dux.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class LayoutListaVM
    {
        public int Id { get; set; }

        [MaxLength(255, ErrorMessage = "O nome da lista só pode ter no máximo 255 caracteres")]
        [Required(ErrorMessage = "Informe o Nome da Lista")]
        public string NomeLista { get; set; }
        
        public int? PerfilDistribuicaoId { get; set; }

        public bool ListaM { get; set; }
        public bool ListaF { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "O preço da Entrada Masculina deve ser um valor positivo")]
        [RegularExpression("^[0-9]+((,|.)[0-9]{1,2})?$", ErrorMessage = "Informe o preço masculino no formato correto")]
        public decimal PrecoM { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "O preço da Entrada Feminina deve ser um valor positivo")]
        [RegularExpression("^[0-9]+((,|.)[0-9]{1,2})?$", ErrorMessage = "Informe o preço feminino no formato correto")]
        public decimal PrecoF { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "O preço da Entrada Feminina deve ser um valor positivo")]
        [RegularExpression("^[0-9]+((,|.)[0-9]{1,2})?$", ErrorMessage = "Informe o valor da Consumação Masc. no formato correto")]
        public decimal ValorConsumaM { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "O preço da Entrada Feminina deve ser um valor positivo")]
        [RegularExpression("^[0-9]+((,|.)[0-9]{1,2})?$", ErrorMessage = "Informe o valor da Consumação Fem. no formato correto")]
        public decimal ValorConsumaF { get; set; }

        public bool ExigirRg { get; set; }                
        public bool ExigirCelular { get; set; }                       
        
        public bool AgendarTarefas { get; set; }

        public List<LayoutAgendamentoVM> LayoutAgendamentos { get; set; }
    }
}
