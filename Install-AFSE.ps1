param(
    [Parameter(Mandatory = $true)]
    [string]$ConnectionString,

    [Parameter(Mandatory = $true)]
    [string]$ShareName,

    [Parameter()]
    [bool]$DryRun
)

$releaseName = "azure-file-share-explorer"
$chart = "./chart/azure-file-share-explorer"

$arguments = @(
    "--set secretValues.storage.connectionString=$ConnectionString",
    "--set secretValues.storage.shareName=$ShareName",
    "--set imagePullSecrets[0].name=dockerhub",
    "--set service.type=NodePort",
    "--namespace afse",
    "--debug"
)

if ($DryRun) {
    helm template --name-template $releaseName @arguments $chart
}
else {
    helm upgrade @arguments --wait --timeout 5m0s --install $releaseName $chart
}
