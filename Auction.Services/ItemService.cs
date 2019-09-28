﻿using Auction.Domain;
using Auction.Data;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Item> PlaceBidAsync(int itemId, int userId, decimal amount)
        {
            // TODO: Encapsulate each rule below into its own class to be used in a proper validation engine.
            // and return ValidationResult instead of null.

            // Amount must be positive
            if (amount <= 0)
                return null;

            // Fetch the item 
            var item = await _itemRepository.GetItemAsync(itemId);

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

            return  await _itemRepository.PlaceBidAsync(item);
        }
    }
}