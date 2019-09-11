using Auction.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Services
{
    public interface IItemService
    {
        Task<Item> GetItem(int itemId);
        Task<List<Item>> GetItems();
        Task<Item> PlaceBid(int itemId, int userId, decimal amount);
    }
}
