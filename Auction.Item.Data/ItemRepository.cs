using System;
using System.Collections.Generic;
using Auction.Item.Domain;

namespace Auction.Item.Data
{
    public class ItemRepository
    {
        public List<Domain.Item> GetItemsByUserId()
        {
            return new List<Domain.Item>
            {
                new Domain.Item{ Description="Guitar", OwnerId=Guid.NewGuid(), Title="Fantastic guitar for sale", ImageUrls = null },
                new Domain.Item{ Description="Weber", OwnerId=Guid.NewGuid(), Title="Fantastic weber BBQ for sale", ImageUrls = null },
                new Domain.Item{ Description="Ikea Wardrobe", OwnerId=Guid.NewGuid(), Title="Fantastic Ikea PAX wardrobe for sale", ImageUrls = null },
                new Domain.Item{ Description="Area Rug", OwnerId=Guid.NewGuid(), Title="Fantastic handmade area rug for sale", ImageUrls = null },
                new Domain.Item{ Description="Guitar", OwnerId=Guid.NewGuid(), Title="Fantastic guitar for sale", ImageUrls = null }
            };
        }
    }
}
