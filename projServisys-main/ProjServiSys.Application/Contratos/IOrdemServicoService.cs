using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Application.Dto;
using ProjServiSys.Domain.Enum;

namespace ProjServiSys.Application.Contratos
{
    public interface IOrdemServicoService
    {
        Task<OrdemServicoDto> AddOrdensServico(int userId,OrdemServicoDto model);
        Task<OrdemServicoDto> UpdateOrdemServico(int osId, OrdemServicoDto model);
        Task<OrdemServicoDto> UpdateMudarStatusOrdemServico(int osId, EstadoOrdemServicoEnum novoStatus);
        Task<OrdemServicoDto> UpdateAprovadoOrdemServico(int osId);
        Task<OrdemServicoDto> UpdateRejeitadaOrdemServico(int osId);



        Task<OrdemServicoDto[]> GetAllOrdensServicoAsync();
        Task<OrdemServicoDto> GetOrdemServicoByIdAsync(int OrdemServicoId);
        Task<OrdemServicoDto[]> GetAllOrdensServicoByUsuarioAsync(int userId);
    }
}