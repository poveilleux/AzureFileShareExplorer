# AzureFileShareExplorer
[![Build Status](https://dev.azure.com/poveilleux/AzureFileStorageExplorer/_apis/build/status/poveilleux.AzureFileShareExplorer?branchName=master)](https://dev.azure.com/poveilleux/AzureFileStorageExplorer/_build/latest?definitionId=1&branchName=master)

Easily explore your Azure File shares with the Azure File Share Explorer.

## Build with Docker
To build with Docker, run the following command from the root of the repository:

```
docker build -t azure-file-share-explorer .
```

## Run with Docker
To run with Docker, run the following command:

```
docker run -it -p 5000:80 azure-file-share-explorer
```

To specify the connection string and share name to use, run the following command:

```
docker run -it -p 5000:80 -e Storage__ConnectionString=<your-connection-string> -e Storage__ShareName=<your-share-name> azure-file-share-explorer
```

You can then access the application by opening http://localhost:5000.
