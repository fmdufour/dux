using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class DistribuicaoVM {
        public int listaId { get; set; }
        public List<LayoutDistribuicaoVM> Distribuicoes { get; set; }
    }
}
