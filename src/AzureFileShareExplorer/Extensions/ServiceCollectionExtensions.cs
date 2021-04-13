using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;

namespace AzureFileShareExplorer.Extensions
{
    internal static class ServiceCollectionExtensions
    {
        internal static void ConfigureAndValidate<T>(this IServiceCollection services, IConfiguration configuration, string sectionName)
            where T : class, IValidatableObject, new()
        {
            services.Configure<T>(configuration.GetSection(sectionName));
            services.AddSingleton<IValidatableObject>(provider => provider.GetRequiredService<IOptions<T>>().Value);
        }
    }
}
