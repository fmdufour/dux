using System.Collections.Generic;

namespace Dux.Domain
{
    public class NomeLista : BaseEntity
    {
        public string Nome { get; set; }

        public int ListaId { get; set; }
        public Lista Lista { get; set; }    
           
        public string UsuarioId { get; set; }        
        public Usuario Promoter { get; set; }
        
        public bool Masculino { get; set; }

        public decimal PrecoEntrada { get; set; }
        public decimal valorConsuma { get; set; }

        public string numCelular { get; set; }
        public string numRg { get; set; }

        public bool PresencaConf { get; set; }
    }
}