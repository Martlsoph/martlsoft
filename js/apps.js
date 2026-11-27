/* =====================================================================
   MARTLSOFT – ALLE APPS
   ---------------------------------------------------------------------
   Neue App hinzufügen:
   1. Einen Block { ... } unten kopieren und anpassen.
   2. Das App-Symbol nach img/apps/ legen (PNG oder SVG, quadratisch).
   3. Screenshots (optional) nach img/screenshots/ legen und bei
      "screenshots" eintragen.
   Die Startseite und die App-Unterseite (app.html?id=...) bauen sich
   dann automatisch.

   Felder:
   id          kurzer Name ohne Leerzeichen, wird Teil der Adresse
   status      "play"  = im Play Store (dann "play" mit Link füllen)
               "bald"  = erscheint bald
               "apk"   = nur als Datei zum Installieren
               "windows" = Windows-Programm zum Herunterladen (dann "download" füllen)
   platform    "android" (Standard) oder "windows"
   download    nur für Windows-Programme: Version, Dateien, Prüfsummen.
               Die Dateien liegen in downloads/<id>/. Prüfsummen stehen
               nach dem Bauen in Veroeffentlichung\SHA256.txt der App.
   neu         true  = bekommt das Etikett „Neu“
   description darf <b>, <i> und <a href="..."> enthalten
   art         Bild oben auf der Karte und Hintergrund der App-Seite
               (img/art/...), darf auch ein Foto (.jpg) sein
   badge       (optional) eigener Text auf der App-Karte statt des Status
   playSoon    (optional) true = zusätzlich „Bald bei Google Play“ (bei status "windows")
   privacy     (optional) eigener Satz unter „Auf einen Blick“ statt „Kein Internetzugriff …“
   platformText (optional) eigener Plattform-Satz unter „Auf einen Blick“
   Screenshots mit „-pc-“ im Namen werden breit, mit „-handy-“ hoch angezeigt.
   ===================================================================== */

