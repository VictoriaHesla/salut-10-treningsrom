function containsWord(text, word) {
  if (!word) return false;
  if (word.endsWith("'")) return text.includes(word);
  return new RegExp(`(^|\\s|')${escapeRegExp(word)}($|\\s|[,.!?;:])`).test(text);
}

const challengeLevelButton = document.querySelector(".level-button[data-level='utfordring']");
if (challengeLevelButton) {
  challengeLevelButton.textContent = "🔥 Skriv selv";
}

clarifyScoreDisplay();
enhanceEtreVerbFigures();

function clarifyScoreDisplay() {
  const maxPoints = 300;
  const pointsPerTask = 10;
  const scoreCard = document.querySelector(".score-card");
  const totalScore = document.querySelector("#totalScore");
  const progressText = document.querySelector("#verbProgressText");

  if (!scoreCard || !totalScore) return;

  if (!document.querySelector("#scoreClarifyStyles")) {
    const styles = document.createElement("style");
    styles.id = "scoreClarifyStyles";
    styles.textContent = `
      .score-card { min-width: 245px; }
      .score-card strong { white-space: nowrap; }
      .score-card .score-label { display: block; color: var(--muted); font-size: 0.9rem; }
      .score-explainer { display: block; margin-top: 4px; color: #475569; font-size: 0.78rem; line-height: 1.25; }
      .score-rule { margin: 8px 0 0; padding: 10px 12px; border-radius: 8px; background: #eff6ff; color: #1e3a8a; font-size: 0.9rem; line-height: 1.4; }
      @media (max-width: 620px) { .score-card { min-width: 0; width: 100%; } }
    `;
    document.head.appendChild(styles);
  }

  const label = scoreCard.querySelector("span:last-child");
  if (label) {
    label.classList.add("score-label");
    label.textContent = "verbpoeng";
  }

  if (!scoreCard.querySelector(".score-explainer")) {
    scoreCard.querySelector("div")?.insertAdjacentHTML(
      "beforeend",
      `<small class="score-explainer">Maks ${maxPoints}. +${pointsPerTask} når en ny verboppgave er riktig første gang.</small>`
    );
  }

  if (progressText && !document.querySelector(".score-rule")) {
    progressText.insertAdjacentHTML(
      "afterend",
      `<p class="score-rule"><strong>Poeng:</strong> Stasjon 1 gir +${pointsPerTask} poeng for hver nye verboppgave du klarer. Maks er ${maxPoints} poeng. Grammatikkoppgavene og Reiseruta gir tilbakemelding, men teller ikke i denne poengsummen ennå.</p>`
    );
  }

  const syncScore = () => {
    const match = totalScore.textContent.match(/\d+/);
    const points = Math.min(Number(match?.[0] || 0), maxPoints);
    const nextText = `${points} / ${maxPoints}`;
    if (totalScore.textContent !== nextText) {
      totalScore.textContent = nextText;
    }
    scoreCard.setAttribute("aria-label", `${points} av ${maxPoints} verbpoeng`);
  };

  syncScore();

  const observer = new MutationObserver(syncScore);
  observer.observe(totalScore, { childList: true, characterData: true, subtree: true });
}

function enhanceEtreVerbFigures() {
  const board = document.querySelector(".etre-figure-board");
  const grid = board?.querySelector(".etre-figure-grid");
  if (!board || !grid) return;

  const intro = board.querySelector("p");
  if (intro) {
    intro.textContent = "Disse verbene bruker ofte être i passé composé. Se på bildet, lær infinitiven og pugg partisippet.";
  }

  const verbs = [
    { verb: "Naître", participle: "né", meaning: "å bli født", clue: "en ny start", scene: "birth" },
    { verb: "Partir", participle: "parti", meaning: "å dra", clue: "reise bort", scene: "leave" },
    { verb: "Aller", participle: "allé", meaning: "å gå / dra", clue: "bevegelse mot et sted", scene: "go" },
    { verb: "Descendre", participle: "descendu", meaning: "å gå ned", clue: "ned trappen", scene: "down" },
    { verb: "Rester", participle: "resté", meaning: "å bli / være igjen", clue: "ingen bevegelse videre", scene: "stay" },
    { verb: "Tomber", participle: "tombé", meaning: "å falle", clue: "fra oppe til nede", scene: "fall" },
    { verb: "Monter", participle: "monté", meaning: "å gå opp", clue: "opp trappen", scene: "up" },
    { verb: "Entrer", participle: "entré", meaning: "å gå inn", clue: "inn gjennom døren", scene: "enter" },
    { verb: "Sortir", participle: "sorti", meaning: "å gå ut", clue: "ut gjennom døren", scene: "exit" },
    { verb: "Mourir", participle: "mort", meaning: "å dø", clue: "overgang til en ny tilstand", scene: "die" }
  ];

  grid.innerHTML = verbs.map(renderEtreIllustrationCard).join("");
  injectClearEtreFigureStyles();
}

