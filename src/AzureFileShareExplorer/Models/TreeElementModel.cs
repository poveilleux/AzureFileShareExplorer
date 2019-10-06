namespace AzureFileShareExplorer.Models
{
    public class TreeElementModel
    {
        public TreeElementType Type { get; }

        public string Name { get; }

        public TreeElementModel(TreeElementType type, string name)
        {
            Type = type;
            Name = name;
        }
    }
}
