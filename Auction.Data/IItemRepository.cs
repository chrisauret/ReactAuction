using Auction.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auction.Data
{
    public interface IItemRepository
    {
        Task<Item> GetItem(int itemId);
        Task<List<Item>> GetItems();
        Task<Item> UpdateItem(Item item);
    }
}
