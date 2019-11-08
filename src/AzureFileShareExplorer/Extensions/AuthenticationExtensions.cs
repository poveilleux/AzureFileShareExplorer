using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;

namespace AzureFileShareExplorer.Extensions
{
    internal static class AuthenticationExtensions
    {
        internal static void EnforceAuthentication(this IApplicationBuilder app)
        {
            app.Use(async (ctx, next) =>
            {
                if (!ctx.User.Identity.IsAuthenticated)
                {
                    await ctx.ChallengeAsync();
                }
                else
                {
                    await next();
                }
            });
        }
    }
}
