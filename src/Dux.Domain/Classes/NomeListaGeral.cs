using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Domain
{
    public class NomeListaGeral
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public int ListaId { get; set; }
        public string NomeLista { get; set; }
        
        public string Promoter { get; set; }

        public bool Masculino { get; set; }

        public string Genero { get; set; }

        public decimal PrecoEntrada { get; set; }
        public decimal valorConsuma { get; set; }

        public string numCelular { get; set; }
        public string numRg { get; set; }

        public bool PresencaConf { get; set; }

        public DateTime dtaAdicionado { get; set; }
    }
}
