using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Core
{
    public class ItineraryDetails
    {
        [Key]
        public int ItineraryDetailsId {  get; set; }

        public int PackageDetailsId { get; set; }
        [ForeignKey(nameof(PackageDetailsId))]
        public PackageDetails PackageDetails { get; set; }

        public string? ItineraryTitle { get; set; }

        public List<ItineraryDescription>? ItineraryDescriptions { get; set; }
    }
}
