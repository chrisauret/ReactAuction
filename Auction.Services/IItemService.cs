using Auction.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Auction.Services
{
    public interface IItemService
    {
        Item GetItem(int itemId);
        List<Item> GetItems();
        Item PlaceBid(int itemId, int userId, decimal amount);
    }
}
