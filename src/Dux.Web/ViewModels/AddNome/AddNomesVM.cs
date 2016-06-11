using System.ComponentModel.DataAnnotations;
using Dux.Domain;
using System.Collections.Generic;

namespace Dux.Web.ViewModels
{
    public class AddNomesVM
    {
        [Required]        
        public int ListaId { get; set; }

        public List<NomeVM> Nomes { get; set; }               
    }
}   
   
    
