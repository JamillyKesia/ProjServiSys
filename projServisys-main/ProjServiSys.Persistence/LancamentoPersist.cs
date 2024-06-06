using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjServiSys.Persistence.Contratos;
using ProjServiSys.Domain;

namespace ProjServiSys.Persistence
{
    public class LancamentoPersist : ILancamentoPersist
    {
         private readonly DbServiSysApiContext _context;

        public LancamentoPersist(DbServiSysApiContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Lancamento[]> GetLancamentoByOrdemServicoIdAsync(int ordemServicoId)
        {
            IQueryable<Lancamento> query = _context.Lancamentos.AsNoTracking();            

            query = query.Where(lancamento => lancamento.OrdemServicoId == ordemServicoId);

            return await query.ToArrayAsync();
        }
    }
}