function renderEtreIllustrationCard(item) {
  return `
    <article class="etre-card clear-etre-card">
      <div class="clear-etre-scene scene-${item.scene}" aria-hidden="true">${renderEtreSvg(item.scene)}</div>
      <strong>${item.verb} - ${item.participle}</strong>
      <span>${item.meaning}</span>
      <small>${item.clue}</small>
    </article>`;
}

function renderEtreSvg(scene) {
  const person = `<circle cx="190" cy="92" r="22" class="skin"/><path d="M190 116 L190 176" class="body"/><path d="M190 138 L156 156" class="body"/><path d="M190 138 L224 156" class="body"/><path d="M190 176 L162 226" class="body"/><path d="M190 176 L222 226" class="body"/>`;
  const smallPerson = `<circle cx="160" cy="108" r="18" class="skin"/><path d="M160 128 L160 178" class="body"/><path d="M160 146 L132 164" class="body"/><path d="M160 146 L188 164" class="body"/><path d="M160 178 L136 220" class="body"/><path d="M160 178 L190 220" class="body"/>`;
  const base = `<rect x="28" y="226" width="364" height="14" rx="7" class="ground"/>`;
  const arrowRight = `<path d="M248 132 H335" class="arrow"/><path d="M315 108 L340 132 L315 156" class="arrow"/>`;
  const arrowDown = `<path d="M278 84 C292 130 268 174 226 204" class="arrow"/><path d="M253 204 L221 207 L235 178" class="arrow"/>`;
  const arrowUp = `<path d="M146 202 C182 176 205 130 190 82" class="arrow"/><path d="M170 99 L190 72 L210 99" class="arrow"/>`;
  const door = `<rect x="286" y="70" width="78" height="156" rx="6" class="door"/><circle cx="346" cy="150" r="5" class="door-knob"/>`;
  const leftDoor = `<rect x="56" y="70" width="78" height="156" rx="6" class="door"/><circle cx="118" cy="150" r="5" class="door-knob"/>`;
  const stairsDown = `<path d="M96 190 H156 V166 H216 V142 H276 V118 H336" class="stairs"/>`;
  const stairsUp = `<path d="M84 226 H144 V202 H204 V178 H264 V154 H324 V130 H366" class="stairs"/>`;

  const scenes = {
    birth: `${base}<path d="M118 112 C118 72 150 44 190 44 C230 44 262 72 262 112 C262 158 226 182 190 206 C154 182 118 158 118 112Z" class="soft-shape"/><circle cx="190" cy="132" r="42" class="baby-face"/><path d="M170 126 Q178 134 186 126" class="detail"/><path d="M198 126 Q206 134 214 126" class="detail"/><path d="M176 153 Q190 164 204 153" class="detail"/><path d="M100 64 L116 98 L150 104 L124 128 L130 162 L100 145 L70 162 L76 128 L50 104 L84 98Z" class="star"/>`,
    leave: `${base}<rect x="70" y="142" width="82" height="84" rx="10" class="suitcase"/><path d="M96 142 V126 H126 V142" class="suitcase-line"/>${smallPerson}${arrowRight}<path d="M48 226 H382" class="route"/>`,
    go: `${base}<path d="M54 205 C112 170 170 170 228 198 C282 224 326 207 372 170" class="route"/>${person}${arrowRight}<circle cx="348" cy="82" r="20" class="destination"/>`,
    down: `${base}${stairsDown}<g transform="translate(74 -20)">${person}</g>${arrowDown}`,
    stay: `${base}<rect x="130" y="164" width="134" height="54" rx="12" class="bench"/><circle cx="190" cy="112" r="22" class="skin"/><path d="M190 136 L178 178 L232 178" class="body"/><path d="M176 178 L148 208" class="body"/><path d="M226 178 L258 208" class="body"/><path d="M250 70 Q278 54 306 70" class="quiet"/><path d="M258 96 Q284 80 314 96" class="quiet"/>`,
    fall: `${base}<g transform="rotate(58 198 154)"><circle cx="190" cy="92" r="22" class="skin"/><path d="M190 116 L190 176" class="body"/><path d="M190 138 L152 142" class="body"/><path d="M190 138 L226 122" class="body"/><path d="M190 176 L156 216" class="body"/><path d="M190 176 L234 206" class="body"/></g><path d="M92 92 L118 112 L98 136" class="fall-mark"/><path d="M300 82 L332 102 L308 130" class="fall-mark"/><path d="M250 208 H342" class="route"/>`,
    up: `${base}${stairsUp}<g transform="translate(-18 -12)">${person}</g>${arrowUp}`,
    enter: `${base}${door}<g transform="translate(-44 0)">${person}</g><path d="M230 142 H314" class="arrow"/><path d="M294 118 L319 142 L294 166" class="arrow"/>`,
    exit: `${base}${leftDoor}<g transform="translate(84 0)">${person}</g><path d="M136 142 H238" class="arrow"/><path d="M218 118 L243 142 L218 166" class="arrow"/>`,
    die: `${base}<rect x="126" y="178" width="132" height="34" rx="17" class="rest-shape"/><circle cx="150" cy="170" r="16" class="skin-muted"/><path d="M282 88 V202" class="candle"/><path d="M268 202 H296" class="candle"/><path d="M282 64 C298 84 292 100 282 112 C270 98 268 82 282 64Z" class="flame"/>`
  };

  return `<svg class="clear-etre-svg" viewBox="0 0 420 270" role="img" focusable="false">${scenes[scene] || scenes.go}</svg>`;
}

