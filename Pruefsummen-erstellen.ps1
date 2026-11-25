# Prueft alle Windows-Downloads in downloads\<app-id>\ und traegt sie ueberall ein:
#   1. downloads\<app-id>\SHA256.txt   - SHA-256-Pruefsummen (wie Get-FileHash)
#   2. version.json                    - aktuelle Version je App: Whitelist fuer download.php und
#                                        Quelle fuer die Update-Pruefung in den Windows-Programmen
#   3. js\apps.js                      - Version, Datum, Dateinamen, Groesse und Pruefsumme
#                                        (werden auf der App-Seite neben dem Download-Knopf angezeigt)
# Erwartete Dateinamen:  <Name>-Setup-<Version>.exe  und optional  <Name>-<Version>-portable.zip
# Liegen mehrere Versionen im Ordner, gilt die hoechste. Alte Dateien bitte danach loeschen.
# Starten: Rechtsklick -> "Mit PowerShell ausfuehren"  oder  & .\Pruefsummen-erstellen.ps1
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$dl = Join-Path $root 'downloads'
$appsJs = Join-Path $root 'js\apps.js'
$utf8 = New-Object Text.UTF8Encoding $false
$de = [Globalization.CultureInfo]'de-DE'
$js = [IO.File]::ReadAllText($appsJs, $utf8)
$warnungen = @()
$apps = [ordered]@{}

function Format-Groesse([long]$bytes) {
  if ($bytes -ge 1MB) { return ($bytes / 1MB).ToString('N1', $de) + ' MB' }
  return [math]::Round($bytes / 1KB).ToString('N0', $de) + ' KB'
}
function ConvertTo-Version([string]$v) { $t = $v.Split('.'); while ($t.Count -lt 2) { $t += '0' }; [version]($t -join '.') }

foreach ($ordner in Get-ChildItem $dl -Directory | Sort-Object Name) {
  $id = $ordner.Name
  if ($id -cnotmatch '^[a-z0-9-]+$') { $warnungen += "Ordner '$id' uebersprungen (nur a-z, 0-9 und - erlaubt)."; continue }

  $setups = foreach ($f in Get-ChildItem $ordner.FullName -File) {
    if ($f.Name -match '^(.+)-Setup-(\d+(?:\.\d+)*)\.exe$') { [pscustomobject]@{ Datei = $f; Name = $Matches[1]; Version = $Matches[2] } }
  }
  if (-not $setups) { $warnungen += "In downloads\$id liegt kein <Name>-Setup-<Version>.exe."; continue }
  $neu = $setups | Sort-Object { ConvertTo-Version $_.Version } -Descending | Select-Object -First 1
  $name = $neu.Name; $ver = $neu.Version
  $dateien = [ordered]@{ setup = $neu.Datei }
  $zip = Join-Path $ordner.FullName "$name-$ver-portable.zip"
  if (Test-Path -LiteralPath $zip) { $dateien.zip = Get-Item -LiteralPath $zip }

  $aktuell = @($dateien.Values | ForEach-Object { $_.Name }) + 'SHA256.txt'
  foreach ($alt in Get-ChildItem $ordner.FullName -File | Where-Object { $aktuell -notcontains $_.Name }) {
    $warnungen += "downloads\$id\$($alt.Name) ist nicht die aktuelle Version und wird nicht mehr angeboten - bitte loeschen."
  }

  # 1. SHA256.txt
  $eintraege = [ordered]@{}
  $zeilen = foreach ($typ in $dateien.Keys) {
    $f = $dateien[$typ]
    $hash = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash.ToLower()
    $eintraege[$typ] = [ordered]@{ datei = $f.Name; groesse = $f.Length; sha256 = $hash }
    '{0}  {1}' -f $hash, $f.Name
  }
  [IO.File]::WriteAllLines((Join-Path $ordner.FullName 'SHA256.txt'), [string[]]$zeilen, $utf8)

  $datum = $neu.Datei.LastWriteTime
  $apps[$id] = [ordered]@{
    name    = $name
    version = $ver
    datum   = $datum.ToString('yyyy-MM-dd')
    seite   = "https://martlsoft.com/app.html?id=$id#download"
    dateien = $eintraege
  }

  # 3. apps.js: nur den Block dieser App anfassen
  $start = $js.IndexOf("id: `"$id`"")
  if ($start -lt 0) { $warnungen += "App '$id' fehlt in js\apps.js - bitte dort einen Eintrag mit download-Block anlegen."; continue }
  $ende = $js.IndexOf("`n  {", $start)
  if ($ende -lt 0) { $ende = $js.Length }
  $block = $js.Substring($start, $ende - $start)
  if ($block -notmatch 'download:\s*\{') { $warnungen += "App '$id' hat in js\apps.js keinen download-Block."; continue }
  $alt = $block
  $n = $name -replace '\.', '\.'
  $block = [regex]::Replace($block, '(download:\s*\{\s*version:\s*")[^"]*(")', "`${1}$ver`${2}")
  $block = [regex]::Replace($block, '(download:\s*\{[^}]*?date:\s*")[^"]*(")', ('${1}' + $de.DateTimeFormat.GetMonthName($datum.Month) + ' ' + $datum.Year + '${2}'))
  $block = [regex]::Replace($block, "downloads/$id/$n-Setup-[\d.]+\.exe", "downloads/$id/$name-Setup-$ver.exe")
  $block = [regex]::Replace($block, "downloads/$id/$n-[\d.]+-portable\.zip", "downloads/$id/$name-$ver-portable.zip")
  foreach ($typ in $eintraege.Keys) {
    $e = $eintraege[$typ]
    $muster = '(file:\s*"downloads/' + $id + '/' + [regex]::Escape($e.datei) + '",\s*size:\s*")[^"]*(",\s*sha256:\s*")[0-9a-fA-F]*(")'
    if ($block -notmatch $muster) { $warnungen += "js\apps.js: Eintrag fuer $($e.datei) (file/size/sha256) nicht gefunden."; continue }
    $block = [regex]::Replace($block, $muster, ('${1}' + (Format-Groesse $e.groesse) + '${2}' + $e.sha256 + '${3}'))
  }
  if ($block -ne $alt) { $js = $js.Substring(0, $start) + $block + $js.Substring($ende) }

  Write-Host ("{0,-14} {1,-8}" -f $id, $ver) -ForegroundColor Cyan
  $zeilen | ForEach-Object { Write-Host "  $_" }
}

# 2. version.json
$version = [ordered]@{
  hinweis  = 'Aktuelle Versionen der Martlsoft-Windows-Programme. Wird von Pruefsummen-erstellen.ps1 erzeugt - nicht von Hand aendern.'
  erstellt = (Get-Date).ToString('yyyy-MM-dd')
  apps     = $apps
}
[IO.File]::WriteAllText((Join-Path $root 'version.json'), (($version | ConvertTo-Json -Depth 6) -replace '\r?\n', "`n") + "`n", $utf8)
[IO.File]::WriteAllText($appsJs, $js, $utf8)

Write-Host ''
foreach ($w in $warnungen) { Write-Host "Achtung: $w" -ForegroundColor Yellow }
Write-Host 'Fertig: SHA256.txt, version.json und js\apps.js sind aktuell.' -ForegroundColor Green
