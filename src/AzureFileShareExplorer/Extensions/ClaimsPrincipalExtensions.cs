using System;
using System.Security.Claims;

namespace AzureFileShareExplorer.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static bool IsAuthenticated(this ClaimsPrincipal principal)
        {
            if (principal is null) throw new ArgumentNullException(nameof(principal));
            return principal.Identity?.IsAuthenticated ?? false;
        }
        public static string GetDisplayName(this ClaimsPrincipal principal)
        {
            if (principal is null) throw new ArgumentNullException(nameof(principal));
            return principal.Identity?.Name ?? string.Empty;
        }
    }
}
