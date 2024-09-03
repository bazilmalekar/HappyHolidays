using HappyHolidays.Core;
using HappyHolidays.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Infrastructure.interfaces
{
    public interface IContactUsRepo
    {
        public Task<IEnumerable<ContactUs>> GetAllQueries();

        public Task<ContactUs> GetQuery(int id);

        public Task<ContactUs> AddQuery (ContactUsVM contactUsVM);

        public Task<bool> DeleteQuery (int id);

        public Task UpdateQuery(ContactUs contactUs);
    }
}
