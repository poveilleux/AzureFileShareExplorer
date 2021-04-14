using System;

namespace AzureFileShareExplorer.Models
{
    public class TreeElementModel
    {
        public TreeElementType Type { get; }

        public string Name { get; }

        public string? ContentType { get; }

        public Uri Uri { get; }

        private TreeElementModel(TreeElementType type, string name, Uri uri, string? contentType = null)
        {
            Type = type;
            Name = name;
            Uri = uri;
            ContentType = contentType;
        }

        public static TreeElementModel NewFolder(string name, Uri uri)
        {
            return new TreeElementModel(TreeElementType.Folder, name, uri);
        }

        public static TreeElementModel NewFile(string name, Uri uri, string contentType)
        {
            return new TreeElementModel(TreeElementType.File, name, uri, contentType);
        }
    }
}
