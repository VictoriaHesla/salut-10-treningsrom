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
  if (!board) return;

  const participles = {
    "Naître": "né",
    "Partir": "parti",
    "Aller": "allé",
    "Descendre": "descendu",
    "Rester": "resté",
    "Tomber": "tombé",
    "Monter": "monté",
    "Entrer": "entré",
    "Sortir": "sorti",
    "Mourir": "mort"
  };

  board.querySelectorAll(".etre-card strong").forEach((heading) => {
    const verb = heading.textContent.trim().split(" - ")[0];
    const participle = participles[verb];
    if (participle) {
      heading.textContent = `${verb} - ${participle}`;
    }
  });

  if (document.querySelector("#largeEtreFigureStyles")) return;
  const styles = document.createElement("style");
  styles.id = "largeEtreFigureStyles";
  styles.textContent = `
    .etre-figure-board { padding: 30px !important; }
    .etre-figure-board h3 { font-size: 1.65rem !important; }
    .etre-figure-grid { grid-template-columns: repeat(2, minmax(320px, 1fr)) !important; gap: 24px !important; }
    .etre-card { min-height: 520px !important; grid-template-rows: 380px auto auto !important; gap: 12px !important; padding: 20px !important; }
    .etre-scene { min-height: 380px !important; }
    .etre-person { font-size: 8.8rem !important; }
    .etre-object { font-size: 6.6rem !important; }
    .etre-arrow { font-size: 6.4rem !important; }
    .etre-stairs { font-size: 7.6rem !important; }
    .etre-door { font-size: 9.6rem !important; }
    .etre-ground { bottom: 42px !important; height: 11px !important; }
    .etre-card strong { color: #1e3a8a !important; font-size: 1.6rem !important; line-height: 1.15 !important; }
    .etre-card > span:last-child { font-size: 1.08rem !important; }
    @media (max-width: 980px) {
      .etre-figure-grid { grid-template-columns: 1fr !important; }
      .etre-card { min-height: 500px !important; grid-template-rows: 360px auto auto !important; }
      .etre-scene { min-height: 360px !important; }
    }
    @media (max-width: 560px) {
      .etre-figure-board { padding: 16px !important; }
      .etre-card { min-height: 390px !important; grid-template-rows: 270px auto auto !important; padding: 14px !important; }
      .etre-scene { min-height: 270px !important; }
      .etre-person { font-size: 6.2rem !important; }
      .etre-object, .etre-arrow { font-size: 4.7rem !important; }
      .etre-stairs { font-size: 5.2rem !important; }
      .etre-door { font-size: 6.8rem !important; }
      .etre-card strong { font-size: 1.28rem !important; }
    }
  `;
  document.head.appendChild(styles);
}
