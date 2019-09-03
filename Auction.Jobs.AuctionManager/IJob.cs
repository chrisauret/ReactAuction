using System;
using System.Collections.Generic;
using System.Text;

namespace Auction.Jobs.AuctionManager
{
    public interface IJob
    {
        void Execute();
    }
}
