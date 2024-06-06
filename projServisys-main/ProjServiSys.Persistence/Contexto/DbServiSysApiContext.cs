using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjServiSys.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ProjServiSys.Domain.Identity;

namespace ProjServiSys.Persistence
{
    public class DbServiSysApiContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, 
                                                      IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DbServiSysApiContext(DbContextOptions<DbServiSysApiContext> options) : base(options) { }

        public DbSet<Lancamento> Lancamentos { get; set; }
        public DbSet<OrdemServico> OrdensServico { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Roles)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

                userRole.HasOne(ur => ur.Users)
                .WithMany(r => r.UserRoles) 
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            });


        }
    }

}