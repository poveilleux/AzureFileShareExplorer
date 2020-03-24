# AzureFileShareExplorer [![Build Status](https://dev.azure.com/poveilleux/AzureFileStorageExplorer/_apis/build/status/poveilleux.AzureFileShareExplorer?branchName=master)](https://dev.azure.com/poveilleux/AzureFileStorageExplorer/_build/latest?definitionId=1&branchName=master)

Easily explore your Azure File shares with the Azure File Share Explorer.

The Docker image is available on [Docker Hub](https://hub.docker.com/repository/docker/poveilleux/azure-file-share-explorer).

## Install
1. [Install .NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1), if not already installed

2. [Install node](https://nodejs.org/en/), if not already installed. This application has been tested with Node 10.16.0 and npm 6.9.0

3. Clone this repository
   ```
   git clone https://github.com/poveilleux/AzureFileShareExplorer.git
   ```

## Running
1. Open using Visual Studio 2019 (Visual Studio Code support coming soon!)

2. Before running for the first time, you will need to edit the [user secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.0&tabs=windows) of the AzureFileShareExplorer project. You can use either of the following formats
   ```json
   {
     "Storage": {
	   "ConnectionString": "",
	   "ShareName": ""
	 }
   }
   ```
   or
   ```json
   {
     "Storage:ConnectionString": "",
     "Storage:ShareName": ""
   }
   ```
   Alternatively, you can also run the following commands from the `src/AzureFileShareExplorer` directory
   ```sh
   dotnet user-secrets set "Storage:ConnectionString" "<connection-string>"
   dotnet user-secrets set "Storage:ShareName" "<share-name>"
   ```

## Build and run with Docker
1. To build with Docker, run the following command from the root of the repository:

   ```
   docker build -t azure-file-share-explorer .
   ```

2. To run with Docker, use the following command:

   ```
   docker run \
     -p 5000:80 \
     -e Storage__ConnectionString=<connection-string> \
     -e Storage__ShareName=<share-name> \
     -it azure-file-share-explorer
   ```
   
   You can then access the application at http://localhost:5000.

## Deploy to Kubernetes using Helm
To deploy to Kubernetes using Helm, look at [this documentation](./chart/azure-file-share-explorer)

## Use Azure Active Directory to secure the Azure File Share Explorer
To use Azure Active Directory with the Azure File Share Explorer, you need to [register the application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) with Azure AD. After registering the application, you will need to add `https://<host>/signin-oidc` as a redirect URI for the application to function properly. Also, you will need to generate a client secret in order to authenticate with Azure AD.
