# azure-file-share-explorer
Easily explore your Azure File shares with the Azure File Share Explorer.

## Prerequisites
- Kubernetes 1.16+
- Helm 2.15+

## Installing the Chart
To install the chart with the release name `my-release`, run:

```sh
$ helm install azure-file-share-explorer --name my-release \
    --set secretValues.storage.connectionString="<connection-string>" \
    --set secretValues.storage.shareName="<share-name>" \
    --set appsettings.openIdConnect.authority="<authority>" \
    --set secretValues.openIdConnect.clientId="<client-id>" \
    --set secretValues.openIdConnect.clientSecret="<client-secret>"
```

To install the chart and secure the Azure File Share Explorer with Azure AD, run after having registered the application. You will need to whitelist the `https://<host>/signin-oidc` redirect uri.

```sh
$ helm install azure-file-share-explorer --name my-release \
    --set secretValues.storage.connectionString="<connection-string>" \
    --set secretValues.storage.shareName="<share-name>" \
    --set appsettings.openIdConnect.authority="https://login.microsoftonline.com/<tenantid>/v2.0" \
    --set secretValues.openIdConnect.clientId="<app-client-id>" \
    --set secretValues.openIdConnect.clientSecret="<app-client-secret>"
```

## Uninstalling the Chart
To uninstall/delete the `my-release` deployment, run:
```sh
$ helm delete my-release
```

## Configuration
The following table lists the configurable parameters of the azure-file-share-explorer chart and their default values.

| Parameter | Default | Description |
| --- | --- | --- |
| `secretValues.storage.connectionString` | none | Mandatory. Connection string to the Azure Storage account containing your file share. |
| `secretValues.storage.shareName` | none | Mandatory. Name of the file share you want to explore. |
| `secretValues.openIdConnect.clientId` | none | Client ID to use to authenticate with the OpenID Connect authority |
| `secretValues.openIdConnect.clientSecret` | none | Client secret to use to authenticate with the OpenID Connect authority |
| `appsettings.openIdConnect.authority` | none | Authority URI to use to connect with the OpenID Connect server. |
| `appsettings.openIdConnect.getClaimsFromUserInfoEndpoint` | `true` | Whether to get the user claims from UserInfo endpoint or not. |
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
