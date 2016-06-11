using System.Collections.Generic;
using System.Linq;

namespace Dux.Domain.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {                       
        void Insert(TEntity entity);
        void Delete(TEntity entity);
        void Delete(IEnumerable<TEntity> entities);
        void Update(TEntity entity);        
    }
}