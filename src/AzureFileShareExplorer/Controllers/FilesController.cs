using AzureFileShareExplorer.Models;
using AzureFileShareExplorer.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.File;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AzureFileShareExplorer.Controllers
{
    [Route("api")]
    public class FilesController : Controller
    {
        private readonly IOptionsMonitor<StorageSettings> _settings;

        private StorageSettings Settings => _settings.CurrentValue;

        public FilesController(IOptionsMonitor<StorageSettings> settings)
        {
            _settings = settings;
        }

        [HttpGet("{*queryvalues}")]
        public async Task<IActionResult> GetFiles(string queryValues)
        {
            var cloudFleShare = GetFileShare(Settings.ShareName);

            queryValues = queryValues ?? string.Empty;

            var rootDir = cloudFleShare.GetRootDirectoryReference();

            if (string.IsNullOrEmpty(queryValues))
            {
                List<IListFileItem> items = rootDir.ListFilesAndDirectories().ToList();
                return Ok(items.Select(Convert));
            }

            return Ok("Your query was " + queryValues);

            //var applicationLog = testResultDir.GetFileReference("application.log");
            //await applicationLog.DownloadToStreamAsync(Response.Body);
        }

        private CloudFileShare GetFileShare(string shareName)
        {
            var cloudStorageAccount = CloudStorageAccount.Parse(Settings.ConnectionString);
            var cloudFileClient = cloudStorageAccount.CreateCloudFileClient();
            return cloudFileClient.GetShareReference(shareName);
        }

        private static TreeElementModel Convert(IListFileItem item)
        {
            if (item is CloudFileDirectory directory)
            {
                return new TreeElementModel(TreeElementType.Folder, directory.Name);
            }
            else if (item is CloudFile file)
            {
                return new TreeElementModel(TreeElementType.File, file.Name);
            }

            throw new NotSupportedException($"Item type {item.GetType()} is not supported");
        }
    }
}
