using System;
using System.Threading;
using System.Threading.Tasks;
using Azure.Storage.Files.Shares;
using AzureFileShareExplorer.Settings;
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

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogDebug("Checking if file share {fileShare} exists...", Settings.ShareName);

                var shareClient = new ShareClient(Settings.ConnectionString, Settings.ShareName);
                if (await shareClient.ExistsAsync(cancellationToken))
                {
                    _logger.LogError("File share {fileShare} does not exist", Settings.ShareName);
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
