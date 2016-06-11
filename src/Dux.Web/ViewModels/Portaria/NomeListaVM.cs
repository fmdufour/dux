using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dux.Web.ViewModels
{
    public class NomeListaVM
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public bool Masculino { get; set; }

        public decimal PrecoEntrada { get; set; }
        public decimal valorConsuma { get; set; }

        public string numCelular { get; set; }
        public string numRg { get; set; }

        public bool PresencaConf { get; set; }
    }
}