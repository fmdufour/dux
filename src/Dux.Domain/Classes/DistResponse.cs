using System;
using System.Collections.Generic;

namespace Dux.Domain
{
    public class DistResponse
    {
        public int Status { get; set; }
            
    }

    public class DistItem
    {
        public LayoutDistribuicao dist { get; set; }         
    }
}
