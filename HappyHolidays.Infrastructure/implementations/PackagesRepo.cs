using HappyHolidays.Core;
using HappyHolidays.Infrastructure.interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Infrastructure.implementations
{
    public class PackagesRepo : IPackagesRepo
    {
        private readonly ApplicationDbContext _context;

        public PackagesRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Package>> GetIntPackages()
        {
            //var intpackages = await _context.Packages.Where(s => s.PackageType == PackageTypes.International).ToListAsync();
            var internationalPackages = await _context.Packages.Where(p => p.PackageType == PackageTypes.International).ToListAsync();
            return internationalPackages;
        }

        public async Task<IEnumerable<Package>> GetDomPackages()
        {
            var domPackages = await _context.Packages.Where(s => s.PackageType == PackageTypes.Domestic).ToListAsync();
            return domPackages;
        }

        public async Task<IEnumerable<Package>> GetHoneymoonPackages()
        {
            var honeymoonPackages = await _context.Packages.Where(s => s.PackageType == PackageTypes.Honeymoon).ToListAsync();
            return honeymoonPackages;
        }

        public async Task<Package> GetPackageDetails(int packageId)
        {
            var packageDetails = await _context.Packages.Include(p => p.PackageDetails)
                .ThenInclude(id => id.ItineraryDetails)
                .ThenInclude(itd => itd.ItineraryDescriptions)
                .FirstOrDefaultAsync(s => s.PackageId == packageId);
            return packageDetails;
        }
    }
}
