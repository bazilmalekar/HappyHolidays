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
        [Consumes("multipart/form-data")]
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
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> EditPackage(int id, PackageEditVM package)
        {
            // Check if the package ID in the URL matches the package ID in the request
            if (id != package.PackageId)
            {
                return BadRequest("Package ID mismatch.");
            }

            // Retrieve the existing package details for editing
            var existingPackage = await _packagesRepo.GetPackageDetailsForEdit(id);
            if (existingPackage == null)
            {
                return NotFound("Package not found.");
            }

            // Update primary package properties
            existingPackage.PackageName = package.PackageName;
            existingPackage.PackageLocation = package.PackageLocation;
            existingPackage.PackageType = package.PackageType;
            existingPackage.IsActive = package.IsActive;
            existingPackage.OriginalPrice = package.OriginalPrice;
            existingPackage.ActualPrice = package.ActualPrice;
            existingPackage.Days = package.Days;
            existingPackage.Nights = package.Nights;
            existingPackage.IsFixedDeparture = package.IsFixedDeparture;

            // Update CardThumbNailImage if a new file is provided
            if (package.CardThumbNailImage != null)
            {
                using (var stream = new MemoryStream())
                {
                    await package.CardThumbNailImage.CopyToAsync(stream);
                    existingPackage.CardThumbNailImage = stream.ToArray();
                }
            }

            // Ensure PackageDetails is not null before accessing PackageImages
            if (package.PackageDetails != null)
            {
                // Initialize PackageDetails in existingPackage if it's null
                if (existingPackage.PackageDetails == null)
                {
                    existingPackage.PackageDetails = new PackageDetails();
                }

                if (existingPackage.PackageDetails.PackageImages == null)
                {
                    existingPackage.PackageDetails.PackageImages = new List<byte[]>();
                }

                // Clear existing package images if there are new ones
                if (package.PackageDetails.PackageImages != null && package.PackageDetails.PackageImages.Count > 0)
                {
                    existingPackage.PackageDetails.PackageImages.Clear();
                    foreach (var imageFile in package.PackageDetails.PackageImages)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await imageFile.CopyToAsync(memoryStream);
                            existingPackage.PackageDetails.PackageImages.Add(memoryStream.ToArray());
                        }
                    }
                }

                // Update itinerary details if present
                if (package.PackageDetails.ItineraryDetails != null)
                {
                    foreach (var detail in package.PackageDetails.ItineraryDetails)
                    {
                        var existingDetail = existingPackage.PackageDetails.ItineraryDetails
                            .FirstOrDefault(d => d.ItineraryDetailsId == detail.ItineraryDetailsId);

                        if (existingDetail != null)
                        {
                            existingDetail.ItineraryTitle = detail.ItineraryTitle;

                            // Update itinerary descriptions
                            foreach (var desc in detail.ItineraryDescriptions)
                            {
                                var existingDescription = existingDetail.ItineraryDescriptions
                                    .FirstOrDefault(d => d.ItineraryDescriptionId == desc.ItineraryDescriptionId);

                                if (existingDescription != null)
                                {
                                    existingDescription.ItenaryPoints = desc.ItenaryPoints;
                                }
                                else
                                {
                                    existingDetail.ItineraryDescriptions.Add(new ItineraryDescription
                                    {
                                        ItineraryDescriptionId = desc.ItineraryDescriptionId,
                                        ItenaryPoints = desc.ItenaryPoints
                                    });
                                }
                            }
                        }
                        else
                        {
                            // Add new itinerary detail if not found
                            existingPackage.PackageDetails.ItineraryDetails.Add(new ItineraryDetails
                            {
                                ItineraryDetailsId = detail.ItineraryDetailsId,
                                ItineraryTitle = detail.ItineraryTitle,
                                ItineraryDescriptions = detail.ItineraryDescriptions
                                    .Select(d => new ItineraryDescription
                                    {
                                        ItineraryDescriptionId = d.ItineraryDescriptionId,
                                        ItenaryPoints = d.ItenaryPoints
                                    }).ToList()
                            });
                        }
                    }
                }
            }
            else
            {
                return BadRequest("PackageDetails cannot be null.");
            }

            // Try to save changes to the database
            try
            {
                await _packagesRepo.EditPackage(existingPackage);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await _packagesRepo.GetPackageDetails(id) == null)
                {
                    return NotFound("Package not found during update.");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Package updated successfully");
        }




    }
}
