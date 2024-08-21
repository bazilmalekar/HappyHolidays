using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HappyHolidays.Core.Dtos
{
    public class PackageVM
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

        public PackageDetailsVM PackageDetails { get; set; }
    }

    public class PackageDetailsVM
    {
        public string? PackageDescription { get; set; }

        public List<ItineraryDetailsVM>? ItineraryDetails { get; set; }
    }

    public class ItineraryDetailsVM
    {
        public string? ItineraryTitle { get; set; }

        public List<ItineraryDescriptionVM>? ItineraryDescriptions { get; set; }
    }

    public class ItineraryDescriptionVM
    {
        public string? ItineraryPoints { get; set; }
    }
}
