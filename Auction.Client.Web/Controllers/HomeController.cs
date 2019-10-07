using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auction.Data;
using Auction.Domain;
using Auction.Services;
using Microsoft.AspNetCore.Mvc;

namespace Auction.Client.Web.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly IItemService _itemService;

        public HomeController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet("GetItems")]
        public async Task<IEnumerable<Item>> GetItemsAsync()
        {
            return await _itemService.GetItemsAsync();
        }

        [HttpGet("GetItem{id}")]
        public async Task<Item> GetItemAsync(int id)
        {
            return await _itemService.GetItemAsync(id);
        }

        [HttpPost("PlaceBid")]
        public async Task<IActionResult> PlaceBidAsync([FromBody] ItemBidRequest request)
        {
            var item = await _itemService.PlaceBidAsync(request.ItemId, request.UserId, request.BidAmount);

            return Json(item);
        }

        public class ItemBidRequest
        {
            public int ItemId { get; set; }
            public int UserId { get; set; }
            public int BidAmount { get; set; }
        }
    }
}