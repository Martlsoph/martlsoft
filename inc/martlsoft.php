<?php
/* Martlsoft – gemeinsame Bausteine für download.php und stats.php.
   Datenschutz: Gezählt werden nur App-ID, Version, Paket (setup/zip) und Tag.
   Keine IP-Adressen, keine Cookies, kein Browser-Kennzeichen wird gespeichert. */
declare(strict_types=1);

date_default_timezone_set('Europe/Berlin');

define('MS_ROOT', dirname(__DIR__));                     // Webverzeichnis (/martlsoft)
define('MS_DOWNLOADS', MS_ROOT . '/downloads');           // Programmdateien, nur über download.php erreichbar
define('MS_VERSIONEN', MS_ROOT . '/version.json');        // Whitelist: erlaubte Apps und Dateien (von Pruefsummen-erstellen.ps1)
define('MS_DATEN', MS_ROOT . '/daten');                   // Zählerstand und Passwort (nie im Upload-Paket, per .htaccess gesperrt)
define('MS_ZAEHLER', MS_DATEN . '/downloads.json');
define('MS_PASSWORT', MS_DATEN . '/stats-passwort.txt');

/* Datenordner anlegen und gegen direkten Abruf sperren (zusätzlich zur Regel in der Haupt-.htaccess). */
function ms_daten_ordner(): void
{
    if (!is_dir(MS_DATEN)) {
        @mkdir(MS_DATEN, 0700, true);
    }
    $ht = MS_DATEN . '/.htaccess';
    if (is_dir(MS_DATEN) && !is_file($ht)) {
        @file_put_contents($ht, "Require all denied\n");
    }
}

/* Erlaubte Apps mit Version und Dateien aus version.json. */
function ms_versionen(): array
{
    $json = @file_get_contents(MS_VERSIONEN);
    $d = $json ? json_decode($json, true) : null;
    return (is_array($d) && isset($d['apps']) && is_array($d['apps'])) ? $d['apps'] : [];
}

/* Einen Download zählen. Die Datei wird exklusiv gesperrt, damit gleichzeitige Abrufe nichts verlieren. */
function ms_zaehle(string $app, string $version, string $typ): void
{
    ms_daten_ordner();
    $fh = @fopen(MS_ZAEHLER, 'c+');
    if (!$fh) {
        return; // Zählen darf den Download nie verhindern
    }
    try {
        if (!flock($fh, LOCK_EX)) {
            return;
        }
        $inhalt = stream_get_contents($fh);
        $d = ($inhalt === false || trim($inhalt) === '') ? [] : json_decode($inhalt, true);
        if (!is_array($d)) {
            // Datei beschädigt: Kopie aufheben statt still zu überschreiben
            @file_put_contents(MS_ZAEHLER . '.defekt-' . date('Ymd-His'), (string)$inhalt);
            $d = [];
        }
        $tag = date('Y-m-d');
        $d[$tag][$app][$version][$typ] = (int)($d[$tag][$app][$version][$typ] ?? 0) + 1;
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode($d, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        fflush($fh);
    } finally {
        flock($fh, LOCK_UN);
        fclose($fh);
    }
}

/* Zählerstand lesen: [Tag][App][Version][Typ] => Anzahl */
function ms_zaehlerstand(): array
{
    $fh = @fopen(MS_ZAEHLER, 'r');
    if (!$fh) {
        return [];
    }
    flock($fh, LOCK_SH);
    $inhalt = stream_get_contents($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
    $d = $inhalt ? json_decode($inhalt, true) : [];
    return is_array($d) ? $d : [];
}

/* Suchmaschinen und Link-Vorschauen nicht mitzählen. Das Browser-Kennzeichen wird nur hier geprüft, nicht gespeichert. */
function ms_ist_robot(): bool
{
    $ua = (string)($_SERVER['HTTP_USER_AGENT'] ?? '');
    return $ua === '' || (bool)preg_match('/bot\b|bot\/|crawl|spider|slurp|preview|facebookexternalhit|headless/i', $ua);
}

function ms_h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
