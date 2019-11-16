using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace AzureFileShareExplorer.Settings
{
    public class AzureAdSettings : OpenIdConnectOptions
    {
        internal const string Name = "AzureAd";

        public bool Enabled { get; set; }
    }
}
