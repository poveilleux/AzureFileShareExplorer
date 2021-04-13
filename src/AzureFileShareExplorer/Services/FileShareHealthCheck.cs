using System;
using System.Threading;
using System.Threading.Tasks;
using Azure.Storage.Files.Shares;
using AzureFileShareExplorer.Settings;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;

namespace AzureFileShareExplorer.Services
{
    public class FileShareHealthCheck : IHealthCheck
    {
        private readonly IOptionsMonitor<StorageSettings> _settings;

        private StorageSettings Settings => _settings.CurrentValue;

        public FileShareHealthCheck(IOptionsMonitor<StorageSettings> settings)
        {
            _settings = settings;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                var shareClient = new ShareClient(Settings.ConnectionString, Settings.ShareName);
                if (await shareClient.ExistsAsync(cancellationToken))
                {
                    return HealthCheckResult.Healthy();
                }

                return HealthCheckResult.Unhealthy("File share does not exist");
            }
            catch (Exception e)
            {
                return HealthCheckResult.Unhealthy(exception: e);
            }
        }
    }
}
