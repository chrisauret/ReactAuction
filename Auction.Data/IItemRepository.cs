using Auction.Domain;
using System;
using System.Collections.Generic;

namespace Auction.Data
{
    public interface IItemRepository
    {
        Item GetItem(int itemId);
        List<Item> GetItems();
        Item UpdateItem(Item item);
    }
}
