param(
    [string]$Root = (Join-Path $PSScriptRoot ".."),
    [string]$Output = "PROJECT_MAP.md"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-LineCount {
    param([string]$Path)
    return (Get-Content -Path $Path).Count
}

function Count-Braces {
    param([string]$Line)
    $open = ([regex]::Matches($Line, "\{")).Count
    $close = ([regex]::Matches($Line, "\}")).Count
    return $open - $close
}

function Get-JsFunctionRanges {
    param([string]$Path)

    $lines = Get-Content -Path $Path
    $ranges = @()

    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $line = $lines[$i]
        $name = $null
        $kind = $null

        if (
            $line -match '^\s*const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>\s*\{' -or
            $line -match '^\s*function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{'
        ) {
            $name = $Matches[1]
            $kind = "block"
        } elseif (
            $line -match '^\s*const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*[^\{].*;\s*$'
        ) {
            $name = $Matches[1]
            $kind = "inline"
        }

        if (-not $name) {
            continue
        }

        if ($kind -eq "inline") {
            $ranges += [pscustomobject]@{
                Name  = $name
                Start = $i + 1
                End   = $i + 1
            }
            continue
        }

        $depth = Count-Braces -Line $line
        $j = $i
        while ($depth -gt 0 -and $j + 1 -lt $lines.Count) {
            $j += 1
            $depth += Count-Braces -Line $lines[$j]
        }

        $ranges += [pscustomobject]@{
            Name  = $name
            Start = $i + 1
            End   = $j + 1
        }
    }

    return @($ranges)
}

function Get-JsEventBindings {
    param([string]$Path)

    $lines = Get-Content -Path $Path
    $events = @()
    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $line = $lines[$i]
        if ($line -match '^\s*([A-Za-z_$][\w$?.]*)\.addEventListener\("([^"]+)"') {
            $events += [pscustomobject]@{
                Target = $Matches[1]
                Event  = $Matches[2]
                Line   = $i + 1
            }
        }
    }
    return @($events)
}

function Get-CssBlocks {
    param([string]$Path)

    $lines = Get-Content -Path $Path
    $blocks = @()
    $depth = 0
    $selectorBuffer = ""
    $currentSelector = $null
    $currentStart = $null

    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $line = $lines[$i]
        $trim = $line.Trim()

        if ($depth -eq 0) {
            if (-not $trim) { continue }
            if ($trim.StartsWith("/*")) { continue }

            if ($line.Contains("{")) {
                $left = $line.Substring(0, $line.IndexOf("{")).Trim()
                $selector = (($selectorBuffer + " " + $left).Trim())
                if (-not $selector) {
                    $selector = "{...}"
                }
                $currentSelector = $selector
                $currentStart = $i + 1
                $depth += Count-Braces -Line $line
                $selectorBuffer = ""
                if ($depth -eq 0) {
                    $blocks += [pscustomobject]@{
                        Selector = $currentSelector
                        Start    = $currentStart
                        End      = $i + 1
                    }
                    $currentSelector = $null
                    $currentStart = $null
                }
            } else {
                if ($trim.EndsWith(";")) {
                    $selectorBuffer = ""
                    continue
                }
                $selectorBuffer = (($selectorBuffer + " " + $trim).Trim())
            }
            continue
        }

        $depth += Count-Braces -Line $line
        if ($depth -eq 0 -and $currentSelector) {
            $blocks += [pscustomobject]@{
                Selector = $currentSelector
                Start    = $currentStart
                End      = $i + 1
            }
            $currentSelector = $null
            $currentStart = $null
        }
    }

    return @($blocks)
}

function Get-IndexIds {
    param([string]$Path)

    $lines = Get-Content -Path $Path
    $ids = @()
    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $line = $lines[$i]
        if ($line -match '<([a-zA-Z0-9-]+)[^>]*\sid="([^"]+)"') {
            $ids += [pscustomobject]@{
                Element = $Matches[1]
                Id      = $Matches[2]
                Line    = $i + 1
            }
        }
    }
    return @($ids)
}

function Get-IndexScripts {
    param([string]$Path)

    $lines = Get-Content -Path $Path
    $scripts = @()
    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $line = $lines[$i]
        if ($line -match '<script\s+src="([^"]+)"') {
            $scripts += [pscustomobject]@{
                Src  = $Matches[1]
                Line = $i + 1
            }
        }
    }
    return @($scripts)
}

