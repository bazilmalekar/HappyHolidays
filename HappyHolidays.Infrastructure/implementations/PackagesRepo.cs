using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;
using HappyHolidays.Infrastructure.interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
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

        public async Task<IEnumerable<Package>> GetAllPackages()
        {
            var allPackages = await _context.Packages.ToListAsync();
            return allPackages;
        }

        public async Task<Package> AddPackage(PackageVM packagevm)
        {
            var package = new Package
            {
                PackageName = packagevm.PackageName,
                PackageLocation = packagevm.PackageLocation,
                PackageType = packagevm.PackageType,
                OriginalPrice = packagevm.OriginalPrice,
                ActualPrice = packagevm.ActualPrice,
                Days = packagevm.Days,
                Nights = packagevm.Nights
            };

            if (packagevm.PackageDetails != null)
            {
                var packageDetails = new PackageDetails
                {
                    PackageDescription = packagevm.PackageDetails.PackageDescription,
                    ItineraryDetails = packagevm.PackageDetails.ItineraryDetails?.Select(ItineraryDetailsVM => new ItineraryDetails
                    {
                        ItineraryTitle = ItineraryDetailsVM.ItineraryTitle,
                        ItineraryDescriptions = ItineraryDetailsVM.ItineraryDescriptions?.Select(descVM => new ItineraryDescription
                        {
                            ItenaryPoints = descVM.ItineraryPoints
                        }).ToList()
                    }).ToList()
                };
                package.PackageDetails = packageDetails;
            }

            _context.Packages.Add(package);
            await Save();

            return package; // Return the created package
        }

        public async Task<bool> RemovePackage(int packageId)
        {
            try
            {
                var deleteProduct = await _context.Packages.FirstOrDefaultAsync(s => s.PackageId == packageId);
                if (deleteProduct == null)
                {
                    return false;
                }

                _context.Packages.Remove(deleteProduct);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false; 
            }
        }


        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
