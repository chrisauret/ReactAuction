using System;
using System.ComponentModel.DataAnnotations;

namespace Auction.Domain
{
    public class Bid
    {
        [Key]
        public int Id{ get; set; }
        public Guid UserId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedOn { get; set; }
        public int ItemId { get; set; }
    }
}