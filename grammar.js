insertEtreVerbFigures();

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
      : `🔁 ${correct} av ${fields.length} riktige. Se på ordene rundt, og prøv igjen.`;
    feedback.className = allCorrect ? "activity-feedback correct" : "activity-feedback wrong";
  });
});

function insertEtreVerbFigures() {
  const station = document.querySelector("#passe-compose");
  const ruleCard = station?.querySelector(".rule-card");
  if (!station || !ruleCard || document.querySelector(".etre-figure-board")) return;

  const styles = document.createElement("style");
  styles.textContent = `
    .etre-figure-board { margin: 18px 0; padding: 16px; border-radius: 8px; background: #f8fafc; border: 1px solid var(--line); }
    .etre-figure-board h3 { margin: 0 0 8px; }
    .etre-figure-board > p { margin-bottom: 14px; color: var(--muted); line-height: 1.5; }
    .etre-figure-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .etre-card { min-height: 184px; display: grid; grid-template-rows: 106px auto auto; gap: 7px; padding: 12px; border: 1px solid var(--line); border-radius: 8px; background: white; }
    .etre-scene { position: relative; display: grid; place-items: center; min-height: 106px; border-radius: 8px; background: linear-gradient(135deg, #e8f2ff, #fff7ed); overflow: hidden; }
    .etre-person { position: relative; z-index: 2; font-size: 2.25rem; }
    .etre-object { position: absolute; font-size: 2rem; }
    .etre-arrow { position: absolute; z-index: 3; color: #1d4ed8; font-size: 2rem; font-weight: 900; }
    .etre-stairs { position: absolute; color: #64748b; font-size: 2.2rem; letter-spacing: 2px; transform: rotate(-12deg); }
    .etre-door { position: absolute; right: 22px; font-size: 3rem; }
    .etre-ground { position: absolute; left: 18px; right: 18px; bottom: 18px; height: 5px; border-radius: 999px; background: #86efac; }
    .etre-card strong { font-size: 1.05rem; }
    .etre-card span { color: var(--muted); font-size: 0.92rem; line-height: 1.3; }
    .scene-birth .etre-object { right: 18px; top: 12px; }
    .scene-leave .etre-object { left: 20px; bottom: 20px; }
    .scene-leave .etre-arrow, .scene-go .etre-arrow, .scene-out .etre-arrow { right: 18px; top: 34px; }
    .scene-down .etre-arrow { right: 20px; bottom: 22px; transform: rotate(45deg); }
    .scene-up .etre-arrow { right: 20px; top: 18px; transform: rotate(-45deg); }
    .scene-stay .etre-person { transform: translateY(16px); }
    .scene-fall .etre-person { transform: rotate(62deg); }
    .scene-in .etre-door { right: 20px; }
    .scene-in .etre-arrow { right: 70px; top: 34px; }
    .scene-out .etre-door { left: 20px; right: auto; }
    .scene-quiet .etre-person { transform: rotate(90deg); }
    @media (max-width: 980px) { .etre-figure-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 560px) { .etre-figure-grid { grid-template-columns: 1fr; } }
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
    <h3>🎬 Être-verb i bilder</h3>
    <p>Mange av disse verbene handler om bevegelse, retning eller overgang fra én tilstand til en annen.</p>
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

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}
