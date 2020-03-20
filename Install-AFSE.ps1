param(
    [Parameter(Mandatory = $true)]
    [string]$ConnectionString,

    [Parameter(Mandatory = $true)]
    [string]$ShareName,

    [Parameter()]
    [string]$ReleaseName = "azure-file-share-explorer",

    [Parameter()]
    [string]$ClientId,

    [Parameter()]
    [string]$ClientSecret,

    [Parameter()]
    [switch]$DryRun
)

$chart = "./chart/azure-file-share-explorer"

$arguments = @(
    "--set=secretValues.storage.connectionString=$ConnectionString",
    "--set=secretValues.storage.shareName=$ShareName",
    "--set=imagePullSecrets[0].name=dockerhub",
    "--set=service.type=NodePort",
    "--set=ingress.enabled=true",
    "--set=ingress.hosts[0].host=afse.com",
    "--set=ingress.hosts[0].paths[0]=/",
    "--namespace=afse",
    "--debug"
)

if ($ClientId -and $ClientSecret) {
    $arguments += "--set=appsettings.azureAd.enabled=true"
    $arguments += "--set=appsettings.azureAd.authority=https://login.microsoftonline.com/b8fdc25b-8533-46b2-8ee2-acd69a4cb5df/v2.0"
    $arguments += "--set=secretValues.azureAd.clientId=$ClientId"
    $arguments += "--set=secretValues.azureAd.clientSecret=$ClientSecret"
}

if ($DryRun) {
    helm template --name-template $ReleaseName @arguments $chart
}
else {
    helm upgrade $arguments --wait --timeout 5m0s --install $ReleaseName $chart
}
