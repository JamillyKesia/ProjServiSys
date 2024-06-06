using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using ProjServiSys.Domain.Enum;

namespace ProjServiSys.Application.Dto
{
    public class LancamentoDto
    {
        public int Id { get; set; }
        public string DataLancamento { get; set; } = DateTime.Now.ToLocalTime().ToString("");
        public EstadoOrdemServicoEnum EstadoOrdemServico { get; set; }
        public int? OrdemServicoId { get; set; }
    }
}