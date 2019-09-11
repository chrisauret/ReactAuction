using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<List<Item>> GetItems()
        {
            var items = await _dbContext.Items.Where(x => x.Expiry > DateTime.UtcNow && !x.WinnerNotified).ToListAsync();

            return items;
        }

        public async Task<Item> GetItem(int itemId)
        {
            return await _dbContext.Items.SingleOrDefaultAsync(x => x.Id == itemId);
        }

        public async Task<Item> UpdateItem(Item item)
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