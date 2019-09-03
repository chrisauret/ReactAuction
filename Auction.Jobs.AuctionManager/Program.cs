using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Auction.Jobs.AuctionManager
{
    class Program
    {
        static void Main(string[] args)
        {
            var services = new ServiceCollection();
            ConfigureServices(services);

            var serviceProvider = services.BuildServiceProvider();
            var job = serviceProvider.GetService<INotifyWinnersJob>();

            while (true)
            {
                job.Execute();
            }
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<NotifyWinnersJob, NotifyWinnersJob>();
        }
    }
}
