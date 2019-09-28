namespace AzureFileShareExplorer.Settings
{
    public class StorageSettings
    {
        public const string SectionName = "Storage";

        public string ConnectionString { get; set; }

        public string ShareName { get; set; }
    }
}
