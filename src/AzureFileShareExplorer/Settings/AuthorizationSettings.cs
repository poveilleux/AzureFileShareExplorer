using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace AzureFileShareExplorer.Settings
{
    public class ClaimSettings
    {
        public string ClaimType { get; set; } = string.Empty;

        public string ClaimValue { get; set; } = string.Empty;
    }

    public class AuthorizationSettings : IValidatableObject
    {
        public const string Name = "Authorization";

        public ClaimSettings[] Claims { get; set; } = Array.Empty<ClaimSettings>();

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (!Claims.Any())
            {
                yield return new ValidationResult($"The {Name}.{nameof(Claims)} must contain at least one element.");
            }

            for (int i = 0; i < Claims.Length; i++)
            {
                if (string.IsNullOrEmpty(Claims[i].ClaimType))
                {
                    yield return new ValidationResult($"The {Name}.{nameof(Claims)}[{i}].{nameof(ClaimSettings.ClaimType)} is required.");
                }

                if (string.IsNullOrEmpty(Claims[i].ClaimValue))
                {
                    yield return new ValidationResult($"The {Name}.{nameof(Claims)}[{i}].{nameof(ClaimSettings.ClaimValue)} is required.");
                }
            }
        }
    }
}
