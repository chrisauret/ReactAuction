using System;

namespace Auction.User.Domain
{
    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }

        public Guid Id { get; set; }
    }
}
