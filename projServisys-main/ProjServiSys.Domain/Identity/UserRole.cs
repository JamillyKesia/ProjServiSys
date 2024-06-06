using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ProjServiSys.Domain.Identity
{
     public class UserRole : IdentityUserRole<int>
    {
        public User Users { get; set; }
        public Role Roles { get; set; }
    }
}