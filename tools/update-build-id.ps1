param(
    [switch]$Force,
    [switch]$Quiet
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$indexPath = Join-Path $root "index.html"
$corePath = Join-Path $root "js\core.js"
$statePath = Join-Path $PSScriptRoot ".build-version-state.json"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Write-FileUtf8NoBom {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Content
    )
    [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Get-NormalizedContent {
    param([Parameter(Mandatory = $true)][string]$Path)
    $text = Get-Content -Raw -Path $Path
    $text = [regex]::Replace($text, '\?v=[^"''\s>]+', '?v=<BUILD_ID>')
    if ($Path -eq $corePath) {
        $text = [regex]::Replace($text, 'const BUILD_ID = "[^"]+";', 'const BUILD_ID = "<BUILD_ID>";')
    }
    return $text
}

function Get-SourceFiles {
    $files = @()
    $files += Get-Item -Path $indexPath
    $files += Get-Item -Path (Join-Path $root "styles.css")
    $files += Get-ChildItem -Path (Join-Path $root "js") -Filter *.js -File
    $files += Get-ChildItem -Path (Join-Path $root "vendor") -Filter *.js -File -ErrorAction SilentlyContinue
    return $files | Sort-Object FullName -Unique
}

function Get-SourceHash {
    $files = Get-SourceFiles
    $combined = New-Object System.Text.StringBuilder
    foreach ($file in $files) {
        $relative = Resolve-Path -Path $file.FullName -Relative
        [void]$combined.AppendLine($relative)
        [void]$combined.AppendLine((Get-NormalizedContent -Path $file.FullName))
    }

    $bytes = [System.Text.Encoding]::UTF8.GetBytes($combined.ToString())
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        $hashBytes = $sha.ComputeHash($bytes)
    } finally {
        $sha.Dispose()
    }
    return ([System.BitConverter]::ToString($hashBytes)).Replace("-", "").ToLowerInvariant()
}

$sourceHash = Get-SourceHash
$state = $null
if (Test-Path -Path $statePath) {
    try {
        $state = Get-Content -Raw -Path $statePath | ConvertFrom-Json
    } catch {
        $state = $null
    }
}

if (-not $Force -and $state -and $state.sourceHash -eq $sourceHash) {
    if (-not $Quiet) {
        $existing = Get-Content -Raw -Path $corePath
        if ($existing -match 'const BUILD_ID = "([^"]+)";') {
            Write-Output "Build id unchanged: $($Matches[1])"
        } else {
            Write-Output "Build id unchanged."
        }
    }
    return
}

$newBuildId = (Get-Date).ToString("yyyyMMddHHmmss")

$coreText = Get-Content -Raw -Path $corePath
$updatedCoreText = [regex]::Replace($coreText, 'const BUILD_ID = "[^"]+";', "const BUILD_ID = `"$newBuildId`";")
if ($updatedCoreText -ne $coreText) {
    Write-FileUtf8NoBom -Path $corePath -Content $updatedCoreText
}

$indexText = Get-Content -Raw -Path $indexPath
$updatedIndexText = [regex]::Replace($indexText, '\?v=[^"''\s>]+', "?v=$newBuildId")
if ($updatedIndexText -ne $indexText) {
    Write-FileUtf8NoBom -Path $indexPath -Content $updatedIndexText
}

$nextState = [ordered]@{
    sourceHash = $sourceHash
    buildId = $newBuildId
    updatedAt = (Get-Date).ToString("o")
}
Write-FileUtf8NoBom -Path $statePath -Content (($nextState | ConvertTo-Json -Depth 3))

if (-not $Quiet) {
    Write-Output "Updated build id to $newBuildId"
}
