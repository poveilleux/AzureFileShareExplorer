using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace AzureFileShareExplorer.Settings
{
    public class StorageSettings : IValidatableObject
    {
        public const string Name = "Storage";

        [Required(ErrorMessage = "The " + Name + "." + nameof(ConnectionString) + " is required.")]
        public string ConnectionString { get; set; } = string.Empty;

        [Required(ErrorMessage = "The " + Name + "." + nameof(ShareName) + " is required.")]
        public string ShareName { get; set; } = string.Empty;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            return Enumerable.Empty<ValidationResult>();
        }
    }
}
