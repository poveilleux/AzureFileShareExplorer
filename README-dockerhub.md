# AzureFileShareExplorer
Easily explore your Azure File shares with the Azure File Share Explorer.

## Running with Docker
To run with Docker, use the following command:

   ```
   docker run \
     -p 5000:80 \
     -e Storage__ConnectionString=<connection-string> \
     -e Storage__ShareName=<share-name> \
     -it azure-file-share-explorer
   ```
   
You can then access the application at http://localhost:5000.
