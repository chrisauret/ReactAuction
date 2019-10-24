using Auction.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Services
{
    public class UserService : IUserService
    {
        public async Task<User> Authenticate(string username, string password)
        {
            return await Task.Run(
                () => new User()
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Chris",
                    LastName = "Auret",
                    Email = "chrisauret@gmail.com",
                    Password = "Password1"
                }
            );
        }
    }
}
