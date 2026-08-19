const glossaryPassword = "aide";
const glossaryUnlockKey = "salut10-blog-glossary-unlocked-v1";

const blogGlossaries = {
  salut: {
    title: "Gloser til Salut !",
    words: [
      ["je", "jeg"],
      ["je m'appelle", "jeg heter"],
      ["j'ai ... ans", "jeg er ... år"],
      ["je suis", "jeg er"],
      ["sympa", "hyggelig"],
      ["timide", "sjenert"],
      ["drôle", "morsom"],
      ["sportif / sportive", "sporty"]
    ],
    starters: [
      "Salut ! Je m'appelle ...",
      "J'ai ... ans.",
      "Je suis ...",
      "J'aime ...",
      "Et toi ?"
    ]
  },
  famille: {
    title: "Gloser til Ma famille",
    words: [
      ["ma famille", "familien min"],
      ["mon père", "faren min"],
      ["ma mère", "moren min"],
      ["mon frère", "broren min"],
      ["ma sœur", "søsteren min"],
      ["mes parents", "foreldrene mine"],
      ["il y a", "det finnes / det er"],
      ["s'appelle", "heter"]
    ],
    starters: [
      "Dans ma famille, il y a ...",
      "Mon père s'appelle ...",
      "Ma mère est ...",
      "J'ai un frère / une sœur.",
      "Nous habitons à ..."
    ]
  },
  chezmoi: {
    title: "Gloser til Chez moi",
    words: [
      ["j'habite à", "jeg bor i"],
      ["une ville", "en by"],
      ["un village", "en landsby"],
      ["chez moi", "hjemme hos meg"],
      ["il y a", "det finnes"],
      ["c'est", "det er"],
      ["petit / petite", "liten"],
      ["grand / grande", "stor"]
    ],
    starters: [
      "J'habite à ...",
      "C'est une petite ville.",
      "Dans ma ville, il y a ...",
      "J'aime mon village parce que ...",
      "Chez moi, c'est calme."
    ]
  },
  college: {
    title: "Gloser til Mon collège",
    words: [
      ["mon collège", "skolen min / ungdomsskolen min"],
      ["ma classe", "klassen min"],
      ["une matière", "et fag"],
      ["le français", "fransk"],
      ["les maths", "matematikk"],
      ["l'anglais", "engelsk"],
      ["un professeur", "en lærer"],
      ["ma matière préférée", "favorittfaget mitt"]
    ],
    starters: [
      "Mon collège s'appelle ...",
      "Je suis en classe de ...",
      "Ma matière préférée est ...",
      "J'aime le français parce que ...",
      "Dans ma classe, il y a ... élèves."
    ]
  },
  loisirs: {
    title: "Gloser til Mes loisirs",
    words: [
      ["mes loisirs", "fritidsaktivitetene mine"],
      ["j'aime", "jeg liker"],
      ["je joue", "jeg spiller"],
      ["je fais de", "jeg driver med"],
      ["la musique", "musikk"],
      ["le foot", "fotball"],
      ["les jeux vidéo", "videospill"],
      ["avec mes amis", "med vennene mine"]
    ],
    starters: [
      "Pendant mon temps libre, j'aime ...",
      "Je joue au foot.",
      "Je fais de la danse.",
      "J'écoute de la musique.",
      "Le week-end, je ..."
    ]
  },
  plat: {
    title: "Gloser til Mon plat préféré",
    words: [
      ["mon plat préféré", "favorittretten min"],
      ["j'adore", "jeg elsker"],
      ["j'aime", "jeg liker"],
      ["je n'aime pas", "jeg liker ikke"],
      ["délicieux", "kjempegodt"],
      ["bon / bonne", "god"],
      ["sucré", "søt"],
      ["salé", "salt"]
    ],
    starters: [
      "Mon plat préféré est ...",
      "J'adore ...",
      "Je n'aime pas ...",
      "C'est délicieux.",
      "Je mange souvent ..."
    ]
  },
  vacances: {
    title: "Gloser til Mes vacances",
    words: [
      ["pendant les vacances", "i ferien"],
      ["j'ai visité", "jeg besøkte"],
      ["j'ai mangé", "jeg spiste"],
      ["j'ai joué", "jeg spilte"],
      ["j'ai regardé", "jeg så på"],
      ["j'ai nagé", "jeg svømte"],
      ["nous avons", "vi har / vi ..."],
      ["c'était", "det var"]
    ],
    starters: [
      "Pendant les vacances, j'ai ...",
      "J'ai visité ...",
      "J'ai mangé ...",
      "J'ai joué avec ...",
      "C'était super / intéressant / amusant."
    ]
  }
};

initLockedGlossaries();

function initLockedGlossaries() {
  const unlocked = loadUnlockedGlossaries();
  injectGlossaryStyles();

  document.querySelectorAll(".blog-card[data-section]").forEach((card) => {
    const sectionId = card.dataset.section;
    const glossary = blogGlossaries[sectionId];
    const starterBox = card.querySelector(".starter-box");
    if (!glossary || !starterBox || card.querySelector(".glossary-lock")) return;

    starterBox.insertAdjacentHTML("afterend", renderGlossaryLock(sectionId, glossary, unlocked.has(sectionId)));
  });

  document.querySelectorAll(".glossary-open-button").forEach((button) => {
    button.addEventListener("click", () => {
      const wrapper = button.closest(".glossary-lock");
      const content = wrapper?.querySelector(".glossary-content");
      const panel = wrapper?.querySelector(".glossary-password-panel");
      if (content && !content.hidden) return;
      if (panel) panel.hidden = !panel.hidden;
    });
  });

  document.querySelectorAll(".glossary-unlock-button").forEach((button) => {
    button.addEventListener("click", () => unlockGlossary(button));
  });

  document.querySelectorAll(".glossary-password-input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        unlockGlossary(input.closest(".glossary-lock")?.querySelector(".glossary-unlock-button"));
      }
    });
  });
}

