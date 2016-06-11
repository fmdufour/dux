using System.ComponentModel.DataAnnotations;
using Dux.Domain;

namespace Dux.Web
{
    public class LoginVM
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
    }
}   
   
    
