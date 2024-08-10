using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace HappyHolidays.Core
{
    public class Package
    {
        [Key]
        public int PackageId { get; set; }

        [Required]
        [StringLength(100)]
        public string PackageName { get; set; }

        [Required]
        [StringLength(100)]
        public string PackageLocation { get; set; }

        [Required]
        public PackageTypes PackageType { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        public decimal? OriginalPrice { get; set; }

        public decimal? ActualPrice { get; set; }

        public int? Days { get; set; }

        public int? Nights { get; set; }

        public PackageDetails PackageDetails { get; set; }    
    }

    public enum PackageTypes
    {
        International = 0,
        Domestic = 1,
        Honeymoon = 2
    }
}