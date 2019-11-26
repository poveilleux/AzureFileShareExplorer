# azure-file-share-explorer

## Configuration
The following table lists the configurable parameters of the azure-file-share-explorer chart and their default values.

| Parameter | Default | Description |
| --- | --- | --- |
| `secretValues.storage.connectionString` | none | Mandatory. Connection string to the Azure Storage account containing your file share. |
| `secretValues.storage.shareName` | none | Mandatory. Name of the file share you want to explore. |
| `secretValues.azureAd.clientId` | none | Client ID to use to authenticate with Azure Active Directory |
| `secretValues.azureAd.clientSecret` | none | Client secret to use to authenticate with Azure Active Directory |
| `appsettings.azureAd.enabled` | `false` | Whether if you want to use Azure Active Directory for authentication or not. |
| `appsettings.azureAd.authority` | none | Authority URI to use to connect with Azure Active Directory. |
| `appsettings.azureAd.getClaimsFromUserInfoEndpoint` | `true` | Whether to get the user claims from UserInfo endpoint or not. |
| `appsettings.azureAd.tokenValidationParameters.validIssuers` | `[]` | List of valid issuers when validating tokens from Azure Active Directory. |
| `image.repository` | `azure-file-share-explorer` | Container image name. |
| `image.tag` | `0.0.3-beta` | Container image tag. |
| `image.pullPolicy ` | `IfNotPresent` | Container pull policy. |
| `imagePullSecrets` | `[]` | Name of Secret resources containing private registry credentials. |
| `serviceAccount.create` | `true` | Whether to create a ServiceAccount for this deployment or not. |
| `serviceAccount.name` | none | Name of the ServiceAccount to use for this deployment. If not set and `create` is set to `true`, a name will be generated using the fullname template. |
| `service.type` | `ClusterIP` | Service resource type. |
| `service.port` | `80` | Service HTTP port. |
| `ingress.enabled` | `false` | Whether to expose this deployment using an Ingress resource or not. |
| `ingress.annotations` | `{}` | Annotations to add to the Ingress resource. |
| `ingress.hosts` | `[]` | List of hosts allowed by the Ingress resource. |
| `ingress.tls` | `[]` | Ingress resource configuration for TLS. |
| `resources.limits.cpu` | `100m` | CPU resource limits for the container. |
| `resources.limits.memory` | `128Mi` | Memory resource limits for the container. |
| `resources.requests.cpu` | `100m` | CPU resource requests for the container. |
| `resources.requests.memory` | `128Mi` | Memory resource requests for the container. |
