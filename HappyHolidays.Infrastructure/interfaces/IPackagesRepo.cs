using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HappyHolidays.Core;

namespace HappyHolidays.Infrastructure.interfaces
{
    public interface IPackagesRepo
    {
        Task<IEnumerable<Package>> GetIntPackages();

        Task<IEnumerable<Package>> GetDomPackages();

        Task<IEnumerable<Package>> GetHoneymoonPackages();

        Task<Package> GetPackageDetails(int packageId);
    }
}
