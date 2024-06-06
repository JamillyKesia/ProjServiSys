using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Persistence.Contratos;
using ProjServiSys.Persistence;

namespace ProjServiSys.Persistence
{
    public class GeralPersist : IGeralPersist
    {
        private readonly DbServiSysApiContext _context;
        public GeralPersist(DbServiSysApiContext context) {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

    }
}