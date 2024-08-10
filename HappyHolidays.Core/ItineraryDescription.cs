using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Core
{
    public class ItineraryDescription
    {
        [Key]
        public int ItineraryDescriptionId { get; set; }

        public int ItineraryDetailsId { get; set; }
        [ForeignKey(nameof(ItineraryDetailsId))]
        public ItineraryDetails ItineraryDetails { get; set; }

        public string? ItenaryPoints { get; set; }
    }
}
