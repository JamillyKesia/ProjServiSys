using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Domain.Identity;


namespace ProjServiSys.Persistence.Contratos
{
    public interface IUserPersist : IGeralPersist
    {
        Task<IEnumerable<User>> GetUserAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUserNameAsync(string username);
    }
}