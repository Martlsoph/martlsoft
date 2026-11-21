# Martlsoft – To-do-Liste

Stand: 20.11.2026 · Diese Datei liegt in `C:\Users\marti\Documents\app.dev\Martlsoft-Website\TODO.md`
Erledigtes abhaken: `[ ]` → `[x]`. Oder einfach Claude sagen: „Schau in die To-do-Liste“.

---

## 1. Als Nächstes: Screenshots für alle Apps auf der Website

Auf jeder App-Seite gibt es einen Bereich „Screenshots“. Wo noch keine Bilder sind, steht dort „Screenshots folgen“.

| App | Auf der Website | Vorhanden, aber noch nicht eingebaut | To-do |
|---|---|---|---|
| **MaKi.DELTA** (Windows) | ✅ 3 Bilder (neu, hell, mit neuem Namen) | – | erledigt (21.11.2026) |
| **MaKi.VOL** | ✅ 4 Bilder + neues Titelbild | ✅ neu: 4 DE + 3 ES in `MaKi.VOL\Veroeffentlichung\Bilder` | erledigt (21.11.2026) |
| **MaKi.SOUND** | ✅ 4 Bilder (Cover durch Platzhalter ersetzt) | ✅ 4 in `musicplayer\MaKi.SOUND\Veroeffentlichung\Bilder\Screenshots` | erledigt (21.11.2026) |
| **MaKi.TRANS** | ✅ 4 Bilder (Schlüssel/Verlauf nicht sichtbar) | ✅ 4 in `MaKi.TRANS\Veroeffentlichung\Bilder\Screenshots` | erledigt (21.11.2026) |
| **MaKi.SHOP** | ✅ 4 Bilder | – | erledigt (21.11.2026) |
| **MaKi.TODO** | ✅ 5 Bilder (Liste, Emoji, Wischen, Bearbeiten, Erledigt) + Symbol, Titelbild, Datenschutz | ✅ 5 in `MaKi.TODO\Veroeffentlichung\Bilder\Screenshots` | erledigt (21.11.2026) |

- [x] MaKi.VOL: 7 neue Screenshots (DE + ES) mit Namen „MaKi.VOL“, Titelbild 1024×500 neu – im Explorer ersetzt, auf der Website eingebaut
- [x] MaKi.SOUND: 4 Screenshots (Player, Interpreten, Titelliste, Einstellungen) – Albumcover wegen Urheberrecht durch Platzhalter ersetzt
- [x] MaKi.TRANS: 4 Screenshots (Übersetzen, Menü, Anleitung, Über die App) – API-Schlüssel-Endung übermalt, kein Verlauf sichtbar
- [x] MaKi.DELTA: 3 Screenshots neu (Start, Beispiel Texte, Beispiel Tabelle) – vorher stand noch „MaKi-Delta“ drauf
- [x] MaKi.SOUND: Playlists zeigen in der App „0 Titel“ – behoben 21.11.2026 (Übersicht wurde vor dem Laden der Bibliothek berechnet; Import zusätzlich robuster). Playlist-Screenshot gemacht und eingebaut (5-Playlists.png, Website, Handy-Galerie „MaKi.SOUND“).
- [ ] Spanische Screenshots für MaKi.SOUND, MaKi.TRANS, MaKi.SHOP (für spanische Store-Einträge), falls gewünscht
- [x] MaKi.SHOP: 4 Screenshots (Liste mit Beispielartikeln, ☰-Menü, Anleitung, Über die App) – per USB vom Handy geholt und eingebaut (21.11.2026)
- [x] MaKi.SHOP 1.1 (mit ☰-Menü, Anleitung, Über die App) aufs Handy installiert (21.11.2026)
- [x] Alle Bilder in `img/screenshots/` legen und in `js/apps.js` bei `screenshots` eintragen (21.11.2026)
- [ ] Prüfen, ob MaKi.FILES und MaKi.TEXT auch auf die Website sollen (Ordner gibt es schon in app.dev)
- [x] Hochladen: GitHub und IONOS (21.11.2026, mit MaKi.TODO). IONOS-Upload geht jetzt nach `/martlsoft` (`IONOS-Hochladen.ps1` angepasst), SFTP-Passwort am 21.11. neu gesetzt
- [ ] IONOS: Beim Webspace steht „Keine Domain verbunden“ – martlsoft.com kommt noch von GitHub Pages. Wenn IONOS die echte Seite sein soll: Domain auf `/martlsoft` zeigen lassen (ANLEITUNG-IONOS.md, Schritt 5)

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