function renderGlossaryLock(sectionId, glossary, isUnlocked) {
  return `
    <div class="glossary-lock" data-glossary="${sectionId}">
      <button class="glossary-open-button" type="button">${isUnlocked ? "🔓 Gloseliste åpen" : "🔐 Åpne gloseliste"}</button>
      <div class="glossary-password-panel" hidden>
        <label>Skriv passord fra lærer</label>
        <div class="glossary-password-row">
          <input class="glossary-password-input" type="password" autocomplete="off" placeholder="Passord" />
          <button class="glossary-unlock-button" type="button">Lås opp</button>
        </div>
        <p class="glossary-message" aria-live="polite"></p>
      </div>
      <div class="glossary-content" ${isUnlocked ? "" : "hidden"}>
        ${renderGlossaryContent(glossary)}
      </div>
    </div>`;
}

function renderGlossaryContent(glossary) {
  return `
    <div class="glossary-inner">
      <h3>${glossary.title}</h3>
      <div class="glossary-columns">
        <div>
          <strong>Ord</strong>
          <dl>${glossary.words.map(([fr, no]) => `<div><dt>${fr}</dt><dd>${no}</dd></div>`).join("")}</dl>
        </div>
        <div>
          <strong>Setningsstartere</strong>
          <ul>${glossary.starters.map((starter) => `<li>${starter}</li>`).join("")}</ul>
        </div>
      </div>
    </div>`;
}

function unlockGlossary(button) {
  if (!button) return;
  const wrapper = button.closest(".glossary-lock");
  const input = wrapper.querySelector(".glossary-password-input");
  const message = wrapper.querySelector(".glossary-message");
  const sectionId = wrapper.dataset.glossary;

  if (normalizeGlossaryPassword(input.value) !== normalizeGlossaryPassword(glossaryPassword)) {
    message.textContent = "Ikke helt. Spør læreren om passordet.";
    message.className = "glossary-message wrong";
    return;
  }

  const unlocked = loadUnlockedGlossaries();
  unlocked.add(sectionId);
  localStorage.setItem(glossaryUnlockKey, JSON.stringify([...unlocked]));

  wrapper.querySelector(".glossary-password-panel").hidden = true;
  wrapper.querySelector(".glossary-content").hidden = false;
  wrapper.querySelector(".glossary-open-button").textContent = "🔓 Gloseliste åpen";
  message.textContent = "";
}

function loadUnlockedGlossaries() {
  try {
    const stored = JSON.parse(localStorage.getItem(glossaryUnlockKey));
    return new Set(Array.isArray(stored) ? stored : []);
  } catch (error) {
    return new Set();
  }
}

function normalizeGlossaryPassword(value) {
  return value.trim().toLowerCase();
}

function injectGlossaryStyles() {
  if (document.querySelector("#glossarySupportStyles")) return;
  const styles = document.createElement("style");
  styles.id = "glossarySupportStyles";
  styles.textContent = `
    .glossary-lock { margin: 12px 0; }
    .glossary-open-button, .glossary-unlock-button { min-height: 42px; border: 0; border-radius: 8px; font-weight: 900; cursor: pointer; }
    .glossary-open-button { width: 100%; padding: 10px 12px; color: #7f1d1d; background: #fff7ed; border: 1px solid #fed7aa; text-align: left; }
    .glossary-password-panel { margin-top: 8px; padding: 12px; border: 1px dashed var(--blog-line); border-radius: 8px; background: #fff9fb; }
    .glossary-password-panel label { display: block; margin-bottom: 8px; color: var(--blog-berry); font-weight: 900; }
    .glossary-password-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; }
    .glossary-password-input { min-height: 42px; padding: 10px; border: 1px solid var(--blog-line); border-radius: 8px; font: inherit; }
    .glossary-unlock-button { padding: 10px 12px; color: white; background: var(--blog-rose); }
    .glossary-message { margin: 8px 0 0; font-size: 0.9rem; font-weight: 800; }
    .glossary-message.wrong { color: #b91c1c; }
    .glossary-content { margin-top: 10px; }
    .glossary-inner { padding: 14px; border-radius: 8px; border: 1px solid #f9a8d4; background: linear-gradient(135deg, #fff1f2, #fffdf8); }
    .glossary-inner h3 { margin: 0 0 10px; color: var(--blog-berry); font-size: 1.05rem; }
    .glossary-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .glossary-columns strong { display: block; margin-bottom: 8px; color: #9f174d; }
    .glossary-columns dl, .glossary-columns ul { margin: 0; }
    .glossary-columns dl { display: grid; gap: 6px; }
    .glossary-columns dl div { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr); gap: 8px; padding: 7px 8px; border-radius: 8px; background: rgba(255, 255, 255, 0.72); }
    .glossary-columns dt { color: #831843; font-weight: 900; }
    .glossary-columns dd { margin: 0; color: var(--blog-muted); }
    .glossary-columns ul { padding-left: 18px; color: var(--blog-ink); line-height: 1.45; }
    .glossary-columns li + li { margin-top: 5px; }
    @media (max-width: 760px) { .glossary-columns, .glossary-password-row { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(styles);
}
