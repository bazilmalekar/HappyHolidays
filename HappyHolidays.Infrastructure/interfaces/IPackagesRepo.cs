using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;
using Microsoft.AspNetCore.Http;

namespace HappyHolidays.Infrastructure.interfaces
{
    public interface IPackagesRepo
    {
        public Task<IEnumerable<PackageGetVM>> GetIntPackages();

        public Task<IEnumerable<PackageGetVM>> GetDomPackages();

        public Task<IEnumerable<PackageGetVM>> GetHoneymoonPackages();

        public Task<PackageDetailsGetVM> GetPackageDetails(int packageId);

        public Task<IEnumerable<Package>> GetAllPackages();

        public Task<Package> AddPackage(PackageVM packagevm);

        public Task<bool> RemovePackage(int packageId);

        public Task EditPackage(PackageVM package);
    }
}
