param(
    [Parameter(Mandatory = $true)]
    [string]$ConnectionString,

    [Parameter(Mandatory = $true)]
    [string]$ShareName,

    [Parameter()]
    [string]$ReleaseName = "azure-file-share-explorer",

    [Parameter()]
    [string]$Authority,

    [Parameter()]
    [string]$ClientId,

    [Parameter()]
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
    "--set=secretValues.storage.connectionString=$ConnectionString",
    "--set=secretValues.storage.shareName=$ShareName",
    "--set=imagePullSecrets[0].name=dockerhub",
    "--set=service.type=NodePort",
    "--namespace=afse",
    "--debug"
)

if ($ClientId -and $ClientSecret -and $Authority) {
    $arguments += "--set=appsettings.azureAd.enabled=true"
    $arguments += "--set=appsettings.azureAd.authority=$Authority"
    $arguments += "--set=secretValues.azureAd.clientId=$ClientId"
    $arguments += "--set=secretValues.azureAd.clientSecret=$ClientSecret"
} else if ($ClientId -or $ClientSecret -or $Authority) {
    Write-Host "Azure AD not enabled because -ClientId and/or -ClientSecret and/or -Authority is not set"
}

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
