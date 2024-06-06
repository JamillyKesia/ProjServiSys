using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using ProjServiSys.Domain.Enum;

namespace ProjServiSys.Application.Dto
{
    public class UserDto
    {
        public string Username { get; set; }
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
        public TipoUsuarioEnum TipoUsuario { get; set; }
        public CargoEnum Cargo { get; set; }

        [Required(ErrorMessage = "O {0} é obrigatório!")]
        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage = "É necessário um {0} válido")]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}