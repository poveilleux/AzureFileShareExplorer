using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AzureFileShareExplorer.Settings
{
    public class OpenIdConnectSettings : OpenIdConnectOptions, IValidatableObject
    {
        internal const string Name = "OpenIdConnect";

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(Authority))
            {
                yield return new ValidationResult($"The {Name}.{nameof(Authority)} is required.");
            }

            if (string.IsNullOrEmpty(ClientId))
            {
                yield return new ValidationResult($"The {Name}.{nameof(ClientId)} is required.");
            }

            if (string.IsNullOrEmpty(ClientSecret))
            {
                yield return new ValidationResult($"The {Name}.{nameof(ClientSecret)} is required.");
            }
        }
    }
}
