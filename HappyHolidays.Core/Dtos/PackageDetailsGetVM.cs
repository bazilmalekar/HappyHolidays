using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace HappyHolidays.Core.Dtos
{
    public class PackageDetailsGetVM
    {
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

        public GetPackageDetailsVM PackageDetails { get; set; }
    }

    public class GetPackageDetailsVM
    {
        public string? PackageDescription { get; set; }

        public List<string>? PackageImages { get; set; }

        public List<GetItineraryDetailsVM>? ItineraryDetails { get; set; }
    }

    public class GetItineraryDetailsVM
    {
        public string? ItineraryTitle { get; set; }

        public List<GetItineraryDescriptionVM>? ItineraryDescriptions { get; set; }
    }

    public class GetItineraryDescriptionVM
    {
        public string? ItineraryPoints { get; set; }
    }
}
