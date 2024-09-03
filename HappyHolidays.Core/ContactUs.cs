﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Core
{
    public class ContactUs
    {
        [Key]
        public int ContactUsId { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Email cannot exceed 50 characters")]
        public string? Email { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "Phone Number cannot exceed 20 digits")]
        public string PhoneNumber { get; set; }

        [StringLength(100, ErrorMessage = "Travel Destination cannot exceed 100 characters")]
        public string? TravelDestination { get; set; }

        public int? noOfPeople { get; set; }

        public DateTime QueryDate { get; set; }

        public DateTime? dateOfTravle { get; set; }

        [Required]
        [StringLength(1000, ErrorMessage = "Your message cannot exceed 1000 characters")]
        public string Message { get; set; }

        [StringLength(1000, ErrorMessage = "Remarks cannot exceed 1000 characters")]
        public string? Remarks { get; set; }

        public StatusEnum Status { get; set; } = StatusEnum.NotAddressed;
    }

    public enum StatusEnum
    {
        [Display(Name = "Not Addressed")]
        NotAddressed = 0,

        [Display(Name = "Addressed")]
        Addressed = 1,

        [Display(Name = "On Hold")]
        OnHold = 2
    }
}
