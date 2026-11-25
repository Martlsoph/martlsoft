<?php
/* Martlsoft – Download-Übersicht (passwortgeschützt).
   Passwort setzen: Statistik-Passwort-setzen.ps1 in app.dev (neben IONOS-Hochladen.ps1) ausführen. Es legt
   daten/stats-passwort.txt auf dem Webspace an (nur ein Hash, nicht das Passwort selbst).
   Für die Anmeldung wird ein Sitzungs-Cookie gesetzt – nur hier, nur für dich, technisch notwendig. */
declare(strict_types=1);
require __DIR__ . '/inc/martlsoft.php';

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");

session_name('ms_stats');
session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => true, 'httponly' => true, 'samesite' => 'Strict']);
session_start();

/* Format der Passwortdatei: pbkdf2-sha256$<Runden>$<Salz Base64>$<Hash Base64> */
function ms_passwort_ok(string $eingabe): bool
{
    $zeile = trim((string)@file_get_contents(MS_PASSWORT));
    $teile = explode('$', $zeile);
    if (count($teile) !== 4 || $teile[0] !== 'pbkdf2-sha256') {
        return false;
    }
    $runden = (int)$teile[1];
    $salz = base64_decode($teile[2], true);
    $soll = base64_decode($teile[3], true);
    if ($runden < 10000 || $salz === false || $soll === false) {
        return false;
    }
    $ist = hash_pbkdf2('sha256', $eingabe, $salz, $runden, strlen($soll), true);
    return hash_equals($soll, $ist);
}

$fehler = '';
$eingerichtet = is_file(MS_PASSWORT);

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (isset($_POST['abmelden'])) {
        $_SESSION = [];
        session_destroy();
        header('Location: stats.php', true, 303);
        exit;
    }
    if (isset($_POST['passwort'])) {
        if ($eingerichtet && ms_passwort_ok((string)$_POST['passwort'])) {
            session_regenerate_id(true);
            $_SESSION['ok'] = true;
            header('Location: stats.php', true, 303);
            exit;
        }
        sleep(2); // bremst das Durchprobieren von Passwörtern
        $fehler = 'Passwort falsch.';
    }
}

$angemeldet = !empty($_SESSION['ok']);

function ms_zahl(int $n): string
{
    return number_format($n, 0, ',', '.');
}

