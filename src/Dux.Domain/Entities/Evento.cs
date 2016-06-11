using System;
using System.Collections.Generic;

namespace Dux.Domain
{
    public class Evento : BaseEntity
    {        
        public string NomeEvento { get; set; }
        public DateTime DtaInicio { get; set; }
        public string CorCalendario { get; set; }        

        public int CasaId { get; set; }
        public virtual Casa Casa { get; set; }              
        
        public List<Lista> Listas { get; set; }
    }
}