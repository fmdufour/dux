using System.ComponentModel.DataAnnotations;
using Dux.Domain;

namespace Dux.Web.ViewModels
{
    public class NomeVM
    {
        [Required]        
        public bool Masculino { get; set; }

        [Required]
        public string Nome { get; set; }

        public string numCelular { get; set; }

        public string numRg { get; set; }
    }
}   
   
    
