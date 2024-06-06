using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Application.Dto;

namespace ProjServiSys.Application.Contratos
{
    public interface ILancamentoService
    {
        Task AddLancamento(int ordemServicoId, LancamentoDto model);
        Task<LancamentoDto[]> SaveLancamentos(int ordemServicoId, LancamentoDto[] modelLancamento);
        Task<LancamentoDto[]> GetLancamentoByOrdemServicoIdAsync(int ordemServicoId);
    }
}