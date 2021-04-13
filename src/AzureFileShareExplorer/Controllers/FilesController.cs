using Azure.Storage.Files.Shares;
using Azure.Storage.Files.Shares.Models;
using AzureFileShareExplorer.Extensions;
using AzureFileShareExplorer.Models;
using AzureFileShareExplorer.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace AzureFileShareExplorer.Controllers
{
    [Authorize]
    [Route("api")]
    public class FilesController : Controller
    {
        private readonly IOptionsMonitor<StorageSettings> _storageSettings;

        private StorageSettings StorageSettings => _storageSettings.CurrentValue;

        public FilesController(IOptionsMonitor<StorageSettings> storageSettings)
        {
            _storageSettings = storageSettings;
        }

        [HttpGet("{*queryvalues}")]
        public async Task<IActionResult> GetFiles(string queryValues, [FromQuery] bool? download)
        {
            if (!User.IsAuthenticated())
            {
                return Unauthorized();
            }

            var shareClient = new ShareClient(StorageSettings.ConnectionString, StorageSettings.ShareName);

            queryValues ??= string.Empty;

            string[] segments = queryValues.Split('/', StringSplitOptions.RemoveEmptyEntries);

            ShareDirectoryClient currentDir = shareClient.GetRootDirectoryClient();
            List<ShareFileItem> items = await currentDir.GetFilesAndDirectoriesAsync().ToListAsync();

            for (int i = 0; i < segments.Length; ++i)
            {
                string itemName = segments[i];

                ShareFileItem? newDir = items.FirstOrDefault(x => x.Name == itemName && x.IsDirectory);
                if (newDir is null)
                {
                    // We only process the item as a file if it's the last segment.
                    if (i == segments.Length - 1)
                    {
                        ShareFileItem? file = items.FirstOrDefault(x => x.Name == itemName && !x.IsDirectory);
                        if (file is null)
                        {
                            return NotFound($"No file or directory {itemName} was not found under {currentDir.Name}");
                        }

                        if (download == true)
                        {
                            Response.Headers.Add(HeaderNames.ContentDisposition, "attachment");
                        }

                        ShareFileClient fileClient = currentDir.GetFileClient(file.Name);
                        return File(await fileClient.OpenReadAsync(), GetContentType(file.Name), true);
                    }

                    return NotFound($"No directory {itemName} was not found under {currentDir.Name}");
                }

                currentDir = currentDir.GetSubdirectoryClient(newDir.Name);
                items = await currentDir.GetFilesAndDirectoriesAsync().ToListAsync();
            }

            return Ok(items.Select(Convert)
                .OrderBy(x => x.Type)
                .ThenBy(x => x.Name));
        }

        private static TreeElementModel Convert(ShareFileItem item)
        {
            return item.IsDirectory
                ? TreeElementModel.NewFolder(item.Name)
                : TreeElementModel.NewFile(item.Name, GetContentType(item.Name));
        }

        private static string GetContentType(string fileName)
        {
            if (!new FileExtensionContentTypeProvider().TryGetContentType(fileName, out string contentType))
            {
                string extension = Path.GetExtension(fileName);

                switch (extension)
                {
                    case ".log":
                        contentType = "application/log";
                        break;
                }
            }

            return contentType ?? MediaTypeNames.Application.Octet;
        }
    }
}
