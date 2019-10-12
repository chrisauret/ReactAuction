using Auction.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Auction.Data
{
    public class AuctionContext : DbContext
    {
        public DbSet<Item> Items { get; set; }
        public DbSet<Bid> Bids { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("Auction");
                //.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var dummyImgUrl = "https://loremflickr.com/320/240";

            modelBuilder.Entity<Item>(i =>
            {
                i.HasData(new
                {
                    Id = 123,
                    Description = "Guitar",
                    OwnerId = 1,
                    Title = "Fantastic accoustic guitar",
                    StartingBid = 100.0m,
                    ImgUrl = dummyImgUrl,
                    Expiry = DateTime.UtcNow.AddHours(36).AddMinutes(18),
                    WinnerNotified = false
                }); ;

                i.OwnsMany(b => b.Bids).HasData(new
                {
                    Id = 1,
                    ItemId = 123,
                    Amount = 110.0m,
                    CreatedOn = DateTime.UtcNow.AddHours(-2),
                    UserId = 3
                });

                i.OwnsMany(b => b.Bids).HasData(new
                {
                    Id = 2,
                    ItemId = 123,
                    Amount = 145.0m,
                    CreatedOn = DateTime.UtcNow.AddHours(-1),
                    UserId = 3
                });
            });

            modelBuilder.Entity<Item>().HasData(new
            {
                Id = 124,
                Description = "Weber",
                OwnerId = 2,
                Title = "Weber BBQ BabyQ",
                StartingBid = 150m,
                Bid = 165m,
                ImgUrl = dummyImgUrl,
                Expiry = DateTime.UtcNow.AddHours(22).AddMinutes(17),
                WinnerNotified = false
            });

            modelBuilder.Entity<Item>().HasData(new
            {
                Id = 125,
                Description = "Ikea Wardrobe",
                OwnerId = 2,
                Title = "Ikea PAX wardrobe",
                StartingBid = 500m,
                ImgUrl = dummyImgUrl,
                Expiry = DateTime.UtcNow.AddHours(25).AddMinutes(41),
                WinnerNotified = false
            });

            modelBuilder.Entity<Item>().HasData(new
            {
                Id = 126,
                Description = "Area Rug",
                OwnerId = 2,
                Title = "Handmade area rug",
                StartingBid = 120m,
                ImgUrl = dummyImgUrl,
                Expiry = DateTime.UtcNow.AddHours(44).AddMinutes(7),
                WinnerNotified = false
            });

            modelBuilder.Entity<Item>().HasData(new
            {
                Id = 127,
                Description = "Guitar",
                OwnerId = 2,
                Title = "Dishwasher for sale",
                StartingBid = 120m,
                ImgUrl = dummyImgUrl,
                Expiry = DateTime.UtcNow.AddHours(3),
                WinnerNotified = false
            });

            modelBuilder.Entity<Item>().HasData(new
            {
                Id = 128,
                Description = "Heater",
                OwnerId = 2,
                Title = "Gas heater for sale",
                StartingBid = 90m,
                ImgUrl = dummyImgUrl,
                Expiry = DateTime.UtcNow.AddHours(3),
                WinnerNotified = false
            });

            modelBuilder.Entity<Item>().HasData(new
            {
                Id = 129,
                Description = "Dinky Toys",
                OwnerId = 2,
                Title = "Dinky Toy Cars for sale",
                StartingBid = 80m,
                ImgUrl = dummyImgUrl,
                Expiry = DateTime.UtcNow.AddHours(26),
                WinnerNotified = false
            });

            modelBuilder.Entity<Item>().HasData(new
            {
                Id = 130,
                Description = "Dinky Toys",
                OwnerId = 2,
                Title = "Dinky Toy Cars for sale",
                StartingBid = 80m,
                ImgUrl = dummyImgUrl,
                Expiry = DateTime.UtcNow.AddHours(6),
                WinnerNotified = false
            });
        }
    }
}