const APPS = [
  {
    id: "maki-weather",
    name: "MaKi.WEATHER",
    tagline: "Wetter & Regenradar",
    short: "Wetter für alle deine Orte – Zuhause, Hotel, Urlaub – mit Regenradar vom Deutschen Wetterdienst. Für Windows, bald auch für Android.",
    category: "Alltag",
    platform: "windows",
    icon: "img/apps/maki-weather.svg",
    art: "img/art/wetter.svg",
    status: "windows",
    badge: "Für Windows · bald Android",
    playSoon: true,
    privacy: "Kein Konto, kein Tracking – deine Orte bleiben bei dir",
    platformText: "Für Windows 10 und 11 · bald für Android",
    play: "",
    neu: true,
    description:
      "MaKi.WEATHER zeigt dir das Wetter für die Orte, die dir wichtig sind: dein Zuhause, das Hotel auf der Dienstreise oder den Urlaubsort. Auf einen Blick siehst du Temperatur, Regenrisiko, Wind und Sonnenzeiten, dazu die nächsten 24 Stunden und die 7-Tage-Vorhersage mit klaren Höchst- und Tiefstwerten. Das Regenradar des Deutschen Wetterdienstes zeigt dir, wo es gerade regnet – 12 Stunden zurück und 2 Stunden in die Zukunft. Ohne Konto, ohne Werbung: Deine Orte bleiben auf deinem Gerät. Die Windows-Version kannst du hier kostenlos herunterladen, die Android-Version kommt bald zu Google Play.",
    features: [
      "Aktuelles Wetter, gefühlte Temperatur, Regen, Wind, Luftfeuchte, Luftdruck, UV und Sonne",
      "Stündlich für 24 Stunden und 7-Tage-Vorhersage mit max. und min. Temperatur",
      "Regenradar des Deutschen Wetterdienstes für Deutschland und die Nachbarländer: 12 Stunden Rückblick, 2 Stunden Vorschau, abspielbar",
      "Mehrere Orte als Zuhause, Hotel/Unterwegs, Urlaub oder Sonstiger Ort",
      "Suche nach Ortsname oder Postleitzahl – oder einfach den aktuellen Standort nehmen",
      "Ortszeit mit Zeitzone (z. B. MEZ) für jeden Ort",
      "Deutsch, Englisch, Spanisch, Französisch und Italienisch, hell und dunkel",
      "°C oder °F, km/h, m/s, mph oder Knoten",
      "Kein Konto, keine Werbung, kein Tracking"
    ],
    screenshots: [
      "img/screenshots/maki-weather-pc-1-dashboard.png",
      "img/screenshots/maki-weather-handy-1-wetter.png",
      "img/screenshots/maki-weather-handy-2-radar.png",
      "img/screenshots/maki-weather-handy-4-7tage.png",
      "img/screenshots/maki-weather-handy-5-orte.png",
      "img/screenshots/maki-weather-pc-2-santo-domingo-dunkel.png"
    ],
    download: {
      version: "1.0.12",
      date: "November 2026",
      requirements: "Windows 10 oder 11 (64 Bit) mit Microsoft Edge (vorinstalliert) oder Google Chrome und eine Internetverbindung (für Wetter, Radar und Karte)",
      files: [
        {
          label: "Installieren",
          hint: "empfohlen",
          file: "downloads/maki-weather/MaKi.WEATHER-Setup-1.0.12.exe",
          size: "2,1 MB",
          sha256: "cf5e3db3a0237508367643c0267d09a96b8bc8e4fb7b6c10d0dbe936dde6c574",
          text: "Mit Startmenü-Eintrag und auf Wunsch Desktop-Symbol. Keine Administratorrechte nötig. Entfernen über <b>Einstellungen → Apps</b>."
        },
        {
          label: "Ohne Installation (ZIP)",
          hint: "z. B. für den USB-Stick",
          file: "downloads/maki-weather/MaKi.WEATHER-1.0.12-portable.zip",
          size: "176 KB",
          sha256: "d7f4e967ff21276adaefe8cab670a10b3a38ee92f610740bce41ed08ab65bf56",
          text: "Entpacken und <b>MaKi.WEATHER.exe</b> starten. Nichts wird installiert – zum Entfernen einfach den Ordner löschen."
        }
      ],
      steps: [
        "Datei herunterladen und doppelklicken.",
        "Falls Windows meldet „Der Computer wurde durch Windows geschützt“: auf <b>Weitere Informationen</b> und dann <b>Trotzdem ausführen</b> klicken. Die Warnung kommt, weil die App (noch) nicht digital signiert ist.",
        "Beim Setup dem Assistenten folgen – fertig. MaKi.WEATHER findest du danach im Startmenü.",
        "Beim ersten Start einen Ort suchen (Name oder Postleitzahl) oder auf <b>Aktuellen Standort verwenden</b> klicken."
      ]
    }
  },
  {
    id: "maki-delta",
    name: "MaKi.DELTA",
    tagline: "Dateien & Ordner vergleichen",
    short: "Zeigt dir genau, was sich zwischen zwei Dateien oder Ordnern geändert hat – und gleicht sie auf Wunsch ab. Für Windows.",
    category: "Werkzeuge",
    platform: "windows",
    icon: "img/apps/maki-delta.png",
    art: "img/art/vergleich.svg",
    status: "windows",
    play: "",
    neu: true,
    description:
      "Du hast Notizen, Listen oder Tabellen auf mehreren Rechnern und mit der Zeit laufen die Fassungen auseinander? MaKi.DELTA legt zwei Dateien oder ganze Ordner nebeneinander und zeigt jede Änderung farbig an – bis aufs einzelne Wort. Mit einem Klick übernimmst du Änderungen von links nach rechts oder umgekehrt. Ganz ohne Cloud: Deine Dateien verlassen nie deinen PC.",
    features: [
      "Texte, Markdown und Code Zeile für Zeile, geänderte Wörter hervorgehoben",
      "Änderungen mit → und ← übernehmen, rückgängig machen und speichern",
      "Excel, CSV und ODS Zelle für Zelle – auf Wunsch über eine Schlüsselspalte",
      "Word- und PDF-Dateien: der enthaltene Text wird verglichen",
      "Bilder: nebeneinander, überblenden, wischen oder Pixel-Differenz",
      "MP3-Tags und beliebige Dateien Byte für Byte (Hex)",
      "Ganze Ordner vergleichen und synchronisieren – es wird nie etwas gelöscht",
      "Handbuch in der App, hell und dunkel, komplett offline"
    ],
    screenshots: [
      "img/screenshots/maki-delta-text.png",
      "img/screenshots/maki-delta-tabelle.png",
      "img/screenshots/maki-delta-start.png"
    ],
    download: {
      version: "1.1",
      date: "November 2026",
      requirements: "Windows 10 oder 11 (64 Bit) mit Microsoft Edge (vorinstalliert) oder Google Chrome",
      files: [
        {
          label: "Installieren",
          hint: "empfohlen",
          file: "downloads/maki-delta/MaKi.DELTA-Setup-1.1.exe",
          size: "2,6 MB",
          sha256: "a2a8f66da98f16403797c8d1f627de42817b651a40b5ea940384ef9a390c6a00",
          text: "Mit Startmenü-Eintrag und auf Wunsch Desktop-Symbol. Keine Administratorrechte nötig. Entfernen über <b>Einstellungen → Apps</b>."
        },
        {
          label: "Ohne Installation (ZIP)",
          hint: "z. B. für den USB-Stick",
          file: "downloads/maki-delta/MaKi.DELTA-1.1-portable.zip",
          size: "832 KB",
          sha256: "8d11ec07c6d6e4a543d7060fe91f222734decb373a0fb9cb80b39b866bd02a71",
          text: "Entpacken und <b>MaKi.DELTA.exe</b> starten. Nichts wird installiert – zum Entfernen einfach den Ordner löschen."
        }
      ],
      steps: [
        "Datei herunterladen und doppelklicken.",
        "Falls Windows meldet „Der Computer wurde durch Windows geschützt“: auf <b>Weitere Informationen</b> und dann <b>Trotzdem ausführen</b> klicken. Die Warnung kommt, weil die App (noch) nicht digital signiert ist.",
        "Beim Setup dem Assistenten folgen – fertig. MaKi.DELTA findest du danach im Startmenü.",
        "Zum Ausprobieren in der App oben rechts auf <b>☰</b> und dann <b>Beispiel: Texte</b> klicken."
      ]
    }
  },
  {
    id: "maki-todo",
    name: "MaKi.TODO",
    tagline: "To-Do-Liste",
    short: "Die schlanke To-Do-Liste: eintippen oder einsprechen, das passende Emoji kommt von selbst – antippen, erledigt.",
    category: "Alltag",
    icon: "img/apps/maki-todo.svg",
    art: "img/art/aufgaben.svg",
    status: "bald",
    play: "",
    neu: true,
    description:
      "MaKi.TODO ist eine aufgeräumte To-Do-Liste für den Alltag. Du tippst deine Aufgaben ein – gern mehrere auf einmal, mit Komma getrennt – oder sprichst sie ins Mikrofon. Die App erkennt Wörter wie „anrufen“, „Arzt“, „Garten“ oder „Auto“ und setzt das passende Emoji davor. Offene Aufgaben stehen alphabetisch oben, Erledigtes wandert durchgestrichen nach unten. Bis zu drei Aufgaben markierst du mit einem Stern als <b>„heute dran“</b>, Routinen wie „Pflanzen gießen“ kommen nach dem Abhaken von selbst wieder. Ohne Werbung, ohne Konto, ohne Internet – deine Aufgaben bleiben auf deinem Handy.",
    features: [
      "Schnell eintippen – mehrere Aufgaben mit Komma oder neuer Zeile",
      "Großer Mikrofon-Knopf zum Einsprechen",
      "Passendes Emoji automatisch: 📞 anrufen, 🩺 Arzt, 🌿 Garten, 🚗 Auto, 🛒 Einkaufen – jederzeit änderbar",
      "Emoji-Schnellauswahl und die normale Emoji-Tastatur",
      "Alphabetisch sortiert, Umlaute richtig einsortiert",
      "Antippen hakt ab: durchgestrichen, blasser und unten gesammelt",
      "⭐ „Heute dran“: bis zu drei Aufgaben zitronengelb oben angepinnt",
      "🔁 Wiederholen: täglich, alle paar Tage oder wöchentlich – die Aufgabe kommt von selbst wieder",
      "Emoji-Filter: per Tipp nur ein Thema anzeigen, z. B. alle Anrufe",
      "Wischen wie im Mail-Postfach: rechts abhaken, links bearbeiten oder auf morgen verschieben",
      "Erledigte Aufgaben mit einem Tipp aufräumen (mit Sicherheitsfrage), Rückgängig nach jeder Aktion",
      "Alles bleibt auf dem Handy – kein Konto, kein Internet"
    ],
    screenshots: [
      "img/screenshots/maki-todo-liste.png",
      "img/screenshots/maki-todo-emoji.png",
      "img/screenshots/maki-todo-wischen.png",
      "img/screenshots/maki-todo-bearbeiten.png",
      "img/screenshots/maki-todo-erledigt.png"
    ]
  },
  {
    id: "maki-shop",
    name: "MaKi.SHOP",
    tagline: "Einkaufsliste",
    short: "Die schnelle Einkaufsliste: eintippen oder einsprechen, im Laden antippen – erledigt.",
    category: "Alltag",
    icon: "img/apps/maki-shop.svg",
    art: "img/art/einkauf.svg",
    status: "bald",
    play: "",
    neu: true,
    description:
      "MaKi.SHOP ist eine schlanke Einkaufsliste ohne Schnickschnack. Du tippst deine Artikel ein – gern mehrere auf einmal, mit Komma getrennt – oder sprichst sie einfach ins Mikrofon. Die Liste sortiert sich von selbst alphabetisch. Im Laden tippst du einen Artikel an: Er wird durchgestrichen und wandert nach unten, sodass oben nur noch steht, was du noch brauchst. Ohne Werbung, ohne Konto, ohne Internet – deine Liste bleibt auf deinem Handy.",
    features: [
      "Schnell eintippen – mehrere Artikel mit Komma oder neuer Zeile",
      "Großer Mikrofon-Knopf: „Milch, Brot und Eier“ wird zu drei Artikeln",
      "Automatisch alphabetisch sortiert, Umlaute richtig einsortiert",
      "Antippen hakt ab: durchgestrichen, blasser und unten gesammelt",
      "Nochmal antippen – der Artikel ist wieder oben",
      "Alle erledigten Artikel mit einem Tipp löschen (mit Sicherheitsfrage)",
      "Keine doppelten Einträge, Rückgängig nach jeder Aktion",
      "Anleitung direkt in der App – im ☰-Menü, dazu Infos, Kontakt und Datenschutz",
      "Alles bleibt auf dem Handy – kein Konto, kein Internet"
    ],
    screenshots: [
      "img/screenshots/maki-shop-liste.png",
      "img/screenshots/maki-shop-menue.png",
      "img/screenshots/maki-shop-anleitung.png",
      "img/screenshots/maki-shop-ueber.png"
    ]
  },
  {
    id: "maki-files",
    name: "MaKi.FILES",
    tagline: "Dateimanager",
    short: "Der aufgeräumte Dateimanager: Ordner durchsuchen, sortieren, Dateien finden und so teilen, wie du es willst.",
    category: "Werkzeuge",
    icon: "img/apps/maki-files.svg",
    art: "img/art/dateien.svg",
    status: "bald",
    play: "",
    neu: true,
    description:
      "MaKi.FILES zeigt die Ordner und Dateien auf deinem Handy übersichtlich an – mit eigenen Farben für Bilder, PDFs, Dokumente, Musik, Videos und Archive. Du sortierst nach Name, Größe, Datum oder Typ, suchst im aktuellen Ordner und filterst mit einem Tipp nach Dateiart. Wichtige Ordner wie <b>Download</b> und <b>Documents</b> bleiben oben angeheftet. Das Besondere: Beim Teilen bestimmst <b>du</b> die Reihenfolge – WhatsApp, E-Mail, Bluetooth oder „In Ordner speichern“ stehen dort, wo du sie haben willst. Ohne Werbung, ohne Internet, ohne Datensammlung.",
    features: [
      "Übersichtliche Liste mit Größe, Anzahl der Elemente und Datum",
      "Eigene Symbole und Farben für Bilder, PDF, Dokumente, Audio, Video und Archive",
      "Sortieren nach Name, Größe, Datum oder Typ – Ordner auf Wunsch zuerst",
      "Suchen im aktuellen Ordner plus Filter: Bilder, Dokumente, Audio, Video, Archive",
      "Ordner oben anheften – Download und Documents sind es schon",
      "Mehrere Dateien auswählen und gemeinsam teilen oder exportieren",
      "Eigener Teilen-Dialog mit frei wählbarer Reihenfolge",
      "Kopie in einen Ordner deiner Wahl – auch SD-Karte und USB-Stick",
      "Details mit Typ, Größe, Datum und Pfad",
      "Kein Internet, keine Werbung, keine Datensammlung"
    ],
    screenshots: [
      "img/screenshots/maki-files-ordner.png",
      "img/screenshots/maki-files-suche.png",
      "img/screenshots/maki-files-teilen.png",
      "img/screenshots/maki-files-sortieren.png",
      "img/screenshots/maki-files-details.png"
    ]
  },
  {
    id: "maki-text",
    name: "MaKi.TEXT",
    tagline: "Texteditor & Dokument-Viewer",
    short: "Texte bearbeiten und Word-, Excel- und PDF-Dateien lesen – schnell, offline und ohne Werbung.",
    category: "Werkzeuge",
    icon: "img/apps/maki-text.svg",
    art: "img/art/text.svg",
    status: "bald",
    play: "",
    description:
      "MaKi.TEXT ist der schlanke Texteditor für dein Handy: Notizen, Listen, Konfigurationsdateien oder Markdown öffnen, bearbeiten und speichern – mit Zeilennummern, Suchen &amp; Ersetzen und der passenden Zeichenkodierung. Windows-Dateien bleiben dabei, wie sie waren (Umlaute, Zeilenenden). Dazu liest die App Word-Dokumente, Excel-Tabellen und PDFs, damit du schnell nachschauen und kopieren kannst, ohne eine große Office-App zu starten. Ohne Werbung, ohne Konto, ohne Internet – deine Dateien bleiben auf deinem Handy.",
    features: [
      "Textdateien öffnen, bearbeiten und speichern (TXT, Markdown, JSON, XML, CSV, INI …)",
      "Kodierung und Zeilenende bleiben beim Speichern erhalten",
      "Zeilennummern, Zeilenumbruch und Schriftgröße per Tipp",
      "Suchen &amp; Ersetzen mit Treffer-Zähler, Rückgängig und Wiederholen",
      "Gehe zu Zeile, Zeile oder Absatz kopieren",
      "Word-Dokumente (DOCX) lesen, durchsuchen und als Text sichern",
      "Excel-Tabellen (XLSX) mit Tabellenblättern und Zellleiste ansehen",
      "PDFs als Text oder als Originalseiten",
      "„Öffnen mit …“ aus anderen Apps, zuletzt geöffnete Dateien",
      "Kein Internet, keine Werbung, keine Datensammlung"
    ],
    screenshots: [
      "img/screenshots/maki-text-editor.png",
      "img/screenshots/maki-text-suche.png",
      "img/screenshots/maki-text-excel.png",
      "img/screenshots/maki-text-pdf.png",
      "img/screenshots/maki-text-start.png"
    ]
  },
  {
    id: "maki-volume",
    name: "MaKi.VOL",
    tagline: "Lautstärke-Boost",
    short: "Mehr Lautstärke für dein Handy – über das normale Maximum hinaus.",
    category: "Audio",
    icon: "img/apps/maki-volume.png",
    art: "img/art/lautstaerke.svg",
    banner: "img/apps/maki-volume-titel.png",
    status: "bald",
    play: "",
    neu: true,
    description:
      "Dein Handy ist selbst auf voller Lautstärke zu leise? MaKi.VOL hebt den Ton über das normale Maximum hinaus an – für Musik, Videos, Hörbücher und Podcasts. Ohne Werbung und ohne Internet.",
    features: [
      "Großer Ein/Aus-Knopf und ein Regler bis +20 dB",
      "Schnellwahl-Stufen: 25 %, 50 %, 75 %, 100 %",
      "Kachel für die Schnelleinstellungen",
      "Benachrichtigung mit „– 10 %“, „Aus“ und „+ 10 %“",
      "Kopfhörer-Schutz begrenzt den Boost automatisch",
      "Startet auf Wunsch nach dem Neustart wieder"
    ],
    screenshots: [
      "img/screenshots/maki-volume-boost-an.png",
      "img/screenshots/maki-volume-benachrichtigung.png",
      "img/screenshots/maki-volume-einstellungen.png",
      "img/screenshots/maki-volume-boost-aus.png"
    ]
  },
  {
    id: "maki-blauklang",
    name: "MaKi.SOUND",
    tagline: "Musik- & Video-Player",
    short: "Musik- und Video-Player für deine eigenen Dateien – mit Playlists.",
    category: "Audio",
    icon: "img/apps/maki-blauklang.svg",
    art: "img/art/musik.svg",
    status: "bald",
    play: "",
    description:
      "MaKi.SOUND spielt die Musik und Videos ab, die auf deinem Handy liegen. Mit Playlists, Wiedergabe im Hintergrund und einer aufgeräumten Oberfläche in Blau. Deine Dateien verlassen dabei nie dein Gerät.",
    features: [
      "Spielt Musik und Videos von deinem Gerät",
      "Eigene Playlists anlegen und importieren",
      "Wiedergabe im Hintergrund und auf dem Sperrbildschirm",
      "Keine Werbung, kein Internetzugriff"
    ],
    screenshots: [
      "img/screenshots/maki-blauklang-player.png",
      "img/screenshots/maki-blauklang-playlists.png",
      "img/screenshots/maki-blauklang-interpreten.png",
      "img/screenshots/maki-blauklang-titel.png",
      "img/screenshots/maki-blauklang-einstellungen.png"
    ]
  },
  {
    id: "maki-translator",
    name: "MaKi.TRANS",
    tagline: "Übersetzen wie im Chat",
    short: "Übersetzt deine Nachrichten locker formuliert – mit einem Tipp an WhatsApp, Messenger, Instagram & Co. Antworten zurück ins Deutsche.",
    category: "Kommunikation",
    icon: "img/apps/maki-translator.svg",
    art: "img/art/reise.svg",
    status: "apk",
    play: "",
    description:
      "MaKi.TRANS übersetzt deine Nachrichten in dominikanisches Spanisch, Englisch, Französisch, Russisch und Tschechisch – so locker formuliert, wie man im Chat schreibt. Du tippst oder sprichst einfach auf Deutsch. Die fertige Übersetzung schickst du mit einem Tipp an WhatsApp oder über <b>Teilen …</b> an Messenger, Instagram, LinkedIn, Telegram oder per SMS. Antworten aus WhatsApp teilst du direkt an die App und liest sie auf Deutsch. Die Übersetzung erledigt die <a class=\"guide-link\" href=\"#anleitung\">KI Claude von Anthropic mit deinem eigenen Schlüssel</a>.",
    features: [
      "Dominikanisches Spanisch, Englisch, Französisch, Russisch, Tschechisch",
      "Tippen oder einfach ins Mikro sprechen",
      "Ton wählbar: locker wie unter Freunden oder höflich",
      "Mit einem Tipp an WhatsApp – oder über „Teilen …“ an Messenger, Instagram, LinkedIn, Telegram und SMS",
      "Antwort aus WhatsApp teilen und sofort auf Deutsch lesen",
      "Zurück-Check, Slang-Erklärungen und Vorlesen",
      "Anleitung in der App auf Deutsch, Englisch, Französisch, Russisch und Tschechisch",
      "Dein API-Schlüssel und dein Verlauf bleiben nur auf deinem Handy"
    ],
    screenshots: [
      "img/screenshots/maki-translator-uebersetzen.png",
      "img/screenshots/maki-translator-menue.png",
      "img/screenshots/maki-translator-anleitung.png",
      "img/screenshots/maki-translator-ueber.png"
    ],
    guide: {
      button: "Anleitung: Schlüssel einrichten",
      title: "So richtest du MaKi.TRANS ein",
      intro: "Damit die App übersetzen kann, brauchst du einmalig einen eigenen „Schlüssel“ von Anthropic, der Firma hinter der KI Claude. Das ist wie ein Prepaid-Guthaben fürs Übersetzen. Es dauert etwa 10 Minuten und du musst es nur ein einziges Mal machen.",
      need: ["Dein Handy mit MaKi.TRANS", "Eine E-Mail-Adresse", "Eine Kreditkarte oder Debitkarte für das Guthaben (z. B. 5 $)"],
      tip: "Am bequemsten machst du die Schritte 1 bis 4 am Computer und schickst dir den Schlüssel dann z. B. per E-Mail aufs Handy. Es geht aber auch komplett am Handy.",
      steps: [
        {
          title: "Konto bei Anthropic anlegen",
          text: "Öffne die Seite <a href=\"https://console.anthropic.com\" target=\"_blank\" rel=\"noopener\">console.anthropic.com</a>. Tippe auf <b>Sign up</b> (Registrieren) und melde dich mit deiner E-Mail-Adresse an. Du bekommst eine E-Mail mit einem Link, den du anklickst. Die Seite ist auf Englisch, keine Sorge, du brauchst nur wenige Knöpfe."
        },
        {
          title: "Guthaben aufladen",
          text: "Klicke im Menü links auf <b>Billing</b> (Abrechnung) und dann auf <b>Add credits</b> bzw. <b>Buy credits</b> (Guthaben kaufen). Gib deine Karte ein und lade z. B. <b>5 $</b> auf. Das reicht für einige Hundert Übersetzungen.",
          note: "Es gibt kein Abo. Es wird nur abgebucht, was du aufgeladen hast."
        },
        {
          title: "Schlüssel erstellen",
          text: "Klicke links auf <b>API Keys</b> und dann auf <b>Create Key</b> (Schlüssel erstellen). Gib ihm einen Namen, z. B. <b>Mein Handy</b>, und klicke auf <b>Create</b> (Erstellen)."
        },
        {
          title: "Schlüssel kopieren",
          text: "Jetzt wird dein Schlüssel angezeigt, eine lange Zeichenkette, die mit <code>sk-ant-</code> beginnt. Klicke auf <b>Copy</b> (Kopieren).",
          note: "Wichtig: Der Schlüssel wird nur dieses eine Mal angezeigt. Kopiere ihn sofort oder schick ihn dir per E-Mail aufs Handy."
        },
        {
          title: "Schlüssel in der App einfügen",
          text: "Öffne MaKi.TRANS. Tippe oben rechts auf das Menü <b>≡</b> und dann auf <b>API-Schlüssel</b>. Halte den Finger lange in das Feld, tippe auf <b>Einfügen</b> und dann auf <b>Speichern</b>."
        },
        {
          title: "Fertig – los geht’s!",
          text: "Schreib oder sprich einen Satz auf Deutsch, wähle die Sprache und tippe auf <b>Übersetzen</b>. Mit <b>An WhatsApp</b> landet die Übersetzung direkt im Chat, mit <b>Teilen …</b> in Messenger, Instagram, LinkedIn und anderen Apps. Eine ausführliche Anleitung in 5 Sprachen findest du in der App unter <b>≡ → Anleitung</b>."
        }
      ],
      faq: [
        { q: "Was kostet das?", a: "Eine Übersetzung kostet ungefähr 1 Cent. Mit 5 $ kommst du also sehr weit. Du zahlst direkt an Anthropic, nicht an mich." },
        { q: "Kann es plötzlich teuer werden?", a: "Nein. Es wird nur das Guthaben verbraucht, das du selbst aufgeladen hast. Zusätzlich kannst du unter <b>Limits</b> eine Monatsgrenze festlegen." },
        { q: "Ist mein Schlüssel sicher?", a: "Der Schlüssel wird nur auf deinem Handy gespeichert. Gib ihn niemandem weiter, denn wer ihn hat, kann dein Guthaben verbrauchen." },
        { q: "Ich habe den Schlüssel verloren. Was nun?", a: "Kein Problem. Erstelle einfach unter <b>API Keys</b> einen neuen (Schritt 3) und füge ihn in der App ein. Den alten kannst du dort löschen." },
        { q: "Die App sagt, das Guthaben ist leer.", a: "Dann lade unter <b>Billing</b> wieder etwas auf (Schritt 2). Der Schlüssel bleibt gleich, du musst in der App nichts ändern." },
        { q: "Geht das auch mit Facebook?", a: "Mit dem Facebook Messenger ja, über <b>Teilen …</b>. Die normale Facebook-App lässt keinen vorausgefüllten Text zu. Dort tippst du auf <b>Alles kopieren</b> und fügst den Text selbst ein. Bei LinkedIn landet geteilter Text als neuer Beitrag. Für Privatnachrichten dort ebenfalls kopieren und einfügen." }
      ]
    }
  },
  {
    id: "maki-msg",
    name: "MaKi.MSG",
    tagline: "SMS groß & einfach",
    short: "SMS und MMS mit großer Schrift und großen Knöpfen – ohne Werbung, ohne Internet.",
    category: "Kommunikation",
    icon: "img/apps/maki-msg.png",
    art: "img/art/reise.svg",
    banner: "img/apps/maki-msg-titel.png",
    status: "bald",
    play: "",
    neu: true,
    description:
      "MaKi.MSG ersetzt die Nachrichten-App auf deinem Handy: große Schrift, große Knöpfe, klare Farben. SMS und Bild-Nachrichten (MMS) schreiben und empfangen, Sicherheitscodes mit einem Tipp kopieren, Nachrichten später senden und Spam aussortieren. Ohne Werbung und ohne Internet – deine Nachrichten bleiben auf deinem Handy.",
    features: [
      "Große Schrift in vier Stufen, hell oder dunkel",
      "SMS, Bilder (MMS) und Gruppen-Nachrichten, zwei SIM-Karten",
      "Sicherheitscodes mit einem Tipp kopieren – auch aus der Benachrichtigung",
      "Später senden und eigene Schnellantworten",
      "Spam-Schutz und Nummern blockieren",
      "Übersetzen im Chat zusammen mit MaKi.TRANS",
      "Datensicherung in eine Datei, die du selbst wählst"
    ],
    screenshots: [
      "img/screenshots/maki-msg-unterhaltungen.png",
      "img/screenshots/maki-msg-code-kopieren.png",
      "img/screenshots/maki-msg-uebersetzen.png",
      "img/screenshots/maki-msg-gruppe-mit-bild.png",
      "img/screenshots/maki-msg-spaeter-senden.png",
      "img/screenshots/maki-msg-einstellungen.png"
    ]
  },
  {
    id: "maki-news",
    name: "MaKi.NEWS",
    tagline: "Deine Nachrichten, deine Quellen",
    short: "Nachrichten aus den Quellen, die du selbst wählst – ohne Algorithmus, ohne Werbung, ohne Konto.",
    category: "Lesen",
    icon: "img/apps/maki-news.svg",
    art: "img/art/text.svg",
    status: "bald",
    play: "",
    neu: true,
    privacy: "Kein Konto, kein Tracking – Quellen und Artikel bleiben auf deinem Handy",
    description:
      "MaKi.NEWS sammelt die Artikel deiner Lieblingsseiten an einem Ort. Du gibst einfach die Adresse einer Webseite ein, die App findet den Nachrichten-Feed selbst. Sortiere die Quellen nach Themen, blende Paywall-Artikel und doppelte Meldungen aus und lies alles im aufgeräumten Lesemodus. Mit einem Wisch nach links landet ein Artikel im Archiv, nach rechts bei „Lesenswert“ – dort bleibt er samt Bild dauerhaft und auch offline lesbar. Kein Algorithmus entscheidet, was du siehst: nur deine Quellen, neueste zuerst.",
    features: [
      "Quellen per Webseiten-Adresse hinzufügen – RSS- und Atom-Feeds werden automatisch gefunden",
      "Eigene Themen als Tabs, Aktualisieren durch Herunterziehen",
      "Lesemodus mit Bild, Autor und Lesezeit – ohne Werbung und Seitenballast",
      "Paywall-Erkennung, Block- und Boost-Stichwörter, doppelte Meldungen zusammengefasst",
      "Wischen: links ins Archiv, rechts „Lesenswert“ – mit Rückgängig",
      "Suche über alle Artikel und „Mehr zum Thema“ aus anderen Quellen",
      "Offline lesen und Quellen als Datei sichern oder übertragen",
      "Deutsch, Englisch, Spanisch, Französisch und Italienisch"
    ],
    screenshots: []
  }
];
