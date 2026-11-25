/* Martlsoft – Seitenlogik. Inhalte der Apps stehen in apps.js. */
(function () {
  let io; // Beobachter fürs Einblenden, siehe observe() unten
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const STATUS = {
    play: { text: "Bei Google Play", cls: "play" },
    bald: { text: "Bald bei Google Play", cls: "" },
    apk: { text: "Als Android-App", cls: "apk" },
    windows: { text: "Für Windows · Download", cls: "win" }
  };

  /* Kopfzeile: beim Scrollen weiß, Menü auf dem Handy */
  const header = $(".header");
  const onScroll = () => header && header.classList.toggle("solid", window.scrollY > 30 || header.dataset.solid === "1");
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const burger = $(".burger"), nav = $(".nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });
  }

  /* Jahr in der Fußzeile */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* Fußzeile: App-Liste */
  const footApps = $("#footApps");
  if (footApps) footApps.innerHTML = APPS.map((a) => `<li><a href="app.html?id=${esc(a.id)}">${esc(a.name)}</a></li>`).join("");

  /* ---------- Startseite ---------- */
  const grid = $("#appGrid");
  if (grid) {
    // Handy im Hero mit allen App-Symbolen
    const home = $("#homeIcons");
    if (home) {
      const icons = APPS.slice(0, 11).map((a) => `<a href="app.html?id=${esc(a.id)}"><img src="${esc(a.icon)}" alt="">${esc(a.name.replace(/^MaKi-|^Maki-/, ""))}</a>`);
      icons.push(`<a href="#apps"><span class="ph">+</span>Bald mehr</a>`);
      home.innerHTML = icons.join("");
    }
    const clock = $("#clock"), date = $("#date");
    const tick = () => {
      const d = new Date();
      if (clock) clock.textContent = d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
      if (date) date.textContent = d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
    };
    tick(); setInterval(tick, 10000);

    // Zahl der Apps hochzählen
    const count = $("#appCount");
    if (count) {
      let n = 0; const target = APPS.length;
      const step = () => { n++; count.textContent = n; if (n < target) setTimeout(step, 180); };
      count.textContent = "0"; setTimeout(step, 500);
    }

    // Filter (erscheinen automatisch, sobald es mehrere Kategorien gibt)
    const cats = [...new Set(APPS.map((a) => a.category))];
    const chips = $("#chips"), search = $("#search");
    let cat = "Alle", q = "";
    if (cats.length > 1) {
      chips.innerHTML = ["Alle", ...cats].map((c) => `<button class="chip${c === "Alle" ? " on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
      chips.addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        cat = b.dataset.cat;
        chips.querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === b));
        render();
      });
    }
    if (search) search.addEventListener("input", () => { q = search.value.trim().toLowerCase(); render(); });

    function card(a) {
      const st = STATUS[a.status] || STATUS.bald;
      return `<a class="card reveal" href="app.html?id=${esc(a.id)}">
        ${a.art ? `<div class="card-art"><img src="${esc(a.art)}" alt="" loading="lazy"></div>` : ""}
        ${a.neu ? `<span class="neu">Neu</span>` : ""}
        <div class="card-top"><img src="${esc(a.icon)}" alt="Symbol ${esc(a.name)}"><div><h3>${esc(a.name)}</h3><span class="tag">${esc(a.tagline)}</span></div></div>
        <p>${esc(a.short)}</p>
        <div class="card-foot"><span class="badge ${st.cls}">${esc(a.badge || st.text)}</span><span class="more">Ansehen</span></div>
      </a>`;
    }
    function render() {
      const list = APPS.filter((a) =>
        (cat === "Alle" || a.category === cat) &&
        (!q || (a.name + " " + a.tagline + " " + a.short + " " + a.category).toLowerCase().includes(q)));
      let html = list.map(card).join("");
      if (!list.length) html = `<div class="empty">Keine App gefunden. Probier einen anderen Suchbegriff.</div>`;
      else if (cat === "Alle" && !q) html += `<div class="card soon reveal"><div class="plus">+</div><b>Weitere Apps in Arbeit</b><span>Schau bald wieder vorbei.</span></div>`;
      grid.innerHTML = html;
      observe();
    }
    render();
  }

  /* Schritt-für-Schritt-Anleitung (Texte aus apps.js dürfen <b>, <a>, <code> enthalten) */
  function guideHtml(g) {
    return `<section class="guide" id="anleitung">
      <div class="guide-head reveal">
        <span class="eyebrow">Schritt für Schritt</span>
        <h2>${esc(g.title)}</h2>
        <p class="lead">${g.intro}</p>
      </div>
      ${g.need ? `<div class="guide-need reveal"><b>Das brauchst du:</b><ul>${g.need.map((n) => `<li>${n}</li>`).join("")}</ul></div>` : ""}
      ${g.tip ? `<div class="guide-tip reveal">💡 ${g.tip}</div>` : ""}
      <ol class="steps">
        ${g.steps.map((s, i) => `<li class="step reveal">
          <span class="num">${i + 1}</span>
          <div><h3>${esc(s.title)}</h3><p>${s.text}</p>${s.note ? `<p class="note">⚠️ ${s.note}</p>` : ""}</div>
        </li>`).join("")}
      </ol>
      ${g.faq ? `<div class="faq reveal"><h3>Häufige Fragen</h3>${g.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join("")}</div>` : ""}
      <p class="guide-help reveal">Du kommst nicht weiter? Schreib mir einfach: <a href="mailto:martlshop.co@gmail.com">martlshop.co@gmail.com</a>. Ich helfe dir gern.</p>
    </section>`;
  }

  /* Download-Bereich für Windows-Programme (Texte aus apps.js dürfen <b> enthalten) */
  function downloadHtml(a) {
    const d = a.download;
    const name = (f) => f.split("/").pop();
    return `<section class="dl" id="download">
      <div class="reveal">
        <span class="eyebrow">Download</span>
        <h2>${esc(a.name)} herunterladen</h2>
        <p class="lead">Version ${esc(d.version)} · ${esc(d.date)} · kostenlos, ohne Werbung, ohne Anmeldung</p>
      </div>
      <div class="dl-grid">
        ${d.files.map((f, i) => `<div class="dl-card reveal${i === 0 ? " main" : ""}">
          <div class="dl-head"><h3>${esc(f.label)}</h3>${f.hint ? `<span class="dl-hint">${esc(f.hint)}</span>` : ""}</div>
          <p>${f.text}</p>
          <a class="btn ${i === 0 ? "btn-lemon" : "btn-blue"}" href="${esc(f.file)}" download>⬇ ${esc(name(f.file))}</a>
          <div class="dl-meta">${esc(f.size)}</div>
          ${f.sha256 ? `<div class="dl-hash"><span>Prüfsumme (SHA-256)</span><code title="Zum Markieren doppelklicken">${esc(f.sha256)}</code></div>` : ""}
        </div>`).join("")}
      </div>
      <div class="dl-info">
        <div class="box reveal"><h3>So geht’s</h3><ol class="dl-steps">${d.steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>
        <div class="box reveal"><h3>Voraussetzungen</h3><p>${esc(d.requirements)}</p>
          <h3>Echtheit prüfen</h3><p>Lade ${esc(a.name)} nur hier von martlsoft.com. Wer sichergehen will: In PowerShell <code>Get-FileHash Dateiname</code> eingeben und mit der Prüfsumme oben vergleichen. Stimmt sie nicht überein, die Datei bitte nicht starten.</p>
          <h3>Lizenz</h3><p>Kostenlos für private und berufliche Nutzung. Weitergabe nur über martlsoft.com – Details in den <a href="lizenz.html">Lizenzbedingungen</a>.</p>
          <p><a href="datenschutz.html#${esc(a.id)}">Datenschutz</a> · <a href="lizenz.html">Lizenz</a> · <a href="impressum.html">Impressum</a> · Fragen: <a href="mailto:martlshop.co@gmail.com">martlshop.co@gmail.com</a></p></div>
      </div>
    </section>`;
  }

  /* ---------- App-Unterseite ---------- */
  const detail = $("#appDetail");
  if (detail) {
    const id = new URLSearchParams(location.search).get("id");
    const a = APPS.find((x) => x.id === id);
    if (!a) {
      $("#appHero").innerHTML = `<h1>App nicht gefunden</h1><p><a class="btn btn-light" href="index.html#apps">Zu allen Apps</a></p>`;
      detail.remove();
    } else {
      document.title = `${a.name} – ${a.tagline} | Martlsoft`;
      const meta = $('meta[name="description"]'); if (meta) meta.content = a.short;
      if (a.art) {
        const hero = $(".hero");
        hero.classList.add("art");
        hero.insertAdjacentHTML("afterbegin", `<img class="hero-bg" src="${esc(a.art)}" alt="">`);
      }
      const st = STATUS[a.status] || STATUS.bald;
      const playBtn = a.status === "windows" && a.download
        ? `<a class="btn btn-lemon" href="#download">⬇ Kostenlos herunterladen</a>`
        : a.status === "play" && a.play
        ? `<a class="btn btn-lemon" href="${esc(a.play)}" target="_blank" rel="noopener">▶ Bei Google Play laden</a>`
        : `<span class="btn btn-light" aria-disabled="true">${a.status === "apk" ? "Noch nicht im Play Store" : "Bald bei Google Play"}</span>`;
      // Windows-Download jetzt, Android-Version angekündigt
      const soonBtn = a.playSoon && a.status === "windows" ? `<span class="btn btn-light" aria-disabled="true">Bald bei Google Play</span>` : "";
      $("#appHero").innerHTML = `
        <a class="crumb" href="index.html#apps">← Alle Apps</a>
        <div class="app-hero">
          <img src="${esc(a.icon)}" alt="Symbol ${esc(a.name)}">
          <div><h1>${esc(a.name)}</h1><div class="tag">${esc(a.tagline)} · ${esc(a.category)}</div>
          <div class="btns">${playBtn}${soonBtn}${a.guide ? `<a class="btn btn-lemon" href="#anleitung">📖 ${esc(a.guide.button || "Anleitung")}</a>` : ""}<a class="btn btn-ghost" href="datenschutz.html#${esc(a.id)}">Datenschutz</a></div></div>
        </div>`;

      const shots = (a.screenshots || []).length
        ? a.screenshots.map((s) => `<img${/-pc-/.test(s) || (a.platform === "windows" && !/-handy-/.test(s)) ? ' class="wide"' : ""} src="${esc(s)}" alt="Screenshot ${esc(a.name)}" loading="lazy">`).join("")
        : [1, 2, 3].map(() => `<div class="shot-ph"><img src="${esc(a.icon)}" alt="">Screenshots folgen</div>`).join("");

      detail.innerHTML = `
        <div class="detail">
          <div>
            <div class="box reveal"><span class="eyebrow">Über die App</span><h2>Das kann ${esc(a.name)}</h2><p class="lead">${a.description}</p></div>
            <div class="box reveal"><h3>Funktionen</h3><ul class="feat">${a.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>
          </div>
          <div>
            ${a.banner ? `<img class="banner reveal" src="${esc(a.banner)}" alt="${esc(a.name)}">` : ""}
            <div class="box reveal" ${a.banner ? "" : 'style="margin-top:0"'}>
              <h3>Auf einen Blick</h3>
              <ul class="checks">
                <li>Keine Werbung</li>
                <li>${a.privacy ? esc(a.privacy) : a.id === "maki-translator" ? "Texte gehen nur zum Übersetzen an die KI" : "Kein Internetzugriff, keine Datensammlung"}</li>
                <li>${a.download ? `Version ${esc(a.download.version)} · ${esc(a.download.date)}` : st.text}</li>
                <li>${a.platformText ? esc(a.platformText) : a.platform === "windows" ? "Für Windows 10 und 11" : "Für Android"}</li>
                ${a.guide ? `<li><a class="guide-link" href="#anleitung">Ausführliche Anleitung</a></li>` : ""}
              </ul>
            </div>
          </div>
        </div>
        ${a.download ? downloadHtml(a) : ""}
        ${a.guide ? guideHtml(a.guide) : ""}
        <div style="margin-top:60px" class="reveal"><span class="eyebrow">Screenshots</span><div class="shots">${shots}</div></div>
        ${APPS.length > 1 ? `<div style="margin-top:50px" class="reveal"><span class="eyebrow">Weitere Apps</span><div class="others">${APPS.filter((x) => x.id !== a.id).map((x) => `<a class="mini" href="app.html?id=${esc(x.id)}"><img src="${esc(x.icon)}" alt=""><span><b>${esc(x.name)}</b><small>${esc(x.tagline)}</small></span></a>`).join("")}</div></div>` : ""}`;
    }
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  function observe() {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    io = io || new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e, i) => { e.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(e); });
  }
  observe();
})();
