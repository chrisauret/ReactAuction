using Auction.Domain;
using NUnit.Framework;
using System;
using Moq;
using Auction.Services;
using Auction.Data;
using System.Linq;

namespace Tests
{
    public class AuctionTests
    {
        [SetUp]
        public void Setup()
        {
        }

        private readonly IItemService _itemService = new ItemService(new ItemRepository());


        [Test]
        public void ShouldOnlyShowActiveItems()
        {
            // Arrange
            var itemService = new ItemService(new ItemRepository());
            // Act
            var items = itemService.GetItemsAsync().GetAwaiter().GetResult();
            // Assert  ( 5 open auction items in test data )
            Assert.AreEqual(items.Count(), 5);
        }

        [Test]
        public void ShouldNotAllowBidOnExpiredItem()
        {
            // Arrange
            var itemService = new ItemService(new ItemRepository());
            var itemId = 128;
            var userId = 901;
            var amount = 280;
            // Act
            var item = itemService.PlaceBidAsync(itemId, userId, amount);
            // Assert
            Assert.IsNull(item);
        }

        [Test]
        public void ShouldNotAllowBidToBeLowerThanLastBid()
        {
            // Arrange
            var itemService = new ItemService(new ItemRepository());
            var itemId = 123;
            var userId = 4;
            var amount = 5;
            // Act
            var item =  itemService.PlaceBidAsync(itemId, userId, amount);
            // Assert
            Assert.IsNull(item);
        }

        [Test]
        public void ShouldNotAllowOwnerToBidOnItem()
        {
            // Arrange
            var itemService = new ItemService(new ItemRepository());
            var itemId = 124;
            var userId = 2; // Same as OwnerId
            var amount = 280;
            // Act
            var item = itemService.PlaceBidAsync(itemId, userId, amount);
            // Assert
            Assert.IsNull(item);
        }

        [Test]
        public void ShouldNotAllowSameUserToBidTwiceInARow()
        {
            // Arrange
            var itemService = new ItemService(new ItemRepository());
            var itemId = 123;
            var userId = 5; // Same as last bid
            var amount = 280;
            // Act
            var item = itemService.PlaceBidAsync(itemId, userId, amount);
            // Assert
            Assert.IsNull(item);
        }

        [Test]
        public void ShouldNotAllowNegativeAmount()
        {
            // Arrange
            var itemService = new ItemService(new ItemRepository());
            var itemId = 123;
            var userId = 5; // Same as last bid
            var amount = -280;
            // Act
            var item = itemService.PlaceBidAsync(itemId, userId, amount);
            // Assert
            Assert.IsNull(item);
        }

        public void ShouldSendEmailToWinningBid()
        {
            // Todo. Part of Jobs.Test
        }

        public void ShouldHaveAtLeastOneBid()
        {
            // Todo. Part of Jobs.Test
        }
    }
}