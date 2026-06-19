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
