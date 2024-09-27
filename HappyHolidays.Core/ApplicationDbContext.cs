using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HappyHolidays.Core
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Package> Packages { get; set; }

        public DbSet<PackageDetails> PackageDetails { get; set; }

        public DbSet<ItineraryDetails> ItineraryDetails { get; set; }

        public DbSet<ItineraryDescription> ItineraryDescription { get; set; }

        public DbSet<ContactUs> ContactUs { get; set; }


        
    }
}