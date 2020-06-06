using System;
using System.Threading;
using System.Threading.Tasks;
using AzureFileShareExplorer.Settings;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.File;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AzureFileShareExplorer.Services
{
    public class FileShareHealthCheck : IHealthCheck
    {
        private ILogger<FileShareHealthCheck> _logger;
        
        private readonly IOptionsMonitor<StorageSettings> _settings;

        private StorageSettings Settings => _settings.CurrentValue;

        public FileShareHealthCheck(IOptionsMonitor<StorageSettings> settings, ILogger<FileShareHealthCheck> logger)
        {
            _settings = settings;
            _logger = logger;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken ct = default)
        {
            try
            {
                if (!CloudStorageAccount.TryParse(Settings.ConnectionString, out CloudStorageAccount storageAccount))
                {
                    _logger.LogError("Connection string is invalid");
                    return HealthCheckResult.Unhealthy();
                }

                CloudFileClient client = storageAccount.CreateCloudFileClient();
                CloudFileShare fileShare = client.GetShareReference(Settings.ShareName);

                if (!await fileShare.ExistsAsync(ct))
                {
                    _logger.LogError("File share does not exist");
                    return HealthCheckResult.Unhealthy();
                }

                return HealthCheckResult.Healthy();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An unhandled exception occurred performing the file share health check");
                return HealthCheckResult.Unhealthy(exception: e);
            }
        }
    }
}
