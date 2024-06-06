using ProjServiSys.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace ProjServiSys.Domain
{
    public class Lancamento
    {
        [Key] public int Id { get; set; } 
        public DateTime DataLancamento { get; set; } = DateTime.Now.ToLocalTime();
        public EstadoOrdemServicoEnum EstadoOrdemServico { get; set; }
        public int? OrdemServicoId { get; set; }
        public OrdemServico? OrdemServico { get; set; }

    }
}
