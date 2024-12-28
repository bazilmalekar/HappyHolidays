using HappyHolidays.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HappyHolidays.Infrastructure.interfaces
{
    public interface IUserService
    {
        Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
    }
}
