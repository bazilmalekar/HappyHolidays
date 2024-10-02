using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Core.Dtos
{
    public class PackageGetVM
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

        [Required]
        public bool IsFixedDeparture { get; set; } = false;

        public string? CardThumbNailImage { get; set; }
    }
}
