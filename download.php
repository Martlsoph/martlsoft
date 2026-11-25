<?php
/* Martlsoft – Download mit Zähler (nur auf dem IONOS-Webspace, GitHub Pages kann kein PHP).
   Aufrufe:
     download.php?app=maki-weather            → Setup der aktuellen Version
     download.php?app=maki-weather&typ=zip    → ZIP ohne Installation
     downloads/maki-weather/<Datei>           → wird per .htaccess hierher umgeleitet (alte Links bleiben gültig)
   Erlaubt sind nur Apps und Dateien aus version.json (Whitelist). Gespeichert werden nur
   App-ID, Version, Paket und Tag – keine IP-Adresse, keine Cookies. */
declare(strict_types=1);
require __DIR__ . '/inc/martlsoft.php';

function ms_nicht_gefunden(): void
{
    http_response_code(404);
    header('Content-Type: text/html; charset=utf-8');
    $seite = MS_ROOT . '/404.html';
    if (is_file($seite)) {
        readfile($seite);
    } else {
        echo 'Nicht gefunden.';
    }
    exit;
}

function ms_zur_app_seite(string $app): void
{
    header('Location: /app.html?id=' . rawurlencode($app) . '#download', true, 302);
    exit;
}

$apps  = ms_versionen();
$app   = (string)($_GET['app'] ?? '');
$typ   = (string)($_GET['typ'] ?? '');
$datei = (string)($_GET['datei'] ?? '');

// 1. App prüfen (Whitelist)
if (!preg_match('/^[a-z0-9-]{1,40}$/', $app) || !isset($apps[$app]['dateien']) || !is_array($apps[$app]['dateien'])) {
    ms_nicht_gefunden();
}
$eintrag = $apps[$app];

// 2. Paket bestimmen
if ($datei !== '') {
    // Direkter Link auf downloads/<app>/<datei>: nur Dateien der aktuellen Version
    if (!preg_match('/^[A-Za-z0-9._-]{1,120}$/', $datei)) {
        ms_nicht_gefunden();
    }
    $typ = '';
    foreach ($eintrag['dateien'] as $t => $f) {
        if (($f['datei'] ?? '') === $datei) {
            $typ = (string)$t;
            break;
        }
    }
    if ($typ === '') {
        ms_zur_app_seite($app); // alte Version oder SHA256.txt → zur aktuellen Download-Seite
    }
} else {
    $typ = $typ === '' ? 'setup' : $typ;
    if (!preg_match('/^[a-z]{1,10}$/', $typ) || !isset($eintrag['dateien'][$typ])) {
        ms_nicht_gefunden();
    }
}

// 3. Datei sicher auflösen (kein Path-Traversal: nur Dateiname, Ergebnis muss in downloads/<app>/ liegen)
$name = basename((string)$eintrag['dateien'][$typ]['datei']);
$ordner = realpath(MS_DOWNLOADS . '/' . $app);
$pfad = $ordner ? realpath($ordner . '/' . $name) : false;
if (!$ordner || !$pfad || strpos($pfad, $ordner . DIRECTORY_SEPARATOR) !== 0 || !is_file($pfad)) {
    ms_nicht_gefunden();
}

// 4. Zählen: nur echte Abrufe (kein HEAD, keine fortgesetzten Teil-Downloads, keine Suchmaschinen)
$range = (string)($_SERVER['HTTP_RANGE'] ?? '');
$methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($methode === 'GET' && ($range === '' || preg_match('/^bytes=0-/', $range)) && !ms_ist_robot()) {
    ms_zaehle($app, (string)($eintrag['version'] ?? '?'), $typ);
}

// 5. Ausliefern
while (ob_get_level() > 0) {
    ob_end_clean();
}
$istZip = substr($name, -4) === '.zip';
header('Content-Type: ' . ($istZip ? 'application/zip' : 'application/octet-stream'));
header('Content-Disposition: attachment; filename="' . $name . '"');
header('Content-Length: ' . (string)filesize($pfad));
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
if ($methode === 'HEAD') {
    exit;
}
readfile($pfad);
