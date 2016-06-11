using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dux.Web.ViewModels
{
    public class ListaVM
    {
        public int Id { get; set; }        

        public int PerfilDistribuicaoId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "O evento deve ser informado")]
        public int EventoId { get; set; }

        public bool Fechada { get; set; }        

        [Required(ErrorMessage = "Informe o Nome da Lista")]
        [MaxLength(255, ErrorMessage = "A nome da Lista só pode ter no máximo 50 caracteres")]
        public string NomeLista { get; set; }

        public bool exigirCelular { get; set; }
        public bool exigirRg { get; set; }
        public bool ListaM { get; set; }
        public bool ListaF { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "O preço da Entrada Masculina deve ser um valor positivo")]
        [RegularExpression("^[0-9]+((,|.)[0-9]{1,2})?$", ErrorMessage = "Informe o preço masculino no formato correto")]
        public decimal PrecoM { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "O preço da Entrada Feminina deve ser um valor positivo")]
        [RegularExpression("^[0-9]+((,|.)[0-9]{1,2})?$", ErrorMessage = "Informe o preço feminino no formato correto")]
        public decimal PrecoF { get; set; }


        [Range(0, double.MaxValue, ErrorMessage = "O valor da consumação Masc. deve ser um valor positivo")]
        [RegularExpression("^[0-9]+((,|.)[0-9]{1,2})?$", ErrorMessage = "Informe o valor da Consumação Masc. no formato correto")]
        public decimal ValorConsumaM { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "O valor da consumação Fem. deve ser um valor positivo")]
        [RegularExpression("^[0-9]+((,|.)[0-9]{1,2})?$", ErrorMessage = "Informe o valor da Consumação Fem. no formato correto")]
        public decimal ValorConsumaF { get; set; }
    }
}