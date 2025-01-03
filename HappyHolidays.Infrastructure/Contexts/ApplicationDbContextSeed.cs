﻿using HappyHolidays.Core;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HappyHolidays.Infrastructure.Constants;

namespace HappyHolidays.Infrastructure.Contexts
{
    public class ApplicationDbContextSeed
    {
        public static async Task SeedEssentialsAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            //Seed Roles
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Administrator.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.Moderator.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Authorization.Roles.User.ToString()));

            //Seed Default User
            var defaultUser = new ApplicationUser { UserName = Authorization.default_username, Email = Authorization.default_email, EmailConfirmed = true, PhoneNumberConfirmed = true };

            //if (userManager.Users.All(u => u.Id != defaultUser.Id))
            //{
            //    await userManager.CreateAsync(defaultUser, Authorization.default_password);
            //    await userManager.AddToRoleAsync(defaultUser, Authorization.default_role.ToString());
            //}

            if (defaultUser != null)
            {
                defaultUser = new ApplicationUser
                {
                    UserName = Authorization.default_username,
                    Email = Authorization.default_email,
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true
                };

                var result = await userManager.CreateAsync(defaultUser, Authorization.default_password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(defaultUser, Authorization.default_role.ToString());
                    Console.WriteLine("Default user created successfully.");
                }
                else
                {
                    Console.WriteLine("Failed to create default user:");
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"- {error.Code}: {error.Description}");
                    }
                }
            }
        }
    }

}
