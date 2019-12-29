using System.Threading;
using System.Threading.Tasks;
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

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            return Task.FromResult(HealthCheckResult.Healthy());
        }
    }
}
