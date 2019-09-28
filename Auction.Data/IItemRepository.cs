using Auction.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auction.Data
{
    public interface IItemRepository
    {
        Task<Item> GetItemAsync(int itemId);
        Task<List<Item>> GetItemsAsync();
        Task<Item> PlaceBidAsync(Item item);
    }
}
