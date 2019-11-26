using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace AzureFileShareExplorer
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, builder) => builder
                    .AddJsonFile("appsettings.from-deployment.json", reloadOnChange: true, optional: true)
                    .AddJsonFile("appsettings.from-secret.json", reloadOnChange: true, optional: true)
                )
                .UseStartup<Startup>();
        }
    }
}
