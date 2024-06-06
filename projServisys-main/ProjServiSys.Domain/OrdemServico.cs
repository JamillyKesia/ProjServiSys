using ProjServiSys.Domain.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ProjServiSys.Domain.Identity;


namespace ProjServiSys.Domain
{
    public class OrdemServico
    {
        [Key] public int Id { get; set; }
        public DateTime DataOrdemServico { get; set; } = DateTime.Now.ToLocalTime();

        [StringLength(maximumLength: 200, MinimumLength = 5)]
        public string DescricaoProblema { get; set; }

        [StringLength(maximumLength: 1200, MinimumLength = 5)]
        public string LocalEquipamento { get; set; }
        public string TipoEquipamento { get; set; }
        public string SerialEquipamento { get; set; }
        public string PosicaoEquipamento { get; set; }

        [EnumDataType(typeof(EstadoOrdemServicoEnum))]
        public EstadoOrdemServicoEnum EstadoOrdemServico { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } 
        
    }
}