using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;
using HappyHolidays.Infrastructure.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace HappyHolidays.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PackageController : ControllerBase
    {
        private readonly IPackagesRepo _packagesRepo;

        public PackageController(IPackagesRepo packagesRepo)
        {
            _packagesRepo = packagesRepo;
        }

        [HttpGet("GetPackages")]
        public async Task<IActionResult> GetPackages()
        {
            var allPackages = await _packagesRepo.GetAllPackages();
            if (allPackages == null)
            {
                return NotFound("No packages found");
            }
            return Ok(allPackages);
        }


        [HttpGet("international")]
        public async Task<ActionResult<IEnumerable<PackageGetVM>>> International()
        {
            var IntPackages = await _packagesRepo.GetIntPackages();
            if (IntPackages == null)
            {
                return NotFound("No international packages found");
            }
            return Ok(IntPackages);
        }

        [HttpGet("domestic")]
        public async Task<ActionResult<IEnumerable<PackageGetVM>>> Domestic()
        {
            var DomPackages = await _packagesRepo.GetDomPackages();
            if (DomPackages == null)
            {
                return NotFound("No international packages found");
            }
            return Ok(DomPackages);
        }

        [HttpGet("honeymoon")]
        public async Task<ActionResult<IEnumerable<PackageGetVM>>> Honeymoon()
        {
            var honeymoonPackages = await _packagesRepo.GetHoneymoonPackages();
            if (honeymoonPackages == null)
            {
                return NotFound("No international packages found");
            }
            return Ok(honeymoonPackages);
        }

        [HttpGet("Details/{id}")]
        public async Task<ActionResult> Details(int id)
        {
            var packageDetails = await _packagesRepo.GetPackageDetails(id);

            if (packageDetails == null)
            {
                return NotFound("Package details not found");
            }

            return Ok(packageDetails);
        }

        [HttpPost("CreatePackage")]
        public async Task<ActionResult> CreatePackage(PackageVM packageVM)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // returns added package and get the created entity with its ID
            var createdPackage = await _packagesRepo.AddPackage(packageVM);

            // Return a 201 status code
            return CreatedAtAction(
                nameof(Details),
                new { id = createdPackage.PackageId },
                packageVM
            );
        }

        [HttpDelete("DeletePackage/{id}")]
        public async Task<IActionResult> DeletePackage(int id)
        {
            try
            {
                bool success = await _packagesRepo.RemovePackage(id);
                if (success)
                {
                    return Ok(new { Message = "Package successfully deleted." });
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred."); // Internal server error
            }
        }


        [HttpPut("EditPackage/{id}")]
        public async Task<IActionResult> EditPackage(int id, [FromBody] Package package)
        {
            if (id != package.PackageId)
            {
                return BadRequest("Package ID mismatch.");
            }

            var existingPackage = await _packagesRepo.GetPackageDetails(id);
            if (existingPackage == null)
            {
                return NotFound();
            }

            // Update existing package properties
            existingPackage.PackageName = package.PackageName;
            existingPackage.PackageLocation = package.PackageLocation;
            existingPackage.PackageType = package.PackageType;
            existingPackage.IsActive = package.IsActive;

            existingPackage.OriginalPrice = package.OriginalPrice;
            existingPackage.ActualPrice = package.ActualPrice;
            existingPackage.Days = package.Days;
            existingPackage.Nights = package.Nights;
            existingPackage.IsFixedDeparture = package.IsFixedDeparture;

            if (package.PackageDetails != null)
            {
                // Updating package details
                existingPackage.PackageDetails.PackageDescription = package.PackageDetails.PackageDescription;

                // Updateing itinerary details
                foreach (var detail in package.PackageDetails.ItineraryDetails)
                {
                    var existingDetail = existingPackage.PackageDetails.ItineraryDetails.FirstOrDefault(d => d.ItineraryDetailsId == detail.ItineraryDetailsId);

                    if (existingDetail != null)
                    {
                        existingDetail.ItineraryTitle = detail.ItineraryTitle;
                        existingDetail.ItineraryDescriptions = detail.ItineraryDescriptions
                            .Select(desc => new ItineraryDescription
                            {
                                ItineraryDescriptionId = desc.ItineraryDescriptionId,
                                ItineraryDetailsId = desc.ItineraryDetailsId,
                                ItineraryDetails = desc.ItineraryDetails,
                                ItenaryPoints = desc.ItenaryPoints
                            }).ToList();
                    }
                    else
                    {
                        existingPackage.PackageDetails.ItineraryDetails.Add(new ItineraryDetails
                        {
                            ItineraryDetailsId = detail.ItineraryDetailsId,
                            PackageDetailsId = package.PackageDetails.PackageDetailsId,
                            ItineraryTitle = detail.ItineraryTitle,
                            ItineraryDescriptions = detail.ItineraryDescriptions
                                .Select(desc => new ItineraryDescription
                                {
                                    ItineraryDescriptionId = desc.ItineraryDescriptionId,
                                    ItineraryDetailsId = detail.ItineraryDetailsId,
                                    ItineraryDetails = desc.ItineraryDetails,
                                    ItenaryPoints = desc.ItenaryPoints
                                }).ToList()
                        });
                    }
                }
            }

            try
            {
                await _packagesRepo.EditPackage(existingPackage);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await _packagesRepo.GetPackageDetails(id) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingPackage);
        }
    }
}
