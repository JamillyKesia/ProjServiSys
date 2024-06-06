using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjServiSys.Persistence.Contratos;
using ProjServiSys.Domain;
using ProjServiSys.Domain.Enum;

namespace ProjServiSys.Persistence
{
    public class OrdemServicoPersist : IOrdemServicoPersist
    {
        private readonly DbServiSysApiContext _context;

        public OrdemServicoPersist(DbServiSysApiContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<OrdemServico[]> GetAllOrdensServicoAsync()
        {
            IQueryable<OrdemServico> query = _context.OrdensServico.AsNoTracking();

            query = query.OrderByDescending(os => os.DataOrdemServico);

            return await query.ToArrayAsync();
        }

        public async Task<OrdemServico[]> GetAllOrdensServicoByUsuarioAsync(int userId)
        {
            IQueryable<OrdemServico> query = _context.OrdensServico.AsNoTracking();

            query = query.Where(os => os.UserId == userId).OrderBy(os => os.Id);

            return await query.ToArrayAsync();
        }

        public async Task<OrdemServico> GetOrdemServicoByIdAsync(int userId, int OrdemServicoId)
        {
            IQueryable<OrdemServico> query = _context.OrdensServico.AsNoTracking();

            query = query.Where(os => os.Id == OrdemServicoId && os.UserId == userId);

            return await query.FirstOrDefaultAsync();
        }

    }
}