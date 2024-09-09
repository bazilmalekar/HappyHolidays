using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;
using HappyHolidays.Infrastructure.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HappyHolidays.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactUsController : ControllerBase
    {
        private readonly IContactUsRepo _contactUs;

        public ContactUsController(IContactUsRepo contactUs)
        {
            _contactUs = contactUs;
        }

        [HttpGet("GetAllMessages")]
        public async Task<IEnumerable<ContactUs>> GetAllMessages()
        {
            return await _contactUs.GetAllQueries();
        }

        [HttpGet("GetMessage/{id}")]
        public async Task<IActionResult> GetMessage(int id)
        {
            var message = await _contactUs.GetQuery(id);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }

        [HttpPost]
        public async Task<IActionResult> AddMessage(ContactUsVM contactUsVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedMessage = await _contactUs.AddQuery(contactUsVM);

            return CreatedAtAction(
                nameof(GetMessage),
                new { id = addedMessage.ContactUsId },
                addedMessage
            );
        }

        [HttpDelete("DeleteContact/{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            try
            {
                var deleteContact = await _contactUs.DeleteQuery(id);
                if (deleteContact)
                {
                    return Ok(new { Message = "Package successfully deleted." });
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPut("EditContact/{id}")]
        public async Task<IActionResult> EditContact(int id, [FromBody] ContactUs contactUs)
        {

            if (id != contactUs.ContactUsId)
            {
                return BadRequest();
            }

            try
            {
                var existingContact = await _contactUs.GetQuery(id);
                if (existingContact == null)
                {
                    return NotFound();
                }

                existingContact.Name = contactUs.Name;
                existingContact.Email = contactUs.Email;
                existingContact.PhoneNumber = contactUs.PhoneNumber;
                existingContact.TravelDestination = contactUs.TravelDestination;
                existingContact.noOfPeople = contactUs.noOfPeople;
                existingContact.QueryDate = contactUs.QueryDate;
                existingContact.dateOfTravle = contactUs.dateOfTravle;
                existingContact.Message = contactUs.Message;
                existingContact.Remarks = contactUs.Remarks;
                existingContact.Status = contactUs.Status;
                await _contactUs.UpdateQuery(existingContact);
                return Ok(existingContact);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
