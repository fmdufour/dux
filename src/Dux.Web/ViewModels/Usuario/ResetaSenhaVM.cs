using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class ResetaSenhaVM
    {
        [Required ( ErrorMessage = "Informe o seu email")]
        [EmailAddress(ErrorMessage = "Email invalido")]
        public string Email { get; set; }

        [Required ( ErrorMessage = "Informe a nova Senha")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [DataType(DataType.Password)]
        [Compare("Senha", ErrorMessage = "A senha e sua confirmacao estão diferentes")]
        public string ConfirmacaoSenha { get; set; }

        public string Code { get; set; }
    }
}
