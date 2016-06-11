using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Exceptions
{
    public class RegraException : Exception
    {
        public RegraException() : base() { }
       
        public RegraException(string msg) : base(msg) { }
    }
}