function injectClearEtreFigureStyles() {
  if (document.querySelector("#clearEtreFigureStyles")) return;
  const styles = document.createElement("style");
  styles.id = "clearEtreFigureStyles";
  styles.textContent = `
    .etre-figure-board { padding: 26px !important; background: #f8fafc !important; }
    .etre-figure-grid { grid-template-columns: repeat(2, minmax(330px, 1fr)) !important; gap: 22px !important; }
    .clear-etre-card { min-height: 0 !important; display: grid !important; grid-template-rows: auto auto auto auto !important; gap: 8px !important; padding: 18px !important; background: white !important; border: 1px solid #cbd5e1 !important; box-shadow: 0 14px 30px rgba(70, 89, 126, 0.12); }
    .clear-etre-scene { min-height: 0 !important; aspect-ratio: 14 / 9; border-radius: 8px; overflow: hidden; background: linear-gradient(135deg, #e0f2fe, #fff7ed); border: 1px solid #dbeafe; }
    .clear-etre-svg { display: block; width: 100%; height: 100%; }
    .clear-etre-card strong { color: #1e3a8a !important; font-size: clamp(1.35rem, 2.2vw, 1.85rem) !important; line-height: 1.1 !important; }
    .clear-etre-card > span { color: #334155 !important; font-size: 1.06rem !important; font-weight: 800; }
    .clear-etre-card small { color: #64748b; font-weight: 800; line-height: 1.3; }
    .skin { fill: #f8caa7; stroke: #7c2d12; stroke-width: 5; }
    .skin-muted { fill: #e2e8f0; stroke: #475569; stroke-width: 5; }
    .body { fill: none; stroke: #0f172a; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
    .ground { fill: #86efac; }
    .arrow { fill: none; stroke: #2563eb; stroke-width: 12; stroke-linecap: round; stroke-linejoin: round; }
    .route { fill: none; stroke: #64748b; stroke-width: 7; stroke-linecap: round; stroke-dasharray: 1 18; }
    .stairs { fill: none; stroke: #64748b; stroke-width: 16; stroke-linecap: round; stroke-linejoin: round; }
    .door { fill: #f59e0b; stroke: #92400e; stroke-width: 6; }
    .door-knob { fill: #fff7ed; stroke: #92400e; stroke-width: 4; }
    .suitcase { fill: #fb7185; stroke: #9f1239; stroke-width: 6; }
    .suitcase-line { fill: none; stroke: #9f1239; stroke-width: 6; stroke-linecap: round; }
    .soft-shape { fill: #fce7f3; stroke: #db2777; stroke-width: 5; }
    .baby-face { fill: #fed7aa; stroke: #9a3412; stroke-width: 5; }
    .detail { fill: none; stroke: #7c2d12; stroke-width: 5; stroke-linecap: round; }
    .star { fill: #fde68a; stroke: #ca8a04; stroke-width: 5; }
    .destination { fill: #bfdbfe; stroke: #1d4ed8; stroke-width: 6; }
    .bench { fill: #fcd34d; stroke: #92400e; stroke-width: 5; }
    .quiet { fill: none; stroke: #94a3b8; stroke-width: 6; stroke-linecap: round; }
    .fall-mark { fill: none; stroke: #ef4444; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
    .rest-shape { fill: #cbd5e1; stroke: #475569; stroke-width: 5; }
    .candle { fill: none; stroke: #475569; stroke-width: 8; stroke-linecap: round; }
    .flame { fill: #fbbf24; stroke: #ea580c; stroke-width: 4; }
    @media (max-width: 980px) { .etre-figure-grid { grid-template-columns: 1fr !important; } }
    @media (max-width: 560px) {
      .etre-figure-board { padding: 14px !important; }
      .clear-etre-card { padding: 12px !important; }
      .clear-etre-scene { aspect-ratio: 1.2 / 1; }
      .clear-etre-card strong { font-size: 1.28rem !important; }
    }
  `;
  document.head.appendChild(styles);
}
