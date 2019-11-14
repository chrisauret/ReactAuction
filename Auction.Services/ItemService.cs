using Auction.Domain;
using Auction.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auction.Services
{
    public class ItemService : IItemService
    {
        private IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<Item> GetItemAsync(int itemId)
        {
            return await _itemRepository.GetItemAsync(itemId);
        }

        public async Task<List<Item>> GetItemsAsync()
        {
            return await _itemRepository.GetItemsAsync();
        }

        public async Task<Item> PlaceBidAsync(int itemId, Guid userId, decimal amount)
        {
            // TODO: Encapsulate each rule below into its own class to be used in a proper validation engine.
            // and return ValidationResult instead of null.

            // Amount must be positive
            if (amount <= 0)
                return null;

            // Fetch the item 
            var item = await _itemRepository.GetItemAsync(itemId);

            var errros = new List<string>();

            //// Item owner cannot place bid
            if (item.OwnerId == userId)
            {
                errros.Add("Cannot bid on own item");
            }

            //if (item.Bids != null && item.Bids.Count() > 0)
            //{
            //    var lastBid = item.Bids[item.Bids.Count() - 1];

            //    // Bid must be higher that last bid
            //    if (amount <= lastBid.Amount)
            //    {
            //        return null;
            //    }

            //    // Cannot place 2 bids in a row
            //    if (userId == lastBid.UserId)
            //    {
            //        return null;
            //    }
            //}

            // Cannot bid on an expired item
            if (item.Expiry <= DateTime.UtcNow)
            {
                errros.Add("Cannot bid on expired item");
            }

            var newBid = new Bid()
            {
                UserId = userId,
                Amount = amount,
                CreatedOn = DateTime.UtcNow
            };

            item.Bids.Add(newBid);

            try
            {
                var updatedItem = await _itemRepository.PlaceBidAsync(item);

                return updatedItem;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return null;
        }
    }
}