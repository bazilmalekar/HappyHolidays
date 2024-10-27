using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Core.Dtos
{
    public class PackageEditVM
    {
        [Required]
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
        public bool IsActive { get; set; }

        public decimal? OriginalPrice { get; set; }

        public decimal? ActualPrice { get; set; }

        public int? Days { get; set; }

        public int? Nights { get; set; }

        [Required]
        public bool IsFixedDeparture { get; set; }

        public IFormFile? CardThumbNailImage { get; set; }

        public PackageDetailsEditVM PackageDetails { get; set; }
    }

    public class PackageDetailsEditVM
    {
        public int PackageDetailsId { get; set; }

        public string? PackageDescription { get; set; }

        public List<IFormFile>? PackageImages { get; set; }

        public List<ItineraryDetailsEditVM>? ItineraryDetails { get; set; }
    }

    public class ItineraryDetailsEditVM
    {
        public int ItineraryDetailsId { get; set; }

        public string? ItineraryTitle { get; set; }

        public List<ItineraryDescriptionEditVM>? ItineraryDescriptions { get; set; }
    }

    public class ItineraryDescriptionEditVM
    {
        public int ItineraryDescriptionId { get; set; }

        public string? ItenaryPoints { get; set; }
    }
}
