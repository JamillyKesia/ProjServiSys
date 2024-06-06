using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Domain.Enum;
using ProjServiSys.Domain.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace ProjServiSys.Application.Dto
{
    public class OrdemServicoDto
    {
        public int Id { get; set; }
        public string DataOrdemServico { get; set; } = DateTime.Now.ToLocalTime().ToString("");
        public string DescricaoProblema { get; set; }

        [Display(Name = "local do equipamento")]
        [Required(ErrorMessage = "O {0} é obrigatório!"), StringLength(60, MinimumLength = 5)]
        public string LocalEquipamento { get; set; }
        public string TipoEquipamento { get; set; }
        public string SerialEquipamento { get; set; }
        public string PosicaoEquipamento { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        public EstadoOrdemServicoEnum EstadoOrdemServico { get; set; }
    }
}