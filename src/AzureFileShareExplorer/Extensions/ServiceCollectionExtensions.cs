using AzureFileShareExplorer.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;

namespace AzureFileShareExplorer.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureAndValidate<T>(this IServiceCollection services, IConfiguration configuration, string sectionName)
            where T : class, IValidatableObject, new()
        {
            services.Configure<StorageSettings>(configuration.GetSection(sectionName));
            services.AddSingleton<IValidatableObject>(provider => provider.GetRequiredService<IOptions<T>>().Value);
        }
    }
}
