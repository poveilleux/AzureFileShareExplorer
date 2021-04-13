param(
    [Parameter(Mandatory = $true)]
    [string]$ConnectionString,

    [Parameter(Mandatory = $true)]
    [string]$ShareName,

    [Parameter()]
    [string]$ReleaseName = "azure-file-share-explorer",

    [Parameter(Mandatory = $true)]
    [string]$Authority,

    [Parameter(Mandatory = $true)]
    [string]$ClientId,

    [Parameter(Mandatory = $true)]
    [string]$ClientSecret,

    [Parameter()]
    [string]$ImageTag,

    [Parameter()]
    [string]$HostName,

    [Parameter()]
    [switch]$DryRun
)

$chart = "./chart/azure-file-share-explorer"

$arguments = @(
    "--set=appsettings.openIdConnect.authority=$Authority",
    "--set=secretValues.openIdConnect.clientId=$ClientId",
    "--set=secretValues.openIdConnect.clientSecret=$ClientSecret",
    "--set=secretValues.storage.connectionString=$ConnectionString",
    "--set=secretValues.storage.shareName=$ShareName",
    "--set=imagePullSecrets[0].name=dockerhub",
    "--set=service.type=NodePort",
    "--namespace=afse",
    "--debug"
)

if ($HostName) {
    $arguments += "--set=ingress.enabled=true"
    $arguments += "--set=ingress.hosts[0].host=$HostName"
    $arguments += "--set=ingress.hosts[0].paths[0]=/"
}

if ($ImageTag) {
    $arguments += "--set=image.tag=$ImageTag"
}

if ($DryRun) {
    helm template --name-template $ReleaseName @arguments $chart
}
else {
    helm upgrade $arguments --wait --timeout 5m0s --install $ReleaseName $chart
}
