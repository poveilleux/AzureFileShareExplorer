using System;

namespace AzureFileShareExplorer.Settings
{
    public class AzureAdSettings
    {
        internal const string Name = "AzureAd";

        public bool Enabled { get; set; }

        public string Authority { get; set; }

        public string ClientId { get; set; }

        public string ClientSecret { get; set; }

        public string ResponseType { get; set; }

        public bool GetClaimsFromUserInfoEndpoint { get; set; }

        public string[] ValidIssuers { get; set; } = Array.Empty<string>();
    }
}
