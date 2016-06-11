using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Dux.Domain.Interfaces;

namespace Dux.Infrastructure
{ 

    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {

        internal DuxContext DuxContext;
        internal DbSet<TEntity> DbSet;

        public GenericRepository(DuxContext DuxContext)
        {
            this.DuxContext = DuxContext;
            this.DbSet = DuxContext.Set<TEntity>();
        }


        public virtual void Insert(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (DuxContext.Entry(entityToDelete).State == EntityState.Detached)
            {
                DbSet.Attach(entityToDelete);
            }
            DbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            DbSet.Attach(entityToUpdate);
            DuxContext.Entry(entityToUpdate).State = EntityState.Modified;
        }


        public void Delete(IEnumerable<TEntity> entities)
        {            
            DbSet.RemoveRange(entities);
        }
        
    }
}
