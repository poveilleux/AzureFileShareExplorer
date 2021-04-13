using System;
using System.Collections.Generic;

namespace AzureFileShareExplorer.Settings
{
    public class InvalidConfigurationException : Exception
    {
        public InvalidConfigurationException(ICollection<string> errors)
            :base($"Some configuration are not valid:{Environment.NewLine} {string.Join(Environment.NewLine, errors)}") { }
    }
}
