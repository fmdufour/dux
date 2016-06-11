using Dux.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{    
    public class PerfilDistVM
    {
        public int Id { get; set; }

        [MaxLength(50,  ErrorMessage = "O tamanho máximo para o nome é de 50 caracteres"  )]
        [Required(ErrorMessage = "Escreva o Nome do Perfil De Distribuição")]
        public string nomePerfil { get; set; }

        [Required(ErrorMessage = "Distribua Convidados para os Úsuarios")]
        public List<LayoutDistribuicaoVM> LayoutsDistribuicao { get; set; }        
    }
}
