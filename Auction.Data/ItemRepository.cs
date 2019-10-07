using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auction.Domain;
using Microsoft.EntityFrameworkCore;

namespace Auction.Data
{
    public class ItemRepository : IItemRepository
    {
        private AuctionContext _dbContext;

        public ItemRepository()
        {
            _dbContext = new AuctionContext();
            _dbContext.Database.EnsureCreated();
        }

        public async Task<List<Item>> GetItemsAsync()
        {
            return await _dbContext.Items.Where(x => x.Expiry > DateTime.UtcNow && !x.WinnerNotified).ToListAsync();
        }

        public async Task<Item> GetItemAsync(int itemId)
        {
            return await _dbContext.Items.SingleOrDefaultAsync(x => x.Id == itemId);

        }

        public async Task<Item> PlaceBidAsync(Item item)
        {
            var result = await GetItemAsync(item.Id);

            if (result != null)
            {
                result.Bids = item.Bids;
                _dbContext.Entry(result).Collection(x => x.Bids).IsModified = true;
                await _dbContext.SaveChangesAsync();
            }

            return await GetItemAsync(item.Id);
        }
    }
}