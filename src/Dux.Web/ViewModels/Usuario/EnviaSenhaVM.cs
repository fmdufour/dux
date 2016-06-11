using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class EnviaSenhaVM
    {
        [Required(ErrorMessage = "Informe o email")]
        [EmailAddress(ErrorMessage = "Informe um email válido")]
        public string Email { get; set; }
    }
}
