using System;

namespace Dux.Domain
{
    public abstract class BaseEntity
    {
        public BaseEntity()
        {
            dtaCriacao = DateTime.Now;
            dtaEdicao = DateTime.Now;
        }
        
        public int Id { get; set; }
        
        public DateTime dtaCriacao { get; set; }
        
        public DateTime dtaEdicao { get; set; }
    }
}
