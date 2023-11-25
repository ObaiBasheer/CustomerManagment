using CustomerManagment.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace CustomerManagment.API.Data
{
    public class CmDbContext : DbContext
    {
        //protected readonly IConfiguration Configuration;

        //public CmDbContext(IConfiguration configuration)
        //{
        //    Configuration = configuration;
        //}

        public CmDbContext(DbContextOptions<CmDbContext> options) : base(options) { }

       

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }


        //protected override void OnConfiguring(DbContextOptionsBuilder options)
        //{

        //    // connect to postgres with connection string from app settings
        //    options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>()
                .HasOne(a => a.Customer)
                .WithMany(c => c.Addresses)
                .HasForeignKey(a => a.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
