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

        private List<Item> dummyItems;

        public ItemRepository()
        {
            _dbContext = new AuctionContext();

            var dummyImgUrl = "https://loremflickr.com/320/240";

            dummyItems = new List<Item>
            {
                new Item{
                    Id = 123,
                    Description ="Guitar",
                    OwnerId =1,
                    Title ="Fantastic guitar for sale",
                    StartingBid =100,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(3).AddMinutes(18),
                    Bids = new List<Bid>
                    {
                        new Bid()
                        {
                            Amount=110,
                            CreatedOn=DateTime.UtcNow.AddHours(-2),
                            UserId = 3
                        },
                        new Bid()
                        {
                            Amount=120,
                            CreatedOn=DateTime.UtcNow.AddHours(-1),
                            UserId = 5
                        },
                    }
                },
                new Item{
                    Id = 124,
                    Description ="Weber",
                    OwnerId =2,
                    Title ="Weber BBQ for sale",
                    StartingBid =150,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(22).AddMinutes(17)
                },
                new Item{
                    Id = 125,
                    Description ="Ikea Wardrobe",
                    OwnerId =2,
                    Title ="Huge Ikea PAX wardrobe for sale",
                    StartingBid =500,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(9).AddMinutes(41)
                },
                new Item{
                    Id = 126,
                    Description ="Area Rug",
                    OwnerId =2, Title="Handmade area rug for sale",
                    StartingBid =120,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(12).AddMinutes(7)
                },
                new Item{
                    Id = 127,
                    Description ="Guitar",
                    OwnerId =2,
                    Title ="Guitar for sale",
                    StartingBid =80,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(3)
                },
                // Expired Item
                new Item{
                    Id = 128,
                    Description ="Heater",
                    OwnerId =2,
                    Title ="Gas heater for sale",
                    StartingBid =80,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(-3)
                },
                // Expired Item
                new Item{
                    Id = 129,
                    Description ="Dinky Toys",
                    OwnerId =2,
                    Title ="Dinky Toy Cars for sale",
                    StartingBid =80,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(-6)
                },
                // Item Won Already
                new Item{
                    Id = 130,
                    Description ="Dinky Toys",
                    OwnerId =2,
                    Title ="Dinky Toy Cars for sale",
                    StartingBid =80,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(-6),
                    WinnerNotified = true
                }
            };
        }

        public async Task<List<Item>> GetItems()
        {
            return await _dbContext.Items.Where(x => x.Expiry > DateTime.UtcNow && !x.WinnerNotified).ToListAsync();
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