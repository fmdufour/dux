using Dux.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class UsuarioCriarVM
    {        
        [Required(ErrorMessage = "Informe o nome do Usuário")]        
        [MaxLength(20,ErrorMessage = "O nome só pode ter no máximo 20 caracteres")]
        public string Nome { get; set; }

        [MaxLength(40, ErrorMessage = "O nome só pode ter no máximo 40 caracteres")]
        public string Sobrenome { get; set; }

        [Required(ErrorMessage = "Informe o email do Usuário")]
        [DataType(DataType.EmailAddress,ErrorMessage = "Informe um email válido")]
        public string Email { get; set; }

        public string ImgPerfil { get; set; }        

        public List<int> Casas { get; set; }
    }
}
