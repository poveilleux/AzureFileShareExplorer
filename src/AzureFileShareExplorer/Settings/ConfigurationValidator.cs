using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace AzureFileShareExplorer.Settings
{
    public class ConfigurationValidator : IStartupFilter
    {
        private readonly IEnumerable<IValidatableObject> _validatableConfigurations;

        public ConfigurationValidator(IEnumerable<IValidatableObject> validatableConfigurations)
        {
            _validatableConfigurations = validatableConfigurations;
        }

        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
        {
            var errorMessages = new List<string>();

            foreach (var validatableConfiguration in _validatableConfigurations)
            {
                var context = new ValidationContext(validatableConfiguration, serviceProvider: null, items: null);
                var results = new List<ValidationResult>();

                Validator.TryValidateObject(validatableConfiguration, context, results, true);

                errorMessages.AddRange(results.Select(x => x.ErrorMessage ?? string.Empty));
            }

            if (errorMessages.Any())
            {
                throw new InvalidConfigurationException(errorMessages);
            }

            return next;
        }
    }
}
