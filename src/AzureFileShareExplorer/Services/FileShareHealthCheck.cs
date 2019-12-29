using System;
using System.Threading;
using System.Threading.Tasks;
using AzureFileShareExplorer.Settings;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.File;
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

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken ct = default)
        {
            try
            {
                if (!CloudStorageAccount.TryParse(Settings.ConnectionString, out CloudStorageAccount storageAccount))
                {
                    return HealthCheckResult.Unhealthy("Connection string is invalid");
                }

                CloudFileClient client = storageAccount.CreateCloudFileClient();
                CloudFileShare fileShare = client.GetShareReference(Settings.ShareName);

                return await fileShare.ExistsAsync(ct)
                    ? HealthCheckResult.Healthy()
                    : HealthCheckResult.Degraded("File share does not exist");
            }
            catch (Exception e)
            {
                return HealthCheckResult.Unhealthy(exception: e);
            }
        }
    }
}
