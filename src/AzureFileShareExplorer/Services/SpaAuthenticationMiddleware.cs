using AzureFileShareExplorer.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzureFileShareExplorer.Services
{
    public static class SpaAuthenticationMiddlewareExtensions
    {
        public static IApplicationBuilder UseSpaAuthentication(this IApplicationBuilder app)
        {
            return app.UseMiddleware<SpaAuthenticationMiddleware>();
        }
    }

    public class SpaAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<SpaAuthenticationMiddleware> _logger;

        public SpaAuthenticationMiddleware(RequestDelegate next, ILogger<SpaAuthenticationMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            _logger.LogDebug($"Invoking {nameof(SpaAuthenticationMiddleware)}");

            if (!context.User.IsAuthenticated())
            {
                _logger.LogInformation("User is not authenticated. Challenging the user...");
                await context.ChallengeAsync();
                return;
            }

            var policyProvider = context.RequestServices.GetRequiredService<IAuthorizationPolicyProvider>();
            var authorizationService = context.RequestServices.GetRequiredService<IAuthorizationService>();

            AuthorizationPolicy defaultPolicy = await policyProvider.GetDefaultPolicyAsync();
            AuthorizationResult authorizeResult = await authorizationService.AuthorizeAsync(context.User, defaultPolicy);

            if (authorizeResult.Succeeded)
            {
                _logger.LogDebug("Authorization is successful.");
                await _next(context);
                return;
            }

            _logger.LogError("Authorization failed: {failedRequirements}", string.Join(',', GetFailedRequirements(authorizeResult)));

            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsync("Forbidden.");
        }

        private IEnumerable<string> GetFailedRequirements(AuthorizationResult authorizeResult)
        {
            if (authorizeResult.Failure is null)
            {
                yield break;
            }

            foreach (IAuthorizationRequirement requirement in authorizeResult.Failure.FailedRequirements)
            {
                yield return requirement.GetType().Name;                
            }
        }
    }
}
