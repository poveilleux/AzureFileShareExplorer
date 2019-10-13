namespace AzureFileShareExplorer.Models
{
    public class TreeElementModel
    {
        public TreeElementType Type { get; }

        public string Name { get; }

        public string ContentType { get; }

        private TreeElementModel(TreeElementType type, string name, string contentType = null)
        {
            Type = type;
            Name = name;
            ContentType = contentType;
        }

        public static TreeElementModel NewFolder(string name)
        {
            return new TreeElementModel(TreeElementType.Folder, name);
        }

        public static TreeElementModel NewFile(string name, string contentType)
        {
            return new TreeElementModel(TreeElementType.File, name, contentType);
        }
    }
}
