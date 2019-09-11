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
        private IItemService _itemService;

        public HomeController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Item>> GetItems()
        {
            var items = await _itemService.GetItems();

            return items;
        }

        [HttpGet("[action]/id")]
        public async Task<Item> GetItem(int id)
        {
            var item = await _itemService.GetItem(id);

            return item;
        }

        [HttpPut]
        public IActionResult PlaceBid(int itemId, int userId, decimal amount)
        {
             _itemService.PlaceBid(itemId, userId, amount);
            
            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }
    }
}
