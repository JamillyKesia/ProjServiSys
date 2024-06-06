using ProjServiSys.Domain.Enum;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProjServiSys.Domain
{
    public class Usuario
    {
        [Key] public int Id { get; set; }

        [StringLength(maximumLength: 60, MinimumLength = 5)]
        public string NomeLogin { get; set; }

        [StringLength(maximumLength: 60, MinimumLength = 5)]
        public string NomeUsuario { get; set; }
        public CargoEnum Cargo { get; set; }
        public TipoUsuarioEnum TipoUsuario { get; set; }
        public virtual IEnumerable<OrdemServico>? OrdensDeServico { get; set; }
        public virtual IEnumerable<Lancamento>? Lancamentos { get; set; }

        
    }
}
