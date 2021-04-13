using AzureFileShareExplorer.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AzureFileShareExplorer.Authorization
{
    public class HasClaimRequirement : IAuthorizationRequirement { }

    public class HasClaimHandler : AuthorizationHandler<HasClaimRequirement>
    {
        private readonly ILogger<HasClaimHandler> _logger;

        private readonly IOptionsMonitor<AuthorizationSettings> _settings;

        private AuthorizationSettings Settings => _settings.CurrentValue;

        public HasClaimHandler(IOptionsMonitor<AuthorizationSettings> settings, ILogger<HasClaimHandler> logger)
        {
            _settings = settings;
            _logger = logger;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasClaimRequirement requirement)
        {
            foreach (ClaimSettings claimSetting in Settings.Claims)
            {
                Claim? claim = context.User.FindFirst(claimSetting.ClaimType);
                if (claim is not null)
                {
                    bool hasClaim = string.Equals(claim.Value, claimSetting.ClaimValue, StringComparison.Ordinal);
                    if (hasClaim)
                    {
                        _logger.LogDebug("User has {claimType} claim and expected value. {requirement} requirement is fulfilled.",
                            claimSetting.ClaimType, nameof(HasClaimRequirement));
                        context.Succeed(requirement);
                    }
                    else
                    {
                        _logger.LogInformation("User has {claimType} claim, but value does not match.", claimSetting.ClaimType);
                    }
                }
                else
                {
                    _logger.LogInformation("User does not have {claimType} claim.", claimSetting.ClaimType);
                }
            }

            _logger.LogInformation("No claim matched. {requirement} requirement is not fulfilled.", nameof(HasClaimRequirement));
            return Task.CompletedTask;
        }
    }
}
