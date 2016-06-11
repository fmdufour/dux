using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Domain
{
    public class ListaPromoter
    {
        public int Id { get; set; }

        public string NomeLista { get; set; }

        public int NomesInserM { get; set; }

        public int QtdNomesM { get; set; }

        public decimal PrecoM { get; set; }

        public decimal ValorConsumaM { get; set; }

        public int NomesInserF { get; set; }

        public int QtdNomesF { get; set; }

        public bool ListaM { get; set; }

        public bool ListaF { get; set; }

        public decimal PrecoF { get; set; }

        public decimal ValorConsumaF { get; set; }        
    }
}
