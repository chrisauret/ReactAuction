using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Auction.Domain
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImgUrl { get; set; }
        public DateTime Expiry { get; set; }
        public decimal StartingBid { get; set; }
        public decimal CurrentBid
        {
            get
            {
                if (Bids != null && Bids.Count() > 0)
                {
                    return Bids.Max(x => x.Amount);
                }

                return 0;
            }

        }
        public List<Bid> Bids { get; set; }
        public bool WinnerNotified { get; set; }
    }
}