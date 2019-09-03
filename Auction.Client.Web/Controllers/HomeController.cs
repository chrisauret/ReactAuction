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
        private IItemRepository _itemRepository;
        private IItemService _itemService;

        public HomeController(IItemRepository itemRepository, IItemService itemService)
        {
            _itemRepository = itemRepository;
            _itemService = itemService;
        }

        [HttpGet("[action]")]
        public IEnumerable<Item> GetItems()
        {
            var items = _itemService.GetItems();

            return items;
        }

        [HttpGet("[action]/id")]
        public Item GetItem(int id)
        {
            var item = _itemService.GetItem(id);

            return item;
        }

        [HttpPut]
        public IActionResult Update(int itemId, int userId, decimal amount)
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
