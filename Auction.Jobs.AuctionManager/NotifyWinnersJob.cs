using Auction.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Linq;

namespace Auction.Jobs.AuctionManager
{
    // .Net Core 3.0 has a new WorkerService which would be ideal for this kind of background service :)
    // https://devblogs.microsoft.com/aspnet/net-core-workers-as-windows-services/

    public class NotifyWinnersJob : IJob
    {
        private readonly IItemService _itemService;

        public NotifyWinnersJob(IItemService itemService)
        {
            _itemService = itemService;
        }

        public void Execute()
        {
            //  Run job every second
            var waitTime = 1 * 60000;
            Thread.Sleep(waitTime);
        }

        public void EmailBidWinners()
        {
            var items = _itemService.GetItemsAsync().GetAwaiter().GetResult().Where(x => !x.WinnerNotified && DateTime.UtcNow > x.Expiry && x.Bids.Count > 0);

            foreach (var item in items)
            {
                // Build email model for each item

                // Send notification email to winning user using 3rd party like SendGrid

                // Update item WinnerNotified = true;
            }
        }
    }
}
