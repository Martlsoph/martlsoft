/* =====================================================================
   MARTELSOFT – ALLE APPS
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
   neu         true  = bekommt das Etikett „Neu“
   art         Bild oben auf der Karte und Hintergrund der App-Seite
               (img/art/...), darf auch ein Foto (.jpg) sein
   ===================================================================== */

const APPS = [
  {
    id: "maki-volume",
    name: "MaKi-Volume",
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
      "Dein Handy ist selbst auf voller Lautstärke zu leise? MaKi-Volume hebt den Ton über das normale Maximum hinaus an – für Musik, Videos, Hörbücher und Podcasts. Ohne Werbung und ohne Internet.",
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
    name: "MaKi-Blauklang",
    tagline: "Musik- & Video-Player",
    short: "Musik- und Video-Player für deine eigenen Dateien – mit Playlists.",
    category: "Audio",
    icon: "img/apps/maki-blauklang.svg",
    art: "img/art/musik.svg",
    status: "bald",
    play: "",
    description:
      "MaKi-Blauklang spielt die Musik und Videos ab, die auf deinem Handy liegen. Mit Playlists, Wiedergabe im Hintergrund und einer aufgeräumten Oberfläche in Blau. Deine Dateien verlassen dabei nie dein Gerät.",
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
    name: "Maki-Translator",
    tagline: "Übersetzen wie im Chat",
    short: "Übersetzt deine Nachrichten locker formuliert – und Antworten zurück ins Deutsche.",
    category: "Kommunikation",
    icon: "img/apps/maki-translator.svg",
    art: "img/art/reise.svg",
    status: "apk",
    play: "",
    description:
      "Der Maki-Translator übersetzt deine Nachrichten in dominikanisches Spanisch, Englisch, Französisch, Russisch und Tschechisch – so locker formuliert, wie man im Chat schreibt. Antworten übersetzt er zurück ins Deutsche. Die Übersetzung erledigt die KI Claude von Anthropic mit deinem eigenen Schlüssel.",
    features: [
      "Dominikanisches Spanisch, Englisch, Französisch, Russisch, Tschechisch",
      "Natürlicher Chat-Ton statt steifer Übersetzung",
      "Antworten mit einem Tipp zurück ins Deutsche",
      "Dein API-Schlüssel bleibt nur auf deinem Handy"
    ],
    screenshots: []
  }
];
