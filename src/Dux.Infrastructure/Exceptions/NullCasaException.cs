using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dux.Infrastructure.Exceptions
{
    public class NullCasaException : Exception
    {
        public NullCasaException() : base() { }
       
        public NullCasaException(string msg) : base(msg) { }
    }
}
