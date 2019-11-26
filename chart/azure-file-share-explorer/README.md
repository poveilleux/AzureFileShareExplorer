# azure-file-share-explorer

## Configuration
The following table lists the configurable parameters of the azure-file-share-explorer chart and their default values.

| Parameter | Default | Description |
| --- | --- | --- |
| `secretValues.azureAd.clientId` | none | The client id to use to authenticate with Azure Active Directory |
| `secretValues.azureAd.clientSecret` | none | The client secret to use to authenticate with Azure Active Directory |
| `secretValues.storage.connectionString` | none | Mandatory. The connection string to the Azure Storage account containing your file share. |
| `secretValues.storage.shareName` | none | Mandatory. The name of the file share you want to explore. |
| `appsettings.azureAd.enabled` | `false` | Whether if you want to use Azure Active Directory for authentication or not. |
| `appsettings.azureAd.authority` | none | The authority URI to use to connect with Azure Active Directory. |
| `appsettings.azureAd.getClaimsFromUserInfoEndpoint` | `true` | Whether to get the user claims from UserInfo endpoint or not. |
| `appsettings.azureAd.tokenValidationParameters.validIssuers` | `[]` | The list of valid issuers when validating tokens from Azure Active Directory. |
| `image.repository` | `azure-file-share-explorer` | The container image name. |
| `image.tag` | `0.0.3-beta` | The container image tag. |
| `image.pullPolicy ` | `IfNotPresent` | The container pull policy. |
| `imagePullSecrets` | `[]` | The name of Secret resources containing private registry credentials. |
| `serviceAccount.create` | `true` | Whether to create a ServiceAccount for this deployment or not. |
| `serviceAccount.name` | none | The name of the ServiceAccount to use for this deployment. If not set and `create` is set to `true`, a name will be generated using the fullname template. |
| `service.type` | `ClusterIP` | The Service type to use to expose this deployment. |
| `service.port` | `80` | The port to use for the Service resource. |
| `ingress.enabled` | `false` | Whether to expose this deployment using an Ingress resource or not. |
| `ingress.annotations` | `{}` | The annotations to add to the Ingress resource. |
| `ingress.hosts` | `[]` | The list of hosts allowed by the Ingress resource. |
| `ingress.tls` | `[]` | The Ingress resource configuration for TLS. |
| `resources` | <code>limits:<br>&nbsp;&nbsp;cpu: 100m<br>&nbsp;&nbsp;memory: 128Mi</code> | The deployment resources requests and limits. |
