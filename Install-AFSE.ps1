param(
    [Parameter(Mandatory = $true)]
    [string]$ConnectionString,

    [Parameter(Mandatory = $true)]
    [string]$ShareName,

    [Parameter()]
    [bool]$DryRun
)

$releaseName = "azure-file-share-explorer"

if ($DryRun) {
    helm template --name-template $releaseName `
        --set secretValues.storage.connectionString=$ConnectionString `
        --set secretValues.storage.shareName=$ShareName `
        --set imagePullSecrets[0].name=dockerhub `
        --set service.type=NodePort `
        --namespace afse `
        --debug `
        ./chart/azure-file-share-explorer
}
else {
    helm upgrade `
        --set secretValues.storage.connectionString=$ConnectionString `
        --set secretValues.storage.shareName=$ShareName `
        --set imagePullSecrets[0].name=dockerhub `
        --set service.type=NodePort `
        --namespace afse `
        --debug --wait --timeout 5m0s `
        --install $releaseName ./chart/azure-file-share-explorer
}