const MONATE = ['', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
function ms_monat(string $ym): string
{
    [$j, $m] = array_map('intval', explode('-', $ym));
    return (MONATE[$m] ?? $ym) . ' ' . $j;
}
?><!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Downloads | Martlsoft</title>
<style>
  :root { --navy:#0a2a66; --blue:#1565c0; --ice:#e3f2fd; --lemon:#fff44f; --text:#0d1b3e; --muted:#5b6b8c; --line:#cfdcf0; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 16px/1.5 system-ui, "Segoe UI", Roboto, sans-serif; color: var(--text); background: #f5f9ff; }
  header { background: linear-gradient(120deg, #0a2a66, #1565c0 55%, #4fc3f7); color: #fff; padding: 22px 0; }
  .wrap { max-width: 980px; margin: 0 auto; padding: 0 20px; }
  header .wrap { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  h1 { margin: 0; font-size: 22px; }
  h2 { font-size: 18px; margin: 34px 0 10px; }
  .karten { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-top: 26px; }
  .karte { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 16px 18px; }
  .karte b { display: block; font-size: 30px; color: var(--navy); }
  .karte span { color: var(--muted); font-size: 14px; }
  .tabelle { overflow-x: auto; background: #fff; border: 1px solid var(--line); border-radius: 16px; }
  table { border-collapse: collapse; width: 100%; font-size: 15px; }
  th, td { padding: 9px 14px; text-align: right; border-bottom: 1px solid var(--line); white-space: nowrap; }
  th:first-child, td:first-child { text-align: left; }
  thead th { background: var(--ice); color: var(--navy); font-weight: 600; }
  tr:last-child td { border-bottom: 0; }
  tfoot td { font-weight: 700; background: #fafcff; }
  .leer { color: var(--muted); }
  .hinweis { color: var(--muted); font-size: 14px; margin: 30px 0 40px; }
  form.anmelden { max-width: 360px; margin: 60px auto; background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 24px; }
  input[type=password] { width: 100%; padding: 10px 12px; font: inherit; border: 1px solid var(--line); border-radius: 10px; margin: 8px 0 14px; }
  button { font: inherit; font-weight: 600; padding: 9px 18px; border-radius: 999px; border: 0; background: var(--lemon); color: var(--navy); cursor: pointer; }
  header button { background: rgba(255,255,255,.18); color: #fff; }
  .fehler { color: #b42318; }
</style>
</head>
<body>
<header><div class="wrap"><h1>Martlsoft · Downloads</h1>
<?php if ($angemeldet): ?><form method="post"><button name="abmelden" value="1">Abmelden</button></form><?php endif; ?>
</div></header>
<main class="wrap">
<?php if (!$angemeldet): ?>
  <form class="anmelden" method="post">
    <?php if (!$eingerichtet): ?>
      <p><b>Noch kein Passwort eingerichtet.</b></p>
      <p>Bitte auf dem PC <code>Statistik-Passwort-setzen.ps1</code> (neben IONOS-Hochladen.ps1) ausführen.</p>
    <?php else: ?>
      <label for="pw"><b>Passwort</b></label>
      <input id="pw" type="password" name="passwort" autocomplete="current-password" autofocus required>
      <?php if ($fehler): ?><p class="fehler"><?= ms_h($fehler) ?></p><?php endif; ?>
      <button type="submit">Anmelden</button>
    <?php endif; ?>
  </form>
<?php else:
    $daten = ms_zaehlerstand();
    $namen = [];
    foreach (ms_versionen() as $id => $e) {
        $namen[$id] = (string)($e['name'] ?? $id);
    }
    $proMonat = [];   // [Monat][App] => Anzahl
    $proVersion = []; // [App][Version] => [setup, zip, ...]
    $gesamt = 0; $heute = 0; $dieserMonat = 0;
    $tagHeute = date('Y-m-d'); $monatHeute = date('Y-m');
    foreach ($daten as $tag => $appsAmTag) {
        $monat = substr((string)$tag, 0, 7);
        foreach ((array)$appsAmTag as $app => $versionen) {
            if (!isset($namen[$app])) { $namen[$app] = (string)$app; }
            foreach ((array)$versionen as $version => $typen) {
                foreach ((array)$typen as $typ => $n) {
                    $n = (int)$n;
                    $proMonat[$monat][$app] = ($proMonat[$monat][$app] ?? 0) + $n;
                    $proVersion[$app][$version][$typ] = ($proVersion[$app][$version][$typ] ?? 0) + $n;
                    $gesamt += $n;
                    if ($tag === $tagHeute) { $heute += $n; }
                    if ($monat === $monatHeute) { $dieserMonat += $n; }
                }
            }
        }
    }
    krsort($proMonat);
    ksort($namen);
    $appIds = array_keys($namen);
?>
  <div class="karten">
    <div class="karte"><b><?= ms_zahl($heute) ?></b><span>heute</span></div>
    <div class="karte"><b><?= ms_zahl($dieserMonat) ?></b><span><?= ms_h(ms_monat($monatHeute)) ?></span></div>
    <div class="karte"><b><?= ms_zahl($gesamt) ?></b><span>insgesamt</span></div>
  </div>

  <h2>Downloads pro Monat</h2>
  <div class="tabelle"><table>
    <thead><tr><th>Monat</th><?php foreach ($appIds as $id): ?><th><?= ms_h($namen[$id]) ?></th><?php endforeach; ?><th>Summe</th></tr></thead>
    <tbody>
    <?php if (!$proMonat): ?>
      <tr><td class="leer" colspan="<?= count($appIds) + 2 ?>">Noch keine Downloads gezählt.</td></tr>
    <?php endif; ?>
    <?php foreach ($proMonat as $monat => $werte): ?>
      <tr><td><?= ms_h(ms_monat((string)$monat)) ?></td>
      <?php foreach ($appIds as $id): ?><td><?= ms_zahl((int)($werte[$id] ?? 0)) ?></td><?php endforeach; ?>
      <td><b><?= ms_zahl(array_sum($werte)) ?></b></td></tr>
    <?php endforeach; ?>
    </tbody>
  </table></div>

  <h2>Nach Version und Paket</h2>
  <div class="tabelle"><table>
    <thead><tr><th>App</th><th>Version</th><th>Setup</th><th>ZIP</th><th>Summe</th></tr></thead>
    <tbody>
    <?php if (!$proVersion): ?>
      <tr><td class="leer" colspan="5">Noch keine Downloads gezählt.</td></tr>
    <?php endif; ?>
    <?php foreach ($appIds as $id): if (empty($proVersion[$id])) { continue; }
        $vers = $proVersion[$id];
        uksort($vers, fn($a, $b) => version_compare((string)$b, (string)$a));
        foreach ($vers as $version => $typen): ?>
      <tr><td><?= ms_h($namen[$id]) ?></td><td><?= ms_h((string)$version) ?></td>
        <td><?= ms_zahl((int)($typen['setup'] ?? 0)) ?></td><td><?= ms_zahl((int)($typen['zip'] ?? 0)) ?></td>
        <td><b><?= ms_zahl(array_sum($typen)) ?></b></td></tr>
    <?php endforeach; endforeach; ?>
    </tbody>
  </table></div>

  <p class="hinweis">Gezählt werden nur App, Version, Paket und Tag – keine IP-Adressen, keine Cookies.
  Suchmaschinen und fortgesetzte Teil-Downloads werden nicht mitgezählt. Wer eine Datei mehrmals lädt, zählt mehrmals.
  Rohdaten: <code>daten/downloads.json</code> auf dem Webspace (per SFTP).</p>
<?php endif; ?>
</main>
</body>
</html>
