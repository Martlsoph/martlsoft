# Martlsoft-Website zu IONOS umziehen – Schritt für Schritt

Dauer: etwa 30 Minuten, nur einmal nötig. Hake die Kästchen ab, sobald ein Schritt erledigt ist.

**Das brauchst du:**
- dein IONOS-Konto (Webhosting-Paket und Domain)
- das kostenlose Programm **FileZilla** (Schritt 3)
- diesen Ordner: `C:\Users\marti\Documents\app.dev\Martlsoft-Website`

> Die Menünamen bei IONOS können sich leicht ändern. Wenn ein Knopf anders heißt, such nach einem ähnlichen Wort.

---

## Schritt 1 – Upload-Paket erstellen (1 Min.)

- [ ] Öffne den Ordner `C:\Users\marti\Documents\app.dev\Martlsoft-Website`.
- [ ] Rechtsklick auf **IONOS-Paket-erstellen.ps1** → **Mit PowerShell ausführen**.
- [ ] Es erscheint „Fertig!“. Daneben gibt es jetzt den Ordner
      `C:\Users\marti\Documents\app.dev\Martlsoft-IONOS-Upload`.

Darin liegt genau das, was auf den Webspace gehört. Die Datenschutzerklärung nennt darin schon IONOS statt GitHub als Hoster. Den Ordner `.git` und diese Anleitung lässt das Paket weg.

## Schritt 2 – SFTP-Zugang bei IONOS anlegen (5 Min.)

SFTP ist der „Lieferanten-Eingang“ zu deinem Webspace.

- [ ] Bei IONOS anmelden: <https://login.ionos.de>
- [ ] Oben im Menü auf **Hosting** klicken, dann dein Webhosting-Paket wählen.
- [ ] Den Bereich **SFTP & SSH** (oder „Zugänge“) öffnen und einen **SFTP-Zugang anlegen**.
- [ ] Benutzername und ein **neues, eigenes Passwort** festlegen. Das Passwort notierst du dir sicher, z. B. in deinem Passwort-Manager.
- [ ] Dort gibt es meist auch **„FileZilla-Konfiguration herunterladen“**. Lade diese Datei herunter, das spart Tipparbeit.

Du brauchst danach diese vier Angaben (stehen bei IONOS beim SFTP-Zugang):
**Server/Host**, **Port** (meist 22), **Benutzername**, **Passwort**.

## Schritt 3 – FileZilla installieren und verbinden (5 Min.)

- [ ] FileZilla **Client** nur von der offiziellen Seite laden: <https://filezilla-project.org> → „Download FileZilla Client“. Beim Installieren alle Zusatzangebote (Werbe-Software) **abwählen**.
- [ ] FileZilla öffnen.
- [ ] **Mit der IONOS-Datei:** Menü **Datei → Importieren…** → die heruntergeladene Datei wählen. Dann **Datei → Servermanager** → IONOS-Eintrag → **Verbinden**.
- [ ] **Ohne die Datei:** Oben in die Schnellverbindungs-Leiste eintragen:
      Server: `sftp://` + Host von IONOS, Benutzername, Passwort, Port `22` → **Verbinden**.
- [ ] Beim ersten Mal fragt FileZilla „Unbekannter Hostschlüssel“ → **Immer diesem Server vertrauen** anhaken → **OK**.

Jetzt siehst du **links deinen Computer** und **rechts den IONOS-Webspace**.

## Schritt 4 – Website hochladen (5 Min.)

- [ ] Rechts einen Ordner für die Website anlegen: Rechtsklick → **Verzeichnis erstellen** → Name: `martlsoft`.
- [ ] Rechts per Doppelklick **in den Ordner `martlsoft`** wechseln.
- [ ] Links zum Ordner `Martlsoft-IONOS-Upload` gehen und dort **hinein** wechseln.
- [ ] Links **alles markieren** (Strg + A) und nach rechts ziehen.
- [ ] Warten, bis unten „Erfolgreiche Übertragungen“ steht und nichts mehr unter „Fehlgeschlagene Übertragungen“.

> Wichtig: Den **Inhalt** hochladen, nicht den Ordner selbst. Rechts muss direkt `index.html`, `css`, `img`, `js` usw. stehen.
> Die Datei `.htaccess` ist versteckt. Falls du sie links nicht siehst: Menü **Server → Anzeige versteckter Dateien erzwingen**.

## Schritt 5 – Domain auf den Ordner zeigen lassen (5 Min.)

- [ ] Bei IONOS oben auf **Domains & SSL** klicken.
- [ ] Bei deiner Domain auf das Zahnrad / **Verwenden** bzw. **Ziel ändern** klicken.
- [ ] **Webspace** als Ziel wählen und als Verzeichnis **`/martlsoft`** eintragen → **Speichern**.
- [ ] Bei derselben Domain das **SSL-Zertifikat aktivieren** (bei IONOS-Paketen ist eins inklusive). Ohne Zertifikat funktioniert die Seite nicht, weil sie immer verschlüsselt (https) aufgerufen wird.

Es kann bis zu einer Stunde dauern, bis die Domain auf die neue Seite zeigt.

## Schritt 6 – Testen (5 Min.)

- [ ] `https://deine-domain.de` aufrufen. Die Martlsoft-Startseite erscheint.
- [ ] `http://deine-domain.de` (ohne s) aufrufen. Du wirst automatisch auf `https://` umgeleitet.
- [ ] `https://deine-domain.de/gibtsnicht` aufrufen. Die Seite „404 – Hier ist nichts gelandet“ erscheint.
- [ ] Auf **Datenschutz** klicken: Unter „2. Diese Webseite“ steht **IONOS SE** als Hoster.
- [ ] Eine App öffnen und auf dem Handy anschauen.

## Schritt 7 – Danach

- [ ] Im Play Store als Datenschutz-Link eintragen:
      `https://deine-domain.de/datenschutz.html#maki-volume` (bzw. `#maki-blauklang`, `#maki-translator`)
- [ ] Die GitHub-Testseite kann bleiben oder du schaltest sie ab: Repository → **Settings → Pages → Unpublish site**.

---

## Später etwas ändern

1. Änderung machen lassen (z. B. neue App in `js/apps.js`).
2. Schritt 1 wiederholen (Paket neu erstellen).
3. In FileZilla verbinden und die geänderten Dateien erneut nach `/martlsoft` ziehen → bei der Frage **Überschreiben** wählen.

## Wenn etwas nicht klappt

| Problem | Lösung |
|---|---|
| „Diese Seite ist nicht sicher“ / Zertifikatsfehler | SSL-Zertifikat bei IONOS für die Domain aktivieren (Schritt 5), etwas warten. |
| Es erscheint eine IONOS-Platzhalterseite | Domain zeigt noch nicht auf `/martlsoft` (Schritt 5) oder es dauert noch etwas. |
| Seite ohne Farben/Bilder | Ordner `css`, `img`, `js` fehlen rechts – Schritt 4 wiederholen. |
| „Index of /“ oder Fehler 403 | Du hast den Ordner statt des Inhalts hochgeladen. Rechts muss `index.html` direkt in `/martlsoft` liegen. |
| Verbindung in FileZilla klappt nicht | Port 22 und `sftp://` prüfen, Passwort beim SFTP-Zugang bei IONOS neu setzen. |
