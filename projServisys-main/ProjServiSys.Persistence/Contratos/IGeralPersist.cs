using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjServiSys.Persistence.Contratos
{
    public interface IGeralPersist
    {
        void Add<T> (T entity) where T : class;
        void Update<T> (T entity) where T : class;
        Task<bool> SaveChangesAsync();
    }
}