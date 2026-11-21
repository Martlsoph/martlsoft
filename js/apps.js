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
   ===================================================================== */

const APPS = [
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
      version: "1.0",
      date: "November 2026",
      requirements: "Windows 10 oder 11 (64 Bit) mit Microsoft Edge (vorinstalliert) oder Google Chrome",
      files: [
        {
          label: "Installieren",
          hint: "empfohlen",
          file: "downloads/maki-delta/MaKi.DELTA-Setup-1.0.exe",
          size: "2,6 MB",
          sha256: "5447b0529972af7683f3a173198ef4195f37452521998f709ca70fa519d65dd9",
          text: "Mit Startmenü-Eintrag und auf Wunsch Desktop-Symbol. Keine Administratorrechte nötig. Entfernen über <b>Einstellungen → Apps</b>."
        },
        {
          label: "Ohne Installation (ZIP)",
          hint: "z. B. für den USB-Stick",
          file: "downloads/maki-delta/MaKi.DELTA-1.0-portable.zip",
          size: "827 KB",
          sha256: "cff658db03a78924da3c660dc4138fd61154754ba1e8dfde2f1fc17d14f14c41",
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
    screenshots: []
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
    screenshots: []
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
    screenshots: [],
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
  }
];