function Get-MarkdownHeadings {
    param([string]$Path)

    $lines = Get-Content -Path $Path
    $items = @()
    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $line = $lines[$i]
        if ($line -match '^(#{1,6})\s+(.+)$') {
            $items += [pscustomobject]@{
                Level = $Matches[1].Length
                Title = $Matches[2].Trim()
                Line  = $i + 1
            }
        }
    }
    return @($items)
}

function Get-PsFunctionStarts {
    param([string]$Path)

    $lines = Get-Content -Path $Path
    $items = @()

    for ($i = 0; $i -lt $lines.Count; $i += 1) {
        $line = $lines[$i]
        if ($line -notmatch '^\s*function\s+([A-Za-z_][\w-]*)\s*\{') {
            continue
        }
        $items += [pscustomobject]@{
            Name = $Matches[1]
            Line = $i + 1
        }
    }

    return @($items)
}

$rootPath = (Resolve-Path -Path $Root).Path
$indexPath = Join-Path $rootPath "index.html"
$stylesPath = Join-Path $rootPath "styles.css"
$jsDir = Join-Path $rootPath "js"
$readmePath = Join-Path $rootPath "README.md"
$agentsPath = Join-Path $rootPath "AGENTS.md"
$mapPath = Join-Path $rootPath "PROJECT_MAP.md"
$toolPath = Join-Path $rootPath "tools\generate-project-map.ps1"
$outputPath = Join-Path $rootPath $Output

