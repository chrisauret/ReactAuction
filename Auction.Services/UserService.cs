﻿using Auction.Domain;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Services
{
    public class UserService : IUserService
    {
        List<User> Users = new List<User>();

        public async Task<User> SignUp(User user)
        {
            await Task.Run(() =>
            {
                if (!Users.Exists(x => x.Email == user.Email))
                {
                    user.Id = Guid.NewGuid();
                    Users.Add(user);
                }
            });


            var newUser = Users.AsQueryable().FirstOrDefault(x => x.Email == user.Email);

            // If exists return ?

            return newUser;
        }

        public async Task<User> Authenticate(string email, string password)
        {
            var user = await Task.Run(
                () => new User()
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Chris",
                    LastName = "Auret",
                    Email = "chrisauret@gmail.com",
                    Password = "Password1"
                }
            );

            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("the_secret_is_that_you_can_do_anything_you_want");
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.GivenName, user.FirstName),
                        new Claim(ClaimTypes.Surname, user.LastName)
                }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            user.Password = null;

            return user;
        }
    }
}