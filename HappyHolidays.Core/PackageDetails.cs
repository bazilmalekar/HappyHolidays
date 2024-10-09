using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Core
{
    public class PackageDetails
    {
        [Key]
        public int PackageDetailsId { get; set; }

        public int PackageId { get; set; }
        [ForeignKey(nameof(PackageId))]
        public Package Package { get; set; }

        public string? PackageDescription { get; set; }

        public List<byte[]>? PackageImages { get; set; }

        public List<ItineraryDetails>?  ItineraryDetails { get; set; }
    }
}
