using Dux.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class DefineAcessosVM
    {
        [Required]
        public string UsuarioId { get; set; }

        public List<Acessos> Acessos{ get;set;}
    }
}
