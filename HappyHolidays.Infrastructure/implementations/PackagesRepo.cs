using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;
using HappyHolidays.Infrastructure.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Refit;
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

        public async Task<IEnumerable<PackageGetVM>> GetIntPackages()
        {
            var internationalPackages = await _context.Packages.Where(p => p.PackageType == PackageTypes.International).ToListAsync();
            var intConvertedPackages = internationalPackages.Select(pkg => new PackageGetVM
            {
                PackageId = pkg.PackageId,
                PackageName = pkg.PackageName,
                PackageLocation = pkg.PackageLocation,
                PackageType = pkg.PackageType,
                IsActive = pkg.IsActive,
                OriginalPrice = pkg.OriginalPrice,
                ActualPrice = pkg.ActualPrice,
                Days = pkg.Days,
                Nights = pkg.Nights,
                IsFixedDeparture = pkg.IsFixedDeparture,
                CardThumbNailImage = pkg.CardThumbNailImage != null
            ? $"data:image/jpeg;base64,{Convert.ToBase64String(pkg.CardThumbNailImage)}"
            : null
            }).ToList();
            return intConvertedPackages;
        }

        public async Task<IEnumerable<PackageGetVM>> GetDomPackages()
        {
            var domPackages = await _context.Packages.Where(s => s.PackageType == PackageTypes.Domestic).ToListAsync();
            var domConvertedPackages = domPackages.Select(pkg => new PackageGetVM
            {
                PackageId = pkg.PackageId,
                PackageName = pkg.PackageName,
                PackageLocation = pkg.PackageLocation,
                PackageType = pkg.PackageType,
                IsActive = pkg.IsActive,
                OriginalPrice = pkg.OriginalPrice,
                ActualPrice = pkg.ActualPrice,
                Days = pkg.Days,
                Nights = pkg.Nights,
                IsFixedDeparture = pkg.IsFixedDeparture,
                CardThumbNailImage = pkg.CardThumbNailImage != null
            ? $"data:image/jpeg;base64,{Convert.ToBase64String(pkg.CardThumbNailImage)}"
            : null
            }).ToList();
            return domConvertedPackages;
        }

        public async Task<IEnumerable<PackageGetVM>> GetHoneymoonPackages()
        {
            var honeymoonPackages = await _context.Packages.Where(s => s.PackageType == PackageTypes.Honeymoon).ToListAsync();
            var honeymoonConvertedPackages = honeymoonPackages.Select(pkg => new PackageGetVM
            {
                PackageId = pkg.PackageId,
                PackageName = pkg.PackageName,
                PackageLocation = pkg.PackageLocation,
                PackageType = pkg.PackageType,
                IsActive = pkg.IsActive,
                OriginalPrice = pkg.OriginalPrice,
                ActualPrice = pkg.ActualPrice,
                Days = pkg.Days,
                Nights = pkg.Nights,
                IsFixedDeparture = pkg.IsFixedDeparture,
                CardThumbNailImage = pkg.CardThumbNailImage != null
            ? $"data:image/jpeg;base64,{Convert.ToBase64String(pkg.CardThumbNailImage)}"
            : null
            }).ToList();
            return honeymoonConvertedPackages;
        }

        public async Task<PackageDetailsGetVM> GetPackageDetails(int packageId)
{
    var packageDetails = await _context.Packages
        .Include(p => p.PackageDetails)
            .ThenInclude(pd => pd.ItineraryDetails)
                .ThenInclude(id => id.ItineraryDescriptions)
        .FirstOrDefaultAsync(s => s.PackageId == packageId);

    // Check if packageDetails is null
    if (packageDetails == null)
        return null; // or handle it as you prefer

    // Map to PackageDetailsGetVM
    var packageDetailsVM = new PackageDetailsGetVM
    {
        PackageName = packageDetails.PackageName,
        PackageLocation = packageDetails.PackageLocation,
        PackageType = packageDetails.PackageType,
        IsActive = packageDetails.IsActive,
        OriginalPrice = packageDetails.OriginalPrice,
        ActualPrice = packageDetails.ActualPrice,
        Days = packageDetails.Days,
        Nights = packageDetails.Nights,
        IsFixedDeparture = packageDetails.IsFixedDeparture,
        CardThumbNailImage = packageDetails.CardThumbNailImage != null
            ? $"data:image/jpeg;base64,{Convert.ToBase64String(packageDetails.CardThumbNailImage)}"
            : null,
        PackageDetails = new GetPackageDetailsVM
        {
            PackageDescription = packageDetails.PackageDetails?.PackageDescription,
            PackageImages = packageDetails.PackageDetails?.PackageImages?.Select(img => 
                $"data:image/jpeg;base64,{Convert.ToBase64String(img)}").ToList(),
            ItineraryDetails = packageDetails.PackageDetails?.ItineraryDetails?.Select(itinerary => new GetItineraryDetailsVM
            {
                ItineraryTitle = itinerary.ItineraryTitle,
                ItineraryDescriptions = itinerary.ItineraryDescriptions?.Select(desc => new GetItineraryDescriptionVM
                {
                    ItineraryPoints = desc.ItenaryPoints
                }).ToList()
            }).ToList()
        }
    };

    return packageDetailsVM;
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
                IsFixedDeparture = packagevm.IsFixedDeparture,
                IsActive = packagevm.IsActive // Don't forget to map IsActive
            };

            // Handling package details
            if (packagevm.PackageDetails != null)
            {
                var packageDetails = new PackageDetails
                {
                    PackageDescription = packagevm.PackageDetails.PackageDescription,
                    ItineraryDetails = packagevm.PackageDetails.ItineraryDetails?.Select(itineraryDetailsVM => new ItineraryDetails
                    {
                        ItineraryTitle = itineraryDetailsVM.ItineraryTitle, // Maps "itineraryTitle"
                        ItineraryDescriptions = itineraryDetailsVM.ItineraryDescriptions?.Select(descVM => new ItineraryDescription
                        {
                            ItenaryPoints = descVM.ItenaryPoints // Maps "itineraryPoints"
                        }).ToList()
                    }).ToList()
                };

                // Handling package images
                if (packagevm.PackageDetails.PackageImages != null)
                {
                    packageDetails.PackageImages = new List<byte[]>();

                    foreach (var file in packagevm.PackageDetails.PackageImages)
                    {
                        if (file.Length > 0) // Check if the file is valid
                        {
                            using (var stream = new MemoryStream())
                            {
                                await file.CopyToAsync(stream);
                                packageDetails.PackageImages.Add(stream.ToArray());
                            }
                        }
                    }
                }

                package.PackageDetails = packageDetails;
            }

            // Handling card thumbnail image
            if (packagevm.CardThumbNailImage != null)
            {
                using (MemoryStream stream = new MemoryStream())
                {
                    await packagevm.CardThumbNailImage.CopyToAsync(stream);
                    package.CardThumbNailImage = stream.ToArray();
                }
            }

            // Adding the package entity to the context
            _context.Packages.Add(package);

            // Save changes to the database
            await _context.SaveChangesAsync();
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
