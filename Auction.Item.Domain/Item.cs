using System;

namespace Auction.Item.Domain
{
    public class Item
    {
        public Guid OwnerId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string[] ImageUrls { get; set; }

    }
}
