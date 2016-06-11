using System.ComponentModel.DataAnnotations;
using Dux.Domain;

namespace Dux.Web
{
    public class RegisterVM
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Sua senha deve ter no mínimo 6 caracteres", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Senha { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm. Senha")]
        [Compare("Password", ErrorMessage = "A senha e sua confirmação devem ser iguais")]
        public string ConfirmSenha { get; set; }

		public int CasaID { get; set; }
    }
}   
   
    
