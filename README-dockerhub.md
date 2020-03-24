# About this image
This repository contains the containerized version of the [Azure File Share Explorer](https://github.com/poveilleux/AzureFileShareExplorer).

# How to use this image
To run properly, the Azure File Share Explorer requires the connection string to your Azure Storage Account and the name of the Azure File Share to use. This information is provided using two environment variables:
* `Storage__ConnectionString`: the connection string to the Storage Account.
* `Storage__ShareName`: the name of the Azure File Share to explore.

To run the Azure File Share Explorer, use the following command:
```
docker run \
  -p 5000:80
  -e Storage__ConnectionString=<connection-string> \
  -e Storage__ShareName=<share-name> \
  -it azure-file-share-explorer:<tag>
```
You can then access the Azure File Share Explorer at [http://localhost:5000](http://localhost:5000).
