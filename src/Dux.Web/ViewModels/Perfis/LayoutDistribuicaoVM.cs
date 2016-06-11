using Dux.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class LayoutDistribuicaoVM
    {
        public int Id { get; set; }
        public string UsuarioId { get; set; }
        public string nome { get; set; }
        public int qtdNomesM { get; set; }
        public int qtdNomesF { get; set; }
    }
}
