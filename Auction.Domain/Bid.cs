using System;
using System.Collections.Generic;
using System.Text;

namespace Auction.Domain
{
    public class Bid
    {
        public int Id{ get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
