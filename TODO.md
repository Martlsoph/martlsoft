# Martlsoft – To-do-Liste

Stand: 20.11.2026 · Diese Datei liegt in `C:\Users\marti\Documents\app.dev\Martlsoft-Website\TODO.md`
Erledigtes abhaken: `[ ]` → `[x]`. Oder einfach Claude sagen: „Schau in die To-do-Liste“.

---

## 1. Als Nächstes: Screenshots für alle Apps auf der Website

Auf jeder App-Seite gibt es einen Bereich „Screenshots“. Wo noch keine Bilder sind, steht dort „Screenshots folgen“.

| App | Auf der Website | Vorhanden, aber noch nicht eingebaut | To-do |
|---|---|---|---|
| **MaKi.DELTA** (Windows) | ✅ 3 Bilder | – | erledigt |
| **MaKi.VOL** | ❌ keine | ✅ 4 Play-Store-Bilder in `MaKi.VOL\Veroeffentlichung\Bilder\Screenshots` | nur noch einbauen |
| **MaKi.SOUND** (Blauklang) | ❌ keine | ❌ | Screenshots erstellen und einbauen |
| **MaKi.TRANS** | ❌ keine | ❌ | Screenshots erstellen und einbauen |
| **MaKi.SHOP** | ❌ keine | ❌ | Screenshots erstellen und einbauen |

- [ ] MaKi.VOL: vorhandene 4 Screenshots auf die Website übernehmen
- [ ] MaKi.SOUND: 3–4 Screenshots machen (Startseite, Player, Playlist, Einstellungen)
- [ ] MaKi.TRANS: 3–4 Screenshots machen (Übersetzen, Teilen an WhatsApp, Antwort zurück, Einstellungen mit API-Schlüssel – **Schlüssel unkenntlich machen!**)
- [ ] MaKi.SHOP: 3–4 Screenshots machen (Liste mit offenen + abgehakten Artikeln, Spracheingabe, ☰-Menü, Anleitung) – Claude kann sie per USB direkt vom Handy holen
- [x] MaKi.SHOP 1.1 (mit ☰-Menü, Anleitung, Über die App) aufs Handy installiert (21.11.2026)
- [ ] Alle Bilder in `img/screenshots/` legen und in `js/apps.js` bei `screenshots` eintragen
- [ ] Prüfen, ob MaKi.FILES und MaKi.TEXT auch auf die Website sollen (Ordner gibt es schon in app.dev)
- [ ] Hochladen: GitHub (macht Claude) und IONOS (Paket bauen, dann Upload – du tippst nur das SFTP-Passwort)

**So machst du Screenshots am Handy:** Ein-/Aus-Taste und Leiser-Taste gleichzeitig kurz drücken. Die Bilder landen in der Galerie unter „Screenshots“. Schick sie dir per Mail oder Google Drive auf den PC, oder Claude erstellt sie im Emulator.

**Tipp:** Die gleichen Bilder kannst du auch für den Play Store verwenden (mind. 2, besser 4 pro App).

---

## 2. Google Play

- [ ] MaKi.VOL: Prüfung durch Google abwarten (eingereicht am 19./20.11., meist 1–3 Tage)
- [ ] MaKi.SOUND einreichen (`.aab` liegt im Ordner `Veroeffentlichung`)
- [ ] MaKi.TRANS einreichen – vorher auf dem eigenen Handy testen (Android 15/16)
- [ ] MaKi.SHOP: `.aab` bauen und einreichen
- [ ] Sobald eine App im Store ist: Play-Link in `js/apps.js` bei `play` eintragen und `status: "play"` setzen → auf der Website erscheint dann der Knopf „Bei Google Play laden“
- [ ] Datenschutz-Link im Play Store: `https://martlsoft.com/datenschutz.html#<app-id>`

## 3. Sicherheit

- [ ] Bei **jeder** App den Ordner `signing` auf USB-Stick **und** in die Cloud kopieren (ohne diese Schlüssel keine Updates möglich!)

## 4. Website

- [x] martlsoft.com bei IONOS eingerichtet und online
- [ ] SSL prüfen: Schloss 🔒 in der Adresszeile bei https://martlsoft.com
- [ ] Optional: GitHub-Testseite abschalten (Repository → Settings → Pages → Unpublish), wenn martlsoft.com stabil läuft

## 5. Später / Ideen

- [ ] Pro-Version (Freemium): Basis bleibt kostenlos, neue Extras gegen 1 €/Monat bzw. 10 €/Jahr. Am besten zuerst beim MaKi.TRANS (Übersetzen ohne eigenen Schlüssel). Vorher: Zahlungsprofil in der Play Console, Gewerbe/Steuer klären, Texte und Datenschutz anpassen.
