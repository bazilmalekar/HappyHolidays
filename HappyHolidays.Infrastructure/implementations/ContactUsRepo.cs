using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;
using HappyHolidays.Infrastructure.interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Infrastructure.implementations
{
    public class ContactUsRepo : IContactUsRepo
    {
        private readonly ApplicationDbContext _context;

        public ContactUsRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ContactUs>> GetAllQueries()
        {
            return await _context.ContactUs.ToListAsync();
        }

        public async Task<ContactUs> GetQuery(int id)
        {
            var query = await _context.ContactUs.FirstOrDefaultAsync(s => s.ContactUsId == id);
            return query;
        }

        public async Task<ContactUs> AddQuery(ContactUsVM contactUsVM)
        {
            var message = new ContactUs
            {
                Name = contactUsVM.Name,
                Email = contactUsVM.Email,
                PhoneNumber = contactUsVM.PhoneNumber,
                TravelDestination = contactUsVM.TravelDestination,
                noOfPeople = contactUsVM.noOfPeople,
                QueryDate = DateTime.Now,
                dateOfTravle = contactUsVM.dateOfTravle,
                Message = contactUsVM.Message,
                Remarks = contactUsVM.Remarks,
            };

            await _context.ContactUs.AddAsync(message);
            await Save();
            return message;
        }

        public async Task<bool> DeleteQuery(int id)
        {
            try
            {
                var deleteContact = await _context.ContactUs.FirstOrDefaultAsync(s => s.ContactUsId == id);
                if (deleteContact == null) {
                    return false;
                }

                _context.ContactUs.Remove(deleteContact);
                await Save();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task UpdateQuery(ContactUs contactUs)
        {
            _context.ContactUs.Update(contactUs);
            await Save();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
