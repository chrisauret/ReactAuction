using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Auction.Domain
{
    public class Bid
    {
        [Key]
        public int Id{ get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedOn { get; set; }

        public int ItemId { get; set; }
    }
}
