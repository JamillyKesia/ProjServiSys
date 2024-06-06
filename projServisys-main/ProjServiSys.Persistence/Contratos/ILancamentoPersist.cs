using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Domain;

namespace ProjServiSys.Persistence.Contratos
{
    public interface ILancamentoPersist
    {
        Task<Lancamento[]> GetLancamentoByOrdemServicoIdAsync(int ordemServicoId);
    }
}