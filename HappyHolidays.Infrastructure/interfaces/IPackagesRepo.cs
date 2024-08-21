using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;

namespace HappyHolidays.Infrastructure.interfaces
{
    public interface IPackagesRepo
    {
        public Task<IEnumerable<Package>> GetIntPackages();

        public Task<IEnumerable<Package>> GetDomPackages();

        public Task<IEnumerable<Package>> GetHoneymoonPackages();

        public Task<Package> GetPackageDetails(int packageId);

        public Task<IEnumerable<Package>> GetAllPackages();

        public Task<Package> AddPackage(PackageVM packagevm);

        public Task<bool> RemovePackage(int packageId);
    }
}
