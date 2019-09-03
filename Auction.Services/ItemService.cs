using Auction.Domain;
using Auction.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auction.Services
{
    public class ItemService : IItemService
    {
        private IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public Item GetItem(int itemId)
        {
            return _itemRepository.GetItem(itemId);
        }

        public List<Item> GetItems()
        {
            return _itemRepository.GetItems();
        }

        public Item PlaceBid(int itemId, int userId, decimal amount)
        {
            // TODO: Encapsulate each rule below into its own class to be used in a proper validation engine.

            // Amount must be positive
            if (amount <= 0)
                return null;

            // Fetch the item 
            var item = _itemRepository.GetItem(itemId);

            // Item owner cannot place bid
            if (item.OwnerId == userId)
                return null;

            if (item.Bids != null && item.Bids.Count() > 0)
            {
                var lastBid = item.Bids[item.Bids.Count() - 1];

                // Bid must be higher that last bid
                if (amount <= lastBid.Amount)
                {
                    return null;
                }

                // Cannot place 2 bids in a row
                if (userId == lastBid.UserId)
                {
                    return null;
                }
            }

            // Cannot bid on an expired item
            if (item.Expiry <= DateTime.UtcNow)
            {
                return null;
            }

            var newBid = new Bid()
            {
                UserId = userId,
                Amount = amount,
                CreatedOn = DateTime.UtcNow
            };

            item.Bids.Add(newBid);

            var updatedItem = _itemRepository.UpdateItem(item);

            return updatedItem;
        }
    }
}