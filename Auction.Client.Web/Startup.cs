using Auction.Client.Web.Hubs;
using Auction.Data;
using Auction.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Auction.Client.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IItemRepository, ItemRepository>();
            services.AddSingleton<IItemService, ItemService> ();

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSignalR();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();

            app.UseSignalR(routes =>
            {
                routes.MapHub<AuctionHub>("/auctionHub");
            });

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });            

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}

//updateTicketElapsedWaitTime() {
//    var newMasterTicketList = Object.assign({}, this.state.masterTicketList);
//    Object.keys(newMasterTicketList).forEach(ticketId => {
//        newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
//    });
//    this.setState({ masterTicketList: newMasterTicketList });
//}

//This won't work
//let objIndex = state.items.findIndex((obj => obj.id === action.payload.id));
//state.items[objIndex] = action.payload;
