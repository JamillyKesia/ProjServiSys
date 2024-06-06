using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjServiSys.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;
using ProjServiSys.Domain.Identity;


namespace ProjServiSys.Persistence
{
    public class UserPersist : GeralPersist, IUserPersist
    {
        private readonly DbServiSysApiContext _context;
        public UserPersist(DbServiSysApiContext context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetUserAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUserNameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(user => user.UserName == username.ToLower());
        }

    }
}