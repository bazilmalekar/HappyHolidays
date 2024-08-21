using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;
using HappyHolidays.Infrastructure.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

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
        public async Task<ActionResult<IEnumerable<Package>>> International()
        {
            var IntPackages = await _packagesRepo.GetIntPackages();
            if (IntPackages == null)
            {
                return NotFound("No international packages found");
            }
            return Ok(IntPackages);
        }

        [HttpGet("domestic")]
        public async Task<ActionResult<IEnumerable<Package>>> Domestic()
        {
            var DomPackages = await _packagesRepo.GetDomPackages();
            if (DomPackages == null)
            {
                return NotFound("No international packages found");
            }
            return Ok(DomPackages);
        }

        [HttpGet("honeymoon")]
        public async Task<ActionResult<IEnumerable<Package>>> Honeymoon()
        {
            var honeymoonPackages = await _packagesRepo.GetHoneymoonPackages();
            if (honeymoonPackages == null)
            {
                return NotFound("No international packages found");
            }
            return Ok(honeymoonPackages);
        }

        [HttpGet("details/{id}")]
        public async Task<ActionResult> details(int id)
        {
            var packageDetails = await _packagesRepo.GetPackageDetails(id);

            if (packageDetails == null)
            {
                return NotFound("Package details not found");
            }

            return Ok(packageDetails);
        }

        [HttpPost("CreatePackage")]
        public async Task<ActionResult> CreatePackage([FromBody] PackageVM packageVM)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // returns added package and get the created entity with its ID
            var createdPackage = await _packagesRepo.AddPackage(packageVM);

            // Return a 201 status code
            return CreatedAtAction(
                nameof(details),
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
    }
}
