param(
    [int]$Port = 5500,
    [switch]$OpenBrowser
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $root

$buildScript = Join-Path $PSScriptRoot "update-build-id.ps1"
if (Test-Path -Path $buildScript) {
    & $buildScript -Quiet
}

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Error "Python was not found in PATH. Install Python or run another static server."
}

Write-Output "Serving $root at http://localhost:$Port/"
if ($OpenBrowser) {
    Start-Process "http://localhost:$Port/"
}

python -m http.server $Port
