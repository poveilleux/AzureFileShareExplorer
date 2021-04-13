﻿using AzureFileShareExplorer.Extensions;
using AzureFileShareExplorer.Models;
using AzureFileShareExplorer.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.File;
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

            CloudFileShare cloudFleShare = GetFileShare(StorageSettings.ShareName);

            queryValues ??= string.Empty;

            string[] segments = queryValues.Split('/', StringSplitOptions.RemoveEmptyEntries);

            CloudFileDirectory currentDir = cloudFleShare.GetRootDirectoryReference();
            List<IListFileItem> items = currentDir.ListFilesAndDirectories().ToList();

            for (int i = 0; i < segments.Length; ++i)
            {
                string itemName = segments[i];

                CloudFileDirectory? newDir = items.OfType<CloudFileDirectory>().FirstOrDefault(x => x.Name == itemName);
                if (newDir is null)
                {
                    // We only process the item as a file if it's the last segment.
                    if (i == segments.Length - 1)
                    {
                        CloudFile? file = items.OfType<CloudFile>().FirstOrDefault(x => x.Name == itemName);
                        if (file is null)
                        {
                            return NotFound($"No file or directory {itemName} was not found under {currentDir.Name}");
                        }

                        if (download == true)
                        {
                            Response.Headers.Add(HeaderNames.ContentDisposition, "attachment");
                        }

                        return File(await file.OpenReadAsync(), GetContentType(file), true);
                    }

                    return NotFound($"No directory {itemName} was not found under {currentDir.Name}");
                }

                currentDir = newDir;
                items = currentDir.ListFilesAndDirectories().ToList();
            }

            return Ok(items.Select(Convert)
                .OrderBy(x => x.Type)
                .ThenBy(x => x.Name));
        }

        private CloudFileShare GetFileShare(string shareName)
        {
            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(StorageSettings.ConnectionString);
            CloudFileClient client = cloudStorageAccount.CreateCloudFileClient();
            return client.GetShareReference(shareName);
        }

        private static TreeElementModel Convert(IListFileItem item)
        {
            if (item is CloudFileDirectory directory)
            {
                return TreeElementModel.NewFolder(directory.Name);
            }
            if (item is CloudFile file)
            {
                return TreeElementModel.NewFile(file.Name, GetContentType(file));
            }

            throw new NotSupportedException($"Item type {item.GetType()} is not supported");
        }

        private static string GetContentType(CloudFile file)
        {
            if (!new FileExtensionContentTypeProvider().TryGetContentType(file.Name, out string contentType))
            {
                string extension = Path.GetExtension(file.Name);

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
