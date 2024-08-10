using HappyHolidays.Core;
using HappyHolidays.Infrastructure.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HappyHolidays.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PackageController: ControllerBase
    {
        private readonly IPackagesRepo _packagesRepo;

        public PackageController(IPackagesRepo packagesRepo)
        {
            _packagesRepo = packagesRepo;
        }

        [HttpGet("international")]
        public async Task<ActionResult<IEnumerable<Package>>> International()
        {
            var IntPackages = await _packagesRepo.GetIntPackages();
            if(IntPackages == null)
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

        [HttpGet("package/{id}")]
        public async Task<Package> Package(int id)
        {
            var packageDetails = await _packagesRepo.GetPackageDetails(id);
            return packageDetails;
        }
    }
}
