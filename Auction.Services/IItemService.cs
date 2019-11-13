using Auction.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Services
{
    public interface IItemService
    {
        Task<Item> GetItemAsync(int itemId);
        Task<List<Item>> GetItemsAsync();
        Task<Item> PlaceBidAsync(int itemId, Guid userId, decimal amount);
    }
}
