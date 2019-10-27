using Microsoft.Azure.Storage;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AzureFileShareExplorer.Settings
{
    public class StorageSettings : IValidatableObject
    {
        public const string Name = "Storage";

        [Required(ErrorMessage = "The " + Name + "." + nameof(ConnectionString) + " is required.")]
        public string ConnectionString { get; set; }

        [Required(ErrorMessage = "The " + Name + "." + nameof(ShareName) + " is required.")]
        public string ShareName { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (!CloudStorageAccount.TryParse(ConnectionString, out _))
            {
                yield return new ValidationResult($"The {Name}.{nameof(ConnectionString)} has an invalid value.");
            }
        }
    }
}
