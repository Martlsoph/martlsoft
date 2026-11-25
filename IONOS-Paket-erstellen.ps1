# Erstellt neben dem Website-Ordner den Ordner "Martlsoft-IONOS-Upload" mit genau den Dateien, die auf den IONOS-Webspace gehören.
# Dabei wird in der Datenschutzerklärung der GitHub-Absatz gegen den IONOS-Absatz getauscht.
# Starten: Rechtsklick auf diese Datei -> "Mit PowerShell ausführen"

$ErrorActionPreference = "Stop"
$src = $PSScriptRoot
$out = Join-Path (Split-Path $src -Parent) "Martlsoft-IONOS-Upload"

if (Test-Path $out) { Remove-Item $out -Recurse -Force }
New-Item -ItemType Directory $out | Out-Null

# Nur die Website-Dateien kopieren (kein .git, keine Anleitungen, kein Skript)
$skip = @(".git", ".gitignore", ".nojekyll", "ANLEITUNG-IONOS.md", "TODO.md", "daten")
Get-ChildItem $src -Force | Where-Object { $skip -notcontains $_.Name -and $_.Extension -ne ".ps1" } | ForEach-Object {
  Copy-Item $_.FullName -Destination $out -Recurse -Force
}

# Datenschutz: GitHub-Absatz raus, IONOS-Absatz rein
$ds = Join-Path $out "datenschutz.html"
$t = [IO.File]::ReadAllText($ds, [Text.Encoding]::UTF8)
$t = [regex]::Replace($t, '(?s)<!--HOSTING-GITHUB-START-->.*?<!--HOSTING-GITHUB-END-->\s*', '')
$t = $t -replace '<!--HOSTING-IONOS-START', '' -replace 'HOSTING-IONOS-END-->', ''
if ($t -notmatch 'IONOS SE' -or $t -match 'GitHub Inc') { throw "Datenschutz konnte nicht umgestellt werden." }
[IO.File]::WriteAllText($ds, $t, (New-Object Text.UTF8Encoding $false))

Write-Host ""
Write-Host "Fertig! Der Ordner zum Hochladen liegt hier:" -ForegroundColor Green
Write-Host "  $out"
Write-Host "Ziehe den INHALT dieses Ordners in FileZilla auf den IONOS-Webspace."
Write-Host ""
