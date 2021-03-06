﻿using Auction.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Services
{
    public interface IUserService
    {
        Task<User> SignUp(User user);
        Task<User> SignIn(string email, string password);
        Task<User> ResetPassword(string email);
    }
}
