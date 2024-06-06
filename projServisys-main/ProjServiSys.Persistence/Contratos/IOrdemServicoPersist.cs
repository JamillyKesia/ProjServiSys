using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Domain;

namespace ProjServiSys.Persistence.Contratos
{
    public interface IOrdemServicoPersist
    {
        Task<OrdemServico[]> GetAllOrdensServicoAsync();
        Task<OrdemServico> GetOrdemServicoByIdAsync(int userId, int OrdemServicoId);
        Task<OrdemServico[]> GetAllOrdensServicoByUsuarioAsync(int userId);

    }
}