using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Application.Dto;

namespace ProjServiSys.Application.Contratos
{
    public interface ITokenService
    {
        Task<string> CreateToken (UserUpdateDto userUpdateDto);
    }
}