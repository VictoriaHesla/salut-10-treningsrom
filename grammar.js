const activityProgressKey = "salut10-module1-activity-progress-v1";
const completedActivities = loadCompletedActivities();

injectStationStyles();
enhancePossessivePractice();
insertExtraPossessiveRuleCards();
insertExtraPasseComposePractice();
insertEtreVerbFigures();
setupStationTabs();
setupActivityChecks();
setupRetryClearing();
markCompletedActivityCards();

function injectStationStyles() {
  if (document.querySelector("#stationStyles")) return;

  const styles = document.createElement("style");
  styles.id = "stationStyles";
  styles.textContent = `
    .module-grid.single-module { margin-bottom: 18px; }
    .station-nav { position: sticky; top: 10px; z-index: 20; align-items: stretch; }
    .station-nav a { justify-items: start; gap: 6px; text-align: left; transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease; }
    .station-nav a:hover, .station-nav a:focus-visible { transform: translateY(-2px); border-color: var(--primary); box-shadow: 0 14px 28px rgba(70, 89, 126, 0.14); outline: none; }
    .station-nav a.active { color: white; background: linear-gradient(135deg, #2563eb, #0f766e); border-color: transparent; }
    .station-link-content { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center; width: 100%; }
    .station-step { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #e0f2fe; color: #075985; font-weight: 900; }
    .station-nav a.active .station-step { background: white; color: #1d4ed8; }
    .station-link-title { display: block; font-weight: 900; line-height: 1.1; }
    .station-link-subtitle { display: block; margin-top: 3px; font-size: 0.82rem; color: var(--muted); line-height: 1.25; }
    .station-nav a.active .station-link-subtitle { color: rgba(255, 255, 255, 0.82); }
    .station-panel { scroll-margin-top: 110px; }
    .station-panel[hidden] { display: none !important; }
    .station-panel.is-active { animation: stationIn 0.22s ease-out; }
    .station-next-row { display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px; }
    .station-next-button { min-height: 46px; padding: 12px 16px; border: 0; border-radius: 8px; color: white; background: var(--primary); font-weight: 900; cursor: pointer; }
    .station-next-button.secondary { color: var(--primary-dark); background: white; border: 1px solid var(--line); }
    .verb-participle-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 12px 0; }
    .verb-participle-list span { display: flex; justify-content: space-between; gap: 10px; padding: 8px 10px; border-radius: 8px; background: white; border: 1px solid var(--line); }
    .verb-participle-list strong { color: var(--primary-dark); }
    .activity-complete { outline: 2px solid #86efac; outline-offset: 2px; }
    @keyframes stationIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 880px) { .station-nav { position: static; } .verb-participle-list { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(styles);
}

function setupStationTabs() {
  const stationOrder = ["verbverksted", "eiendomsord", "passe-compose", "oppsummering"];
  const stationLabels = {
    "verbverksted": { number: "1", title: "Verb", subtitle: "30 oppgaver" },
    "eiendomsord": { number: "2", title: "Eiendomsord", subtitle: "tabell og øving" },
    "passe-compose": { number: "3", title: "Passé composé", subtitle: "être og partisipp" },
    "oppsummering": { number: "4", title: "Reiseruta", subtitle: "låses opp til slutt" }
  };
  const panels = stationOrder.map((id) => document.getElementById(id)).filter(Boolean);
  const links = [...document.querySelectorAll(".station-nav a")]
    .filter((link) => stationOrder.includes(link.getAttribute("href")?.replace("#", "")));

  if (!panels.length || !links.length) return;

  panels.forEach((panel) => panel.classList.add("station-panel"));

  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    const label = stationLabels[id];
    const emoji = link.textContent.trim().split(" ")[0];
    link.innerHTML = `
      <span class="station-link-content">
        <span class="station-step">${label.number}</span>
        <span>
          <span class="station-link-title">${emoji} ${label.title}</span>
          <span class="station-link-subtitle">${label.subtitle}</span>
        </span>
      </span>
    `;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showStation(id, true);
    });
  });

  panels.forEach((panel, index) => {
    if (panel.querySelector(".station-next-row")) return;
    const row = document.createElement("div");
    row.className = "station-next-row";
    const previousId = stationOrder[index - 1];
    const nextId = stationOrder[index + 1];

    if (previousId) row.appendChild(makeStationButton(previousId, "← Forrige stasjon", "secondary"));
    if (nextId) row.appendChild(makeStationButton(nextId, nextId === "oppsummering" ? "Gå til Reiseruta →" : "Neste stasjon →"));
    if (row.children.length) panel.appendChild(row);
  });

  window.addEventListener("hashchange", () => {
    const id = window.location.hash.replace("#", "");
    if (stationOrder.includes(id)) showStation(id, false);
  });

  const start = stationOrder.includes(window.location.hash.replace("#", ""))
    ? window.location.hash.replace("#", "")
    : stationOrder[0];
  showStation(start, false);

  function makeStationButton(id, label, extraClass = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `station-next-button ${extraClass}`.trim();
    button.textContent = label;
    button.addEventListener("click", () => showStation(id, true));
    return button;
  }

  function showStation(id, updateHash) {
    stationOrder.forEach((stationId) => {
      const panel = document.getElementById(stationId);
      const link = document.querySelector(`.station-nav a[href="#${stationId}"]`);
      const active = stationId === id;

      if (panel) {
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      }

      if (link) {
        link.classList.toggle("active", active);
        link.setAttribute("aria-current", active ? "step" : "false");
      }
    });

    if (updateHash) history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function enhancePossessivePractice() {
  const possessiveCards = document.querySelectorAll("#eiendomsord .activity-card");
  const chooseCard = possessiveCards[0];
  const findCard = possessiveCards[2];

  if (chooseCard && !chooseCard.dataset.enhanced) {
    chooseCard.dataset.enhanced = "true";
    chooseCard.innerHTML = `
      <h3>🎯 Velg riktig eiendomsord</h3>
      <div class="activity-row"><label>___ frère est à Paris.</label><select data-answer="mon"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <div class="activity-row"><label>___ soeur habite en Corse.</label><select data-answer="ma"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <div class="activity-row"><label>___ amis visitent Meaux.</label><select data-answer="mes"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <div class="activity-row"><label>___ père travaille à Lyon.</label><select data-answer="ton"><option></option><option>ton</option><option>ta</option><option>tes</option></select></div>
      <div class="activity-row"><label>___ mère aime la Guyane.</label><select data-answer="ta"><option></option><option>ton</option><option>ta</option><option>tes</option></select></div>
      <div class="activity-row"><label>___ parents voyagent souvent.</label><select data-answer="tes"><option></option><option>ton</option><option>ta</option><option>tes</option></select></div>
      <div class="activity-row"><label>___ école est près de la gare.</label><select data-answer="son"><option></option><option>son</option><option>sa</option><option>ses</option></select></div>
      <div class="activity-row"><label>___ région est belle.</label><select data-answer="notre"><option></option><option>notre</option><option>nos</option><option>votre</option></select></div>
      <div class="activity-row"><label>___ photos sont jolies.</label><select data-answer="nos"><option></option><option>notre</option><option>nos</option><option>votre</option></select></div>
      <div class="activity-row"><label>Ils parlent de ___ vacances.</label><select data-answer="leurs"><option></option><option>leur</option><option>leurs</option><option>ses</option></select></div>
      <button class="check-button" data-check="possessifs-1" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    `;
  }

  if (findCard && !findCard.dataset.enhanced) {
    findCard.dataset.enhanced = "true";
    findCard.innerHTML = `
      <h3>🔎 Finn og forstå eiendomsord</h3>
      <p>Les postkortet. Finn eiendomsord i teksten, og skriv hva de betyr på norsk.</p>
      <div class="mini-text">Salut Inès! Je suis en Guyane avec ma famille. Notre hôtel est petit, mais très sympa. Mon frère adore la forêt, et ma mère prend beaucoup de photos. Demain, nous allons visiter une école. Son directeur parle français et créole. Mes amis à Meaux veulent voir nos photos quand nous rentrons. Et toi, comment sont tes vacances?</div>
      <div class="activity-row"><label>Fransk eiendomsord 1</label><input data-answer="notre|mon|ma|son|mes|nos|tes" autocomplete="off"></div>
      <div class="activity-row"><label>Hva betyr det på norsk?</label><input data-answer="vår|vart|mitt|min|hans|hennes|mine|våre|vare|dine" autocomplete="off"></div>
      <div class="activity-row"><label>Fransk eiendomsord 2</label><input data-answer="notre|mon|ma|son|mes|nos|tes" autocomplete="off"></div>
      <div class="activity-row"><label>Hva betyr det på norsk?</label><input data-answer="vår|vart|mitt|min|hans|hennes|mine|våre|vare|dine" autocomplete="off"></div>
      <div class="activity-row"><label>Fransk eiendomsord 3</label><input data-answer="notre|mon|ma|son|mes|nos|tes" autocomplete="off"></div>
      <div class="activity-row"><label>Hva betyr det på norsk?</label><input data-answer="vår|vart|mitt|min|hans|hennes|mine|våre|vare|dine" autocomplete="off"></div>
      <button class="check-button" data-check="possessifs-3" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    `;
  }
}

function insertExtraPossessiveRuleCards() {
  const grid = document.querySelector("#eiendomsord .activity-grid");
  if (!grid || document.querySelector("[data-check='possessifs-5']")) return;

  grid.insertAdjacentHTML("beforeend", `
    <article class="activity-card">
      <h3>🧠 Forstå regelen: hvem styrer?</h3>
      <p>Det er substantivet etter eiendomsordet som bestemmer formen.</p>
      <div class="activity-row"><label>Anne har en skole. Det heter:</label><select data-answer="son école"><option></option><option>sa école</option><option>son école</option><option>ses école</option></select></div>
      <div class="activity-row"><label>Lucas har en skole. Det heter:</label><select data-answer="son école"><option></option><option>sa école</option><option>son école</option><option>ses école</option></select></div>
      <div class="activity-row"><label>Hvorfor er begge like?</label><select data-answer="école starter med vokal"><option></option><option>fordi eieren er gutt</option><option>fordi eieren er jente</option><option>école starter med vokal</option></select></div>
      <button class="check-button" data-check="possessifs-5" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>⚖️ Som med adjektiv: kjønn og tall</h3>
      <p>Eiendomsord må passe med ordet etter, omtrent slik adjektiv må passe med substantivet.</p>
      <div class="activity-row"><label>livre er hankjønn entall: ___ livre</label><select data-answer="mon"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <div class="activity-row"><label>voiture er hunkjønn entall: ___ voiture</label><select data-answer="ma"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <div class="activity-row"><label>photos er flertall: ___ photos</label><select data-answer="mes"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <button class="check-button" data-check="possessifs-6" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>🔍 Velg forklaring</h3>
      <div class="activity-row"><label>Hvorfor heter det leurs parents?</label><select data-answer="parents er flertall"><option></option><option>parents er flertall</option><option>eieren er flertall</option><option>parents er hunkjønn</option></select></div>
      <div class="activity-row"><label>Hvorfor heter det leur mère?</label><select data-answer="mère er entall"><option></option><option>mère er flertall</option><option>mère er entall</option><option>mère starter med vokal</option></select></div>
      <div class="activity-row"><label>Hva må du se etter først?</label><select data-answer="substantivet etter"><option></option><option>substantivet etter</option><option>verbet før</option><option>om eieren er gutt eller jente</option></select></div>
      <button class="check-button" data-check="possessifs-7" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>🧭 Mon, ma eller mes?</h3>
      <p>Velg etter ordet som kommer etter, ikke etter personen som eier.</p>
      <div class="activity-row"><label>___ adresse est à Paris.</label><select data-answer="mon"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <div class="activity-row"><label>___ ville préférée est Ajaccio.</label><select data-answer="ma"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <div class="activity-row"><label>___ cousins habitent en Guyane.</label><select data-answer="mes"><option></option><option>mon</option><option>ma</option><option>mes</option></select></div>
      <button class="check-button" data-check="possessifs-8" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>
  `);
}

function insertExtraPasseComposePractice() {
  const grid = document.querySelector("#passe-compose .activity-grid");
  if (!grid || document.querySelector("[data-check='passe-5']")) return;

  grid.insertAdjacentHTML("beforeend", `
    <article class="activity-card">
      <h3>🧠 Pugg partisippene 1</h3>
      <p>Velg riktig partisipp. Disse må sitte ganske raskt.</p>
      <div class="verb-participle-list">
        <span><strong>naître</strong> né</span><span><strong>partir</strong> parti</span><span><strong>aller</strong> allé</span><span><strong>descendre</strong> descendu</span><span><strong>rester</strong> resté</span>
      </div>
      <div class="activity-row"><label>naître →</label><select data-answer="né"><option></option><option>né</option><option>parti</option><option>descendu</option></select></div>
      <div class="activity-row"><label>partir →</label><select data-answer="parti"><option></option><option>allé</option><option>parti</option><option>resté</option></select></div>
      <div class="activity-row"><label>aller →</label><select data-answer="allé"><option></option><option>allé</option><option>entré</option><option>sorti</option></select></div>
      <div class="activity-row"><label>descendre →</label><select data-answer="descendu"><option></option><option>descendu</option><option>monté</option><option>mort</option></select></div>
      <div class="activity-row"><label>rester →</label><select data-answer="resté"><option></option><option>tombé</option><option>resté</option><option>né</option></select></div>
      <button class="check-button" data-check="passe-5" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>🧠 Pugg partisippene 2</h3>
      <p>Noen er lette å kjenne igjen. <strong>Mourir → mort</strong> må pugges ekstra.</p>
      <div class="verb-participle-list">
        <span><strong>tomber</strong> tombé</span><span><strong>monter</strong> monté</span><span><strong>entrer</strong> entré</span><span><strong>sortir</strong> sorti</span><span><strong>mourir</strong> mort</span>
      </div>
      <div class="activity-row"><label>tomber →</label><input data-answer="tombé|tombe" autocomplete="off"></div>
      <div class="activity-row"><label>monter →</label><input data-answer="monté|monte" autocomplete="off"></div>
      <div class="activity-row"><label>entrer →</label><input data-answer="entré|entre" autocomplete="off"></div>
      <div class="activity-row"><label>sortir →</label><input data-answer="sorti" autocomplete="off"></div>
      <div class="activity-row"><label>mourir →</label><input data-answer="mort" autocomplete="off"></div>
      <button class="check-button" data-check="passe-6" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>⚙️ Bruk alle verbene</h3>
      <p>Velg riktig hjelpeverb. Alle setningene bruker passé composé med être.</p>
      <div class="activity-row"><label>Je ___ né à Paris.</label><select data-answer="suis"><option></option><option>ai</option><option>suis</option><option>est</option></select></div>
      <div class="activity-row"><label>Tu ___ parti en Corse.</label><select data-answer="es"><option></option><option>as</option><option>es</option><option>est</option></select></div>
      <div class="activity-row"><label>Il ___ allé à Meaux.</label><select data-answer="est"><option></option><option>a</option><option>est</option><option>sont</option></select></div>
      <div class="activity-row"><label>Elle ___ descendue du train.</label><select data-answer="est"><option></option><option>a</option><option>est</option><option>sommes</option></select></div>
      <div class="activity-row"><label>Nous ___ restés à l'hôtel.</label><select data-answer="sommes"><option></option><option>avons</option><option>sommes</option><option>sont</option></select></div>
      <div class="activity-row"><label>Vous ___ tombés dans la rue.</label><select data-answer="êtes"><option></option><option>avez</option><option>êtes</option><option>ont</option></select></div>
      <div class="activity-row"><label>Ils ___ montés dans le bus.</label><select data-answer="sont"><option></option><option>ont</option><option>sont</option><option>est</option></select></div>
      <div class="activity-row"><label>Elles ___ entrées dans le musée.</label><select data-answer="sont"><option></option><option>ont</option><option>sont</option><option>êtes</option></select></div>
      <div class="activity-row"><label>Nous ___ sortis de la gare.</label><select data-answer="sommes"><option></option><option>avons</option><option>sommes</option><option>sont</option></select></div>
      <div class="activity-row"><label>Il ___ mort en 1885.</label><select data-answer="est"><option></option><option>a</option><option>est</option><option>suis</option></select></div>
      <button class="check-button" data-check="passe-7" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>🧩 Forstå regelen: partisippet passer</h3>
      <p>Med être kan partisippet få ekstra <strong>e</strong> og/eller <strong>s</strong>.</p>
      <div class="activity-row"><label>Il est ___ à Paris.</label><select data-answer="allé"><option></option><option>allé</option><option>allée</option><option>allés</option><option>allées</option></select></div>
      <div class="activity-row"><label>Elle est ___ à Paris.</label><select data-answer="allée"><option></option><option>allé</option><option>allée</option><option>allés</option><option>allées</option></select></div>
      <div class="activity-row"><label>Ils sont ___ à Paris.</label><select data-answer="allés"><option></option><option>allé</option><option>allée</option><option>allés</option><option>allées</option></select></div>
      <div class="activity-row"><label>Elles sont ___ à Paris.</label><select data-answer="allées"><option></option><option>allé</option><option>allée</option><option>allés</option><option>allées</option></select></div>
      <div class="activity-row"><label>Hva må partisippet passe med?</label><select data-answer="personen som gjør verbet"><option></option><option>personen som gjør verbet</option><option>byen i setningen</option><option>eiendomsordet</option></select></div>
      <button class="check-button" data-check="passe-8" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>
  `);
}

function insertEtreVerbFigures() {
  const station = document.querySelector("#passe-compose");
  const ruleCard = station?.querySelector(".rule-card");
  if (!station || !ruleCard || document.querySelector(".etre-figure-board")) return;

  const styles = document.createElement("style");
  styles.textContent = `
    .etre-figure-board { margin: 24px 0; padding: 24px; border-radius: 8px; background: #f8fafc; border: 1px solid var(--line); }
    .etre-figure-board h3 { margin: 0 0 8px; font-size: 1.45rem; }
    .etre-figure-board > p { margin-bottom: 18px; color: var(--muted); line-height: 1.5; }
    .etre-figure-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    .etre-card { min-height: 390px; display: grid; grid-template-rows: 285px auto auto; gap: 10px; padding: 18px; border: 1px solid var(--line); border-radius: 8px; background: white; overflow: hidden; }
    .etre-scene { position: relative; display: grid; place-items: center; min-height: 285px; border-radius: 8px; background: linear-gradient(135deg, #e8f2ff, #fff7ed); overflow: hidden; }
    .etre-person { position: relative; z-index: 2; font-size: 6.8rem; line-height: 1; }
    .etre-object { position: absolute; font-size: 5.2rem; }
    .etre-arrow { position: absolute; z-index: 3; color: #1d4ed8; font-size: 5rem; font-weight: 900; }
    .etre-stairs { position: absolute; color: #64748b; font-size: 6rem; letter-spacing: 2px; transform: rotate(-12deg); }
    .etre-door { position: absolute; right: 30px; font-size: 7.5rem; }
    .etre-ground { position: absolute; left: 24px; right: 24px; bottom: 32px; height: 9px; border-radius: 999px; background: #86efac; }
    .etre-card strong { font-size: 1.35rem; }
    .etre-card span { color: var(--muted); font-size: 1rem; line-height: 1.3; }
    .scene-birth .etre-object { right: 26px; top: 22px; }
    .scene-leave .etre-object { left: 28px; bottom: 38px; }
    .scene-leave .etre-arrow, .scene-go .etre-arrow, .scene-out .etre-arrow { right: 26px; top: 84px; }
    .scene-down .etre-arrow { right: 30px; bottom: 56px; transform: rotate(45deg); }
    .scene-up .etre-arrow { right: 30px; top: 46px; transform: rotate(-45deg); }
    .scene-stay .etre-person { transform: translateY(36px); }
    .scene-fall .etre-person { transform: rotate(62deg); }
    .scene-in .etre-door { right: 30px; }
    .scene-in .etre-arrow { right: 118px; top: 88px; }
    .scene-out .etre-door { left: 30px; right: auto; }
    .scene-quiet .etre-person { transform: rotate(90deg); }
    @media (prefers-reduced-motion: no-preference) {
      .scene-birth .etre-object { animation: sparkle 2.8s ease-in-out infinite; }
      .scene-leave .etre-person, .scene-go .etre-person { animation: walkRight 3.1s ease-in-out infinite; }
      .scene-leave .etre-arrow, .scene-go .etre-arrow, .scene-out .etre-arrow { animation: nudgeRight 2.2s ease-in-out infinite; }
      .scene-down .etre-person { animation: walkDown 3s ease-in-out infinite; }
      .scene-up .etre-person { animation: walkUp 3s ease-in-out infinite; }
      .scene-stay .etre-person { animation: breathe 3s ease-in-out infinite; }
      .scene-fall .etre-person { animation: fallPose 2.8s ease-in-out infinite; }
      .scene-in .etre-person { animation: enterDoor 3s ease-in-out infinite; }
      .scene-out .etre-person { animation: exitDoor 3s ease-in-out infinite; }
      .scene-quiet .etre-object { animation: candle 2.5s ease-in-out infinite; }
    }
    @keyframes walkRight { 0%, 100% { transform: translateX(-26px); } 50% { transform: translateX(34px); } }
    @keyframes nudgeRight { 0%, 100% { transform: translateX(0); opacity: 0.75; } 50% { transform: translateX(14px); opacity: 1; } }
    @keyframes walkDown { 0%, 100% { transform: translate(-24px, -32px); } 50% { transform: translate(36px, 42px); } }
    @keyframes walkUp { 0%, 100% { transform: translate(-32px, 42px); } 50% { transform: translate(36px, -32px); } }
    @keyframes breathe { 0%, 100% { transform: translateY(36px) scale(1); } 50% { transform: translateY(36px) scale(1.05); } }
    @keyframes fallPose { 0%, 100% { transform: rotate(20deg) translateY(-20px); } 50% { transform: rotate(72deg) translate(14px, 40px); } }
    @keyframes enterDoor { 0%, 100% { transform: translateX(-54px); } 50% { transform: translateX(42px) scale(0.86); } }
    @keyframes exitDoor { 0%, 100% { transform: translateX(-42px) scale(0.86); } 50% { transform: translateX(56px) scale(1); } }
    @keyframes sparkle { 0%, 100% { transform: scale(0.86) rotate(0deg); opacity: 0.75; } 50% { transform: scale(1.14) rotate(12deg); opacity: 1; } }
    @keyframes candle { 0%, 100% { transform: scale(0.96); opacity: 0.8; } 50% { transform: scale(1.06); opacity: 1; } }
    @media (max-width: 980px) { .etre-figure-grid { grid-template-columns: 1fr; } }
    @media (max-width: 560px) { .etre-figure-board { padding: 14px; } .etre-card { min-height: 330px; grid-template-rows: 230px auto auto; } .etre-scene { min-height: 230px; } .etre-person { font-size: 5.4rem; } .etre-object, .etre-arrow { font-size: 4rem; } .etre-door { font-size: 6rem; } }
  `;
  document.head.appendChild(styles);

  const verbs = [
    card("Naître", "å bli født", "scene-birth", "👶", "✨"),
    card("Partir", "å dra", "scene-leave", "🚶", "🧳", "→"),
    card("Aller", "å gå / dra", "scene-go", "🚶", "", "→"),
    card("Descendre", "å gå ned", "scene-down", "🚶", "▔▔▁▁", "➜"),
    card("Rester", "å bli / være igjen", "scene-stay", "🧘", "💤"),
    card("Tomber", "å falle", "scene-fall", "🧍", "💫"),
    card("Monter", "å gå opp", "scene-up", "🚶", "▁▁▔▔", "➜"),
    card("Entrer", "å gå inn", "scene-in", "🚶", "🚪", "→"),
    card("Sortir", "å gå ut", "scene-out", "🚶", "🚪", "→"),
    card("Mourir", "å dø", "scene-quiet", "🧍", "🕯️")
  ];

  const board = document.createElement("section");
  board.className = "etre-figure-board";
  board.innerHTML = `
    <h3>🎬 Être-verb i levende bilder</h3>
    <p>Mange av disse verbene handler om bevegelse, retning eller overgang fra én tilstand til en annen. Partisippene må øves på som en liten puggeliste.</p>
    <div class="etre-figure-grid">${verbs.join("")}</div>
  `;
  ruleCard.insertAdjacentElement("afterend", board);
}

function card(verb, meaning, sceneClass, person, object = "", arrow = "") {
  return `
    <article class="etre-card">
      <div class="etre-scene ${sceneClass}">
        <div class="etre-ground"></div>
        ${sceneClass.includes("down") || sceneClass.includes("up") ? `<span class="etre-stairs">${object}</span>` : ""}
        ${object && !sceneClass.includes("down") && !sceneClass.includes("up") && !sceneClass.includes("in") && !sceneClass.includes("out") ? `<span class="etre-object">${object}</span>` : ""}
        ${sceneClass.includes("in") || sceneClass.includes("out") ? `<span class="etre-door">${object}</span>` : ""}
        <span class="etre-person">${person}</span>
        ${arrow ? `<span class="etre-arrow">${arrow}</span>` : ""}
      </div>
      <strong>${verb}</strong>
      <span>${meaning}</span>
    </article>
  `;
}

function setupActivityChecks() {
  document.querySelectorAll(".check-button[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".activity-card");
      const fields = card.querySelectorAll("[data-answer]");
      let correct = 0;

      fields.forEach((field) => {
        const expected = field.dataset.answer.split("|").map((item) => normalizeAnswer(item));
        const given = normalizeAnswer(field.value);
        const isCorrect = expected.includes(given);
        field.classList.toggle("is-correct", isCorrect);
        field.classList.toggle("is-wrong", !isCorrect);
        if (isCorrect) correct += 1;
      });

      const feedback = card.querySelector(".activity-feedback");
      const allCorrect = correct === fields.length;
      feedback.textContent = allCorrect
        ? "✅ Alt riktig. Très bien!"
        : `🔁 ${correct} av ${fields.length} riktige. Endre svaret og trykk Sjekk svar på nytt.`;
      feedback.className = allCorrect ? "activity-feedback correct" : "activity-feedback wrong";

      if (allCorrect) {
        completedActivities.add(button.dataset.check);
        saveCompletedActivities();
        card.classList.add("activity-complete");
        document.dispatchEvent(new CustomEvent("moduleProgressChanged"));
      }
    });
  });
}

function setupRetryClearing() {
  document.querySelectorAll("[data-answer]").forEach((field) => {
    field.addEventListener("input", () => clearFieldState(field));
    field.addEventListener("change", () => clearFieldState(field));
  });
}

function clearFieldState(field) {
  field.classList.remove("is-wrong", "is-correct");
  const card = field.closest(".activity-card");
  const feedback = card?.querySelector(".activity-feedback");
  if (feedback?.classList.contains("wrong")) {
    feedback.textContent = "";
    feedback.className = "activity-feedback";
  }
}

function markCompletedActivityCards() {
  document.querySelectorAll(".check-button[data-check]").forEach((button) => {
    if (completedActivities.has(button.dataset.check)) {
      button.closest(".activity-card")?.classList.add("activity-complete");
    }
  });
}

function loadCompletedActivities() {
  try {
    const stored = JSON.parse(localStorage.getItem(activityProgressKey));
    return new Set(Array.isArray(stored) ? stored : []);
  } catch (error) {
    return new Set();
  }
}

function saveCompletedActivities() {
  localStorage.setItem(activityProgressKey, JSON.stringify([...completedActivities]));
}

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}
