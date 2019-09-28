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
            using (var db = new AuctionContext())
            {
                return await _dbContext.Items.Where(x => x.Expiry > DateTime.UtcNow && !x.WinnerNotified).ToListAsync();
            }
        }

        public async Task<Item> GetItemAsync(int itemId)
        {
            using (var db = new AuctionContext())
            {
                return await db.Items.SingleOrDefaultAsync(x => x.Id == itemId);
            }
                
        }

        public async Task<Item> PlaceBidAsync(Item item)
        {
            using (var db = new AuctionContext())
            {
                var result = db.Items.SingleOrDefault(x => x.Id == item.Id);
                if (result != null)
                {
                    result.Bids = item.Bids;
                    await db.SaveChangesAsync();
                }

                return result;
            }
        }
    }
}