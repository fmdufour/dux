using Dux.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class PerfilListaVM
    {
        public int Id { get; set; }        

        [MaxLength(255,ErrorMessage = "O nome do perfil só pode ter no máximo 255 caracteres")]
        [Required(ErrorMessage = "Informe o Nome do Perfil")]
        public string NomePerfil { get; set; }

        [MaxLength(255, ErrorMessage = "A observação do perfil só pode ter no máximo 255 caracteres")]
        public string Observacoes { get; set; }

        [Required(ErrorMessage = "Informe ao menos uma lista no perfil")]
        public List<LayoutListaVM> LayoutListas { get; set; }
    }
}
