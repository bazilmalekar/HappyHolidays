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
            var packageDetails = await _context.Packages
                .Include(p => p.PackageDetails)
                    .ThenInclude(pd => pd.ItineraryDetails)
                        .ThenInclude(id => id.ItineraryDescriptions)
                .FirstOrDefaultAsync(s => s.PackageId == packageId);
            return packageDetails;
        }


        public async Task<IEnumerable<Package>> GetAllPackages()
        {
            var allPackages = await _context.Packages
                .Include(p => p.PackageDetails)
                    .ThenInclude(pd => pd.ItineraryDetails)
                    .ThenInclude(id => id.ItineraryDescriptions)
                    .ToListAsync();
            return allPackages;
        }

        public async Task<Package> AddPackage(PackageVM packagevm)
        {
            // Create the main package entity
            var package = new Package
            {
                PackageName = packagevm.PackageName,
                PackageLocation = packagevm.PackageLocation,
                PackageType = packagevm.PackageType,
                OriginalPrice = packagevm.OriginalPrice,
                ActualPrice = packagevm.ActualPrice,
                Days = packagevm.Days,
                Nights = packagevm.Nights,
                IsFixedDeparture = packagevm.IsFixedDeparture
            };


            if (packagevm.PackageDetails != null)
            {
                var packageDetails = new PackageDetails
                {
                    PackageDescription = packagevm.PackageDetails.PackageDescription,
                    ItineraryDetails = packagevm.PackageDetails.ItineraryDetails?.Select(itineraryDetailsVM => new ItineraryDetails
                    {
                        ItineraryTitle = itineraryDetailsVM.ItineraryTitle,
                        ItineraryDescriptions = itineraryDetailsVM.ItineraryDescriptions?.Select(descVM => new ItineraryDescription
                        {
                            ItenaryPoints = descVM.ItineraryPoints
                        }).ToList()
                    }).ToList()
                };
                package.PackageDetails = packageDetails;
            }

            if (packagevm.CardThumbNailImage != null && packagevm.CardThumbNailImage.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await packagevm.CardThumbNailImage.CopyToAsync(memoryStream);
                    var imageBytes = memoryStream.ToArray();
                    package.CardThumbNailImage = Convert.ToBase64String(imageBytes);  
                }
            }

            _context.Packages.Add(package);
            await Save();
            return package;
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

        public async Task EditPackage(Package package)
        {
            _context.Packages.Update(package);
            await Save();
        }


        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
