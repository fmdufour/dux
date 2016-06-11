using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Web.ViewModels
{
    public class EventoCalVM
    {
        public int id { get; set; }
        public string title { get; set; }
        public string backgroundColor { get; set; }
        public string textColor { get; set; }
        public string start { get; set; }
        public bool allDay { get; set; }
    }
}