$jsFiles = Get-ChildItem -Path $jsDir -File -Filter "*.js" | Sort-Object Name
$loadedScripts = Get-IndexScripts -Path $indexPath
$loadedLookup = @{}
foreach ($script in $loadedScripts) {
    $loadedLookup[$script.Src.Replace("/", "\")] = $true
}

$inventory = @(
    [pscustomobject]@{ File = "index.html"; Kind = "HTML"; Runtime = "Loaded directly"; Active = "Yes"; Lines = Get-LineCount -Path $indexPath },
    [pscustomobject]@{ File = "styles.css"; Kind = "CSS"; Runtime = "Loaded directly"; Active = "Yes"; Lines = Get-LineCount -Path $stylesPath }
)

foreach ($js in $jsFiles) {
    $relative = "js/$($js.Name)"
    $active = if ($loadedLookup[$relative.Replace("/", "\")]) { "Yes" } else { "No (legacy/not loaded)" }
    $runtime = if ($active -eq "Yes") { "Browser runtime module" } else { "Reference snapshot" }
    $inventory += [pscustomobject]@{
        File = $relative
        Kind = "JavaScript"
        Runtime = $runtime
        Active = $active
        Lines = Get-LineCount -Path $js.FullName
    }
}

if (Test-Path $readmePath) {
    $inventory += [pscustomobject]@{
        File = "README.md"
        Kind = "Markdown"
        Runtime = "Human + AI onboarding"
        Active = "Yes"
        Lines = Get-LineCount -Path $readmePath
    }
}
if (Test-Path $agentsPath) {
    $inventory += [pscustomobject]@{
        File = "AGENTS.md"
        Kind = "Markdown"
        Runtime = "AI instruction override"
        Active = "Yes"
        Lines = Get-LineCount -Path $agentsPath
    }
}
if (Test-Path $mapPath) {
    $inventory += [pscustomobject]@{
        File = "PROJECT_MAP.md"
        Kind = "Markdown"
        Runtime = "Generated reference map"
        Active = "Yes"
        Lines = Get-LineCount -Path $mapPath
    }
}
if (Test-Path $toolPath) {
    $inventory += [pscustomobject]@{
        File = "tools/generate-project-map.ps1"
        Kind = "PowerShell"
        Runtime = "Documentation generator"
        Active = "Yes"
        Lines = Get-LineCount -Path $toolPath
    }
}

$doc = New-Object System.Text.StringBuilder

[void]$doc.AppendLine("# Project Map")
[void]$doc.AppendLine("")
[void]$doc.AppendLine("Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss K")")
[void]$doc.AppendLine("")
[void]$doc.AppendLine("## Mandatory Protocol (Humans + AI)")
[void]$doc.AppendLine("1. Read README.md first, then read this file before making any edit.")
[void]$doc.AppendLine("2. Treat index.html script order as the source of truth for runtime behavior.")
[void]$doc.AppendLine("3. After any code edit, run powershell -File ./tools/generate-project-map.ps1 to refresh line ranges.")
[void]$doc.AppendLine("4. If you add/remove/move files, update README.md, this file, and AGENTS.md in the same change.")
[void]$doc.AppendLine("5. Do not edit legacy js/app.*.js files unless you intentionally want to revive that branch.")
[void]$doc.AppendLine("")
[void]$doc.AppendLine("## System Flows")
[void]$doc.AppendLine("### Bootstrap")
[void]$doc.AppendLine("1. index.html loads CSS and five runtime scripts (core -> audio -> game -> settings -> events).")
[void]$doc.AppendLine("2. core.js defines DOM handles, constants, state containers, persistence helpers, note/key builders.")
[void]$doc.AppendLine("3. events.js:init() hydrates UI from saved settings, binds events, renders keyboard, and sets status.")
[void]$doc.AppendLine("")
[void]$doc.AppendLine("### Round Lifecycle")
[void]$doc.AppendLine("1. startRound(true) creates target notes and optionally plays them.")
[void]$doc.AppendLine("2. User selects notes on keyboard (toggleSelection).")
[void]$doc.AppendLine("3. Submit (submitAnswer) compares selection vs target and renders reveal.")
[void]$doc.AppendLine("4. Reveal playback (playRevealSequence) replays target and selected snapshots.")
[void]$doc.AppendLine("")
[void]$doc.AppendLine("### Audio Lifecycle")
[void]$doc.AppendLine("1. ensureAudio() lazily creates Web Audio context + master gain.")
[void]$doc.AppendLine("2. playNotes / playPianoNote schedule oscillators, envelopes, and key animations.")
[void]$doc.AppendLine("3. stopNotesById / stopAllNotes release voices and clear key timers.")
[void]$doc.AppendLine("4. Preview system (playPianoPreview) runs timed on/off/pedal events.")
[void]$doc.AppendLine("")
[void]$doc.AppendLine("## File Inventory")
[void]$doc.AppendLine("| File | Kind | Runtime Role | Active | Lines |")
[void]$doc.AppendLine("|---|---|---|---|---:|")
foreach ($row in $inventory) {
    [void]$doc.AppendLine("| $( $row.File ) | $( $row.Kind ) | $( $row.Runtime ) | $( $row.Active ) | $( $row.Lines ) |")
}
[void]$doc.AppendLine("")

[void]$doc.AppendLine("## index.html Map")
[void]$doc.AppendLine("File: index.html (1-$(Get-LineCount -Path $indexPath))")
[void]$doc.AppendLine("")
[void]$doc.AppendLine("### ID Anchors")
[void]$doc.AppendLine("| ID | Element | Line |")
[void]$doc.AppendLine("|---|---|---:|")
$ids = Get-IndexIds -Path $indexPath
foreach ($id in $ids) {
    [void]$doc.AppendLine("| $( $id.Id ) | <$( $id.Element )> | $( $id.Line ) |")
}
[void]$doc.AppendLine("")
[void]$doc.AppendLine("### Script Load Order")
[void]$doc.AppendLine("| Order | Script | Line |")
[void]$doc.AppendLine("|---:|---|---:|")
for ($i = 0; $i -lt $loadedScripts.Count; $i += 1) {
    $entry = $loadedScripts[$i]
    [void]$doc.AppendLine("| $($i + 1) | $( $entry.Src ) | $( $entry.Line ) |")
}
[void]$doc.AppendLine("")

[void]$doc.AppendLine("## styles.css Map")
[void]$doc.AppendLine("File: styles.css (1-$(Get-LineCount -Path $stylesPath))")
[void]$doc.AppendLine("")
[void]$doc.AppendLine("### Top-Level CSS Blocks")
[void]$doc.AppendLine("| Selector | Lines |")
[void]$doc.AppendLine("|---|---|")
$cssBlocks = Get-CssBlocks -Path $stylesPath
foreach ($block in $cssBlocks) {
    $selector = $block.Selector.Replace("|", "\|")
    if ($selector.Length -gt 85) {
        $selector = $selector.Substring(0, 82) + "..."
    }
    [void]$doc.AppendLine("| $selector | $( $block.Start )-$( $block.End ) |")
}
[void]$doc.AppendLine("")

[void]$doc.AppendLine("## Documentation + Tooling Maps")
if (Test-Path $readmePath) {
    [void]$doc.AppendLine("### README.md")
    [void]$doc.AppendLine("File: README.md (1-$(Get-LineCount -Path $readmePath))")
    [void]$doc.AppendLine("| Heading | Line |")
    [void]$doc.AppendLine("|---|---:|")
    foreach ($heading in (Get-MarkdownHeadings -Path $readmePath)) {
        [void]$doc.AppendLine("| $($heading.Title) | $($heading.Line) |")
    }
    [void]$doc.AppendLine("")
}
if (Test-Path $agentsPath) {
    [void]$doc.AppendLine("### AGENTS.md")
    [void]$doc.AppendLine("File: AGENTS.md (1-$(Get-LineCount -Path $agentsPath))")
    [void]$doc.AppendLine("| Heading | Line |")
    [void]$doc.AppendLine("|---|---:|")
    foreach ($heading in (Get-MarkdownHeadings -Path $agentsPath)) {
        [void]$doc.AppendLine("| $($heading.Title) | $($heading.Line) |")
    }
    [void]$doc.AppendLine("")
}
if (Test-Path $toolPath) {
    [void]$doc.AppendLine("### tools/generate-project-map.ps1")
    [void]$doc.AppendLine("File: tools/generate-project-map.ps1 (1-$(Get-LineCount -Path $toolPath))")
    [void]$doc.AppendLine("| Function | Start Line |")
    [void]$doc.AppendLine("|---|---:|")
    foreach ($fn in (Get-PsFunctionStarts -Path $toolPath)) {
        [void]$doc.AppendLine("| $($fn.Name) | $($fn.Line) |")
    }
    [void]$doc.AppendLine("")
}

[void]$doc.AppendLine("")

[void]$doc.AppendLine("## JavaScript Maps")
foreach ($js in $jsFiles) {
    $relative = "js/$($js.Name)"
    $isLoaded = $loadedLookup.ContainsKey($relative.Replace("/", "\"))
    $mode = if ($isLoaded) { "Active Runtime" } else { "Legacy / Not Loaded" }
    $lineCount = Get-LineCount -Path $js.FullName
    $functions = @(Get-JsFunctionRanges -Path $js.FullName)
    $events = @(Get-JsEventBindings -Path $js.FullName)

    [void]$doc.AppendLine("### $relative ($mode)")
    [void]$doc.AppendLine("File lines: 1-$lineCount")
    [void]$doc.AppendLine("")

    if ($functions.Count -gt 0) {
        [void]$doc.AppendLine("| Symbol | Lines |")
        [void]$doc.AppendLine("|---|---|")
        foreach ($fn in $functions) {
            [void]$doc.AppendLine("| $( $fn.Name ) | $( $fn.Start )-$( $fn.End ) |")
        }
        [void]$doc.AppendLine("")
    } else {
        [void]$doc.AppendLine("_No function declarations detected._")
        [void]$doc.AppendLine("")
    }

    if ($events.Count -gt 0) {
        [void]$doc.AppendLine("Event bindings:")
        [void]$doc.AppendLine("| Target | Event | Line |")
        [void]$doc.AppendLine("|---|---|---:|")
        foreach ($evt in $events) {
            [void]$doc.AppendLine("| $( $evt.Target ) | $( $evt.Event ) | $( $evt.Line ) |")
        }
        [void]$doc.AppendLine("")
    }
}

[void]$doc.AppendLine("## Maintenance Notes")
[void]$doc.AppendLine("- js/app.*.js is an older branch snapshot. Keep it for reference unless explicitly retired.")
[void]$doc.AppendLine("- Functional edits should target loaded scripts first: core.js, audio.js, game.js, settings.js, events.js.")
[void]$doc.AppendLine("- If you intentionally switch runtime scripts, update script tags in index.html and regenerate this file.")

$doc.ToString() | Set-Content -Path $outputPath -Encoding UTF8
Write-Output "Generated $Output"
