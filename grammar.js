const activityProgressKey = "salut10-module1-activity-progress-v1";
const completedActivities = loadCompletedActivities();

insertExtraPossessiveRuleCards();
insertEtreVerbFigures();
setupActivityChecks();
setupRetryClearing();
markCompletedActivityCards();

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
  `);
}

function insertEtreVerbFigures() {
  const station = document.querySelector("#passe-compose");
  const ruleCard = station?.querySelector(".rule-card");
  if (!station || !ruleCard || document.querySelector(".etre-figure-board")) return;

  const styles = document.createElement("style");
  styles.textContent = `
    .etre-figure-board { margin: 20px 0; padding: 18px; border-radius: 8px; background: #f8fafc; border: 1px solid var(--line); }
    .etre-figure-board h3 { margin: 0 0 8px; }
    .etre-figure-board > p { margin-bottom: 16px; color: var(--muted); line-height: 1.5; }
    .etre-figure-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
    .etre-card { min-height: 270px; display: grid; grid-template-rows: 170px auto auto; gap: 9px; padding: 14px; border: 1px solid var(--line); border-radius: 8px; background: white; }
    .etre-scene { position: relative; display: grid; place-items: center; min-height: 170px; border-radius: 8px; background: linear-gradient(135deg, #e8f2ff, #fff7ed); overflow: hidden; }
    .etre-person { position: relative; z-index: 2; font-size: 4.3rem; }
    .etre-object { position: absolute; font-size: 3.4rem; }
    .etre-arrow { position: absolute; z-index: 3; color: #1d4ed8; font-size: 3.4rem; font-weight: 900; }
    .etre-stairs { position: absolute; color: #64748b; font-size: 4rem; letter-spacing: 2px; transform: rotate(-12deg); }
    .etre-door { position: absolute; right: 26px; font-size: 5rem; }
    .etre-ground { position: absolute; left: 20px; right: 20px; bottom: 24px; height: 7px; border-radius: 999px; background: #86efac; }
    .etre-card strong { font-size: 1.18rem; }
    .etre-card span { color: var(--muted); font-size: 0.96rem; line-height: 1.3; }
    .scene-birth .etre-object { right: 24px; top: 18px; }
    .scene-leave .etre-object { left: 24px; bottom: 28px; }
    .scene-leave .etre-arrow, .scene-go .etre-arrow, .scene-out .etre-arrow { right: 22px; top: 54px; }
    .scene-down .etre-arrow { right: 24px; bottom: 34px; transform: rotate(45deg); }
    .scene-up .etre-arrow { right: 24px; top: 26px; transform: rotate(-45deg); }
    .scene-stay .etre-person { transform: translateY(26px); }
    .scene-fall .etre-person { transform: rotate(62deg); }
    .scene-in .etre-door { right: 24px; }
    .scene-in .etre-arrow { right: 92px; top: 54px; }
    .scene-out .etre-door { left: 24px; right: auto; }
    .scene-quiet .etre-person { transform: rotate(90deg); }
    .activity-complete { outline: 2px solid #86efac; outline-offset: 2px; }
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
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}
