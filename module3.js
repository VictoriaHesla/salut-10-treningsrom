const module3State = {
  solvedCards: new Set(),
  currentMission: 0,
  missionCorrect: 0,
  missionFinished: false
};

const missionQuestions = [
  {
    text: "Velg riktig: C'est une fille ___ parle français.",
    answers: ["qui", "que", "qu'", "où"],
    correct: "qui",
    feedback: "Qui er riktig fordi jenta gjør noe: hun snakker."
  },
  {
    text: "Velg riktig: C'est une chanson ___ j'aime.",
    answers: ["qui", "que", "où", "quand"],
    correct: "que",
    feedback: "Que er riktig fordi jeg gjør noe med sangen: jeg liker den."
  },
  {
    text: "Hva betyr komparativ?",
    answers: ["vanlig form", "sammenligning", "mest/minst", "spørsmål"],
    correct: "sammenligning",
    feedback: "Ja. Komparativ brukes når vi sammenligner."
  },
  {
    text: "Velg riktig: bon blir ofte ___ i komparativ.",
    answers: ["plus bon", "meilleur", "le bon", "très bon"],
    correct: "meilleur",
    feedback: "Riktig. Bon er uregelrett: meilleur."
  },
  {
    text: "Hva betyr où?",
    answers: ["hvor", "hvem", "hvorfor", "når"],
    correct: "hvor",
    feedback: "Oui. Où betyr hvor."
  },
  {
    text: "Velg riktig: ___ tu apprends le français? = hvorfor",
    answers: ["Pourquoi", "Combien", "Qui", "Quand"],
    correct: "Pourquoi",
    feedback: "Riktig. Pourquoi betyr hvorfor."
  },
  {
    text: "Hva er Verlan-ordet meuf laget av?",
    answers: ["merci", "femme", "français", "facile"],
    correct: "femme",
    feedback: "Ja. Meuf kommer fra femme."
  },
  {
    text: "Hvor snakkes fransk i Canada?",
    answers: ["Québec", "Berlin", "Madrid", "Roma"],
    correct: "Québec",
    feedback: "Riktig. I Québec brukes fransk mye."
  },
  {
    text: "Velg riktig: La Guyane, c'est un lieu ___ je veux visiter.",
    answers: ["qui", "que", "où", "quand"],
    correct: "que",
    feedback: "Que er riktig: jeg vil besøke stedet."
  },
  {
    text: "Velg riktig: Le français est ___ intéressant que l'anglais.",
    answers: ["plus", "le plus", "qui", "quel"],
    correct: "plus",
    feedback: "Riktig. Plus ... que betyr mer ... enn."
  },
  {
    text: "Hva betyr combien?",
    answers: ["hvor mye/mange", "hvordan", "hvilken", "hvem"],
    correct: "hvor mye/mange",
    feedback: "Ja. Combien betyr hvor mye eller hvor mange."
  },
  {
    text: "Siste oppdrag: C'est la ___ chanson.",
    answers: ["meilleure", "bon", "plus bon", "mieux"],
    correct: "meilleure",
    feedback: "Très bien. La chanson er hunkjønn: la meilleure chanson."
  }
];

const francophonePlaces = [
  {
    id: "rdc",
    name: "Congo (RD)",
    region: "Afrika",
    speakers: "ca. 48,9 millioner",
    percent: "51 %",
    x: 52,
    y: 58,
    note: "Dette er et av stedene med flest fransktalende i verden. Det viser at fransk ikke bare handler om Europa."
  },
  {
    id: "france",
    name: "France",
    region: "Europa",
    speakers: "ca. 66,4 millioner",
    percent: "97 %",
    x: 49,
    y: 35,
    note: "Frankrike er ofte det første vi tenker på, men det er bare én del av den franskspråklige verden."
  },
  {
    id: "quebec",
    name: "Québec",
    region: "Nord-Amerika",
    speakers: "ca. 8,0 millioner",
    percent: "93 %",
    x: 27,
    y: 31,
    note: "I Québec er fransk et viktig hverdagsspråk, selv om området ligger i Canada."
  },
  {
    id: "belgique",
    name: "Belgique",
    region: "Europa",
    speakers: "ca. 8,8 millioner",
    percent: "76 %",
    x: 48,
    y: 32,
    note: "Belgia har flere offisielle språk. Fransk brukes særlig i Vallonia og Brussel."
  },
  {
    id: "suisse",
    name: "Suisse",
    region: "Europa",
    speakers: "ca. 5,9 millioner",
    percent: "67 %",
    x: 50,
    y: 37,
    note: "Sveits har fire nasjonalspråk. Fransk er ett av dem."
  },
  {
    id: "senegal",
    name: "Sénégal",
    region: "Afrika",
    speakers: "ca. 4,6 millioner",
    percent: "26 %",
    x: 45,
    y: 54,
    note: "I Senegal brukes fransk mye i skole, administrasjon og skrift, sammen med lokale språk."
  },
  {
    id: "cameroun",
    name: "Cameroun",
    region: "Afrika",
    speakers: "ca. 11,5 millioner",
    percent: "41 %",
    x: 50,
    y: 55,
    note: "Kamerun har både fransk og engelsk som offisielle språk."
  },
  {
    id: "coteivoire",
    name: "Côte d'Ivoire",
    region: "Afrika",
    speakers: "ca. 9,3 millioner",
    percent: "34 %",
    x: 47,
    y: 56,
    note: "Her er fransk et viktig felles språk i et land med mange lokale språk."
  },
  {
    id: "madagascar",
    name: "Madagascar",
    region: "Afrika / Indiahavet",
    speakers: "ca. 7,7 millioner",
    percent: "28 %",
    x: 58,
    y: 71,
    note: "Madagaskar ligger i Indiahavet. Fransk brukes sammen med gassisk."
  },
  {
    id: "haiti",
    name: "Haïti",
    region: "Karibia",
    speakers: "ca. 4,3 millioner",
    percent: "39 %",
    x: 31,
    y: 50,
    note: "På Haiti brukes både fransk og haitisk kreol."
  }
];

const totalSmallAnswers = document.querySelectorAll("[data-answer]").length;
const scoreElement = document.querySelector("#module3Score");
const progressElement = document.querySelector("#module3Progress");
const progressText = document.querySelector("#module3ProgressText");
const missionCounter = document.querySelector("#missionCounter");
const missionQuestion = document.querySelector("#missionQuestion");
const missionAnswers = document.querySelector("#missionAnswers");
const missionFeedback = document.querySelector("#missionFeedback");
const missionReset = document.querySelector("#missionReset");

injectQuiQueNorwegianTestStyles();
insertQuiQueNorwegianTest();
setupCards();
setupSpeechButtons();
setupFrancophoneMap();
renderMission();
updateModule3Score();

missionReset?.addEventListener("click", () => {
  module3State.currentMission = 0;
  module3State.missionCorrect = 0;
  module3State.missionFinished = false;
  renderMission();
});

function injectQuiQueNorwegianTestStyles() {
  if (document.querySelector("#quiQueNorwegianTestStyles")) return;

  const style = document.createElement("style");
  style.id = "quiQueNorwegianTestStyles";
  style.textContent = `
    .qui-norwegian-test {
      margin: 0 0 18px;
      padding: 18px;
      border: 1px solid #fed7aa;
      border-radius: 8px;
      background: linear-gradient(135deg, #fff7ed 0%, #ffffff 70%);
      box-shadow: 0 14px 28px rgba(154, 52, 18, 0.08);
    }

    .qui-norwegian-test h3 {
      margin: 0 0 6px;
      color: #9a3412;
    }

    .qui-norwegian-test p {
      margin: 0;
    }

    .qui-test-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-top: 14px;
    }

    .qui-test-grid article {
      padding: 14px;
      border: 1px solid #fed7aa;
      border-radius: 8px;
      background: #ffffff;
    }

    .qui-test-grid strong {
      color: #1e3a8a;
    }

    .qui-test-grid mark {
      padding: 0 4px;
      border-radius: 4px;
      background: #fde68a;
    }

    .qui-test-grid .wrong-example {
      margin-top: 8px;
      color: #991b1b;
      font-weight: 800;
    }

    .qui-norwegian-test .mini-example {
      margin-top: 10px;
    }

    .qui-norwegian-test .tiny-note {
      margin-top: 14px;
    }

    @media (max-width: 700px) {
      .qui-test-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

function insertQuiQueNorwegianTest() {
  const station = document.querySelector("#qui-que");
  const header = station?.querySelector(".module3-station-header");
  if (!station || !header || station.querySelector(".qui-norwegian-test")) return;

  header.insertAdjacentHTML("afterend", `
    <div class="qui-norwegian-test">
      <div>
        <h3>Norsk-testen: må <em>som</em> være med?</h3>
        <p>På norsk kan du prøve å ta bort ordet <strong>som</strong>. Det hjelper deg ofte å velge mellom <strong>qui</strong> og <strong>que</strong> på fransk.</p>
      </div>
      <div class="qui-test-grid">
        <article>
          <strong>Som må være med → qui</strong>
          <p>Det er en jente <mark>som</mark> snakker fransk.</p>
          <p class="wrong-example">Ikke: Det er en jente snakker fransk.</p>
          <div class="mini-example">C'est une fille <strong>qui parle</strong> français.</div>
        </article>
        <article>
          <strong>Som kan tas bort → que</strong>
          <p>Det er en sang <mark>som</mark> jeg liker.</p>
          <p>Det er en sang jeg liker.</p>
          <div class="mini-example">C'est une chanson <strong>que j'aime</strong>.</div>
        </article>
      </div>
      <p class="tiny-note">Kort sagt: <strong>qui</strong> når ordet foran gjør verbet. <strong>que</strong> når noen gjør noe med ordet foran. Foran vokal blir <strong>que</strong> til <strong>qu'</strong>.</p>
    </div>
  `);
}

function setupCards() {
  document.querySelectorAll(".m3-card[data-card]").forEach((card, index) => {
    card.dataset.cardId = `card-${index}`;
    const button = card.querySelector(".m3-check");
    button?.addEventListener("click", () => checkCard(card));

    card.querySelectorAll("[data-answer]").forEach((field) => {
      field.addEventListener("input", () => clearField(field));
      field.addEventListener("change", () => clearField(field));
    });
  });
}

function checkCard(card) {
  const fields = Array.from(card.querySelectorAll("[data-answer]"));
  let correct = 0;

  fields.forEach((field) => {
    const expected = field.dataset.answer.split("|").map(normalizeAnswer);
    const given = normalizeAnswer(field.value);
    const isCorrect = expected.includes(given);
    field.classList.toggle("is-correct", isCorrect);
    field.classList.toggle("is-wrong", !isCorrect);
    if (isCorrect) correct += 1;
  });

  const feedback = card.querySelector(".m3-feedback");
  const allCorrect = correct === fields.length;

  if (feedback) {
    feedback.textContent = allCorrect
      ? "Riktig. Très bien!"
      : `${correct} av ${fields.length} riktige. Se på regelen og prøv igjen.`;
    feedback.className = allCorrect ? "m3-feedback correct" : "m3-feedback wrong";
  }

  if (allCorrect) {
    module3State.solvedCards.add(card.dataset.cardId);
  } else {
    module3State.solvedCards.delete(card.dataset.cardId);
  }

  updateModule3Score();
}

function clearField(field) {
  field.classList.remove("is-correct", "is-wrong");
  const feedback = field.closest(".m3-card")?.querySelector(".m3-feedback");
  if (feedback?.classList.contains("wrong")) {
    feedback.textContent = "";
    feedback.className = "m3-feedback";
  }
}

function updateModule3Score() {
  const correctFields = document.querySelectorAll("[data-answer].is-correct").length;
  const max = totalSmallAnswers;
  const percent = max ? Math.round((correctFields / max) * 100) : 0;

  if (scoreElement) scoreElement.textContent = `${correctFields} / ${max}`;
  if (progressElement) progressElement.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${correctFields} av ${max} småsvar er riktige`;
}

function setupSpeechButtons() {
  document.querySelectorAll(".speak-button[data-say]").forEach((button) => {
    button.addEventListener("click", () => speakFrench(button.dataset.say));
  });
}

function speakFrench(text) {
  if (!window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function setupFrancophoneMap() {
  const map = document.querySelector(".franco-map");
  if (!map || map.dataset.enhanced === "true") return;
  map.dataset.enhanced = "true";

  injectFrancophoneMapStyles();

  map.innerHTML = `
    <div class="franco-map-intro">
      <div>
        <h3>Trykk på kartet</h3>
        <p>Se omtrent hvor mange som snakker fransk på ulike steder i verden.</p>
      </div>
      <span>OIF 2022, avrundet</span>
    </div>
    <div class="world-map-layout">
      <div class="world-map-stage" aria-label="Stilisert verdenskart med klikkbare steder">
        <svg class="world-map-svg" viewBox="0 0 1000 520" role="img" aria-label="Stilisert verdenskart">
          <path class="continent" d="M146 108c55-42 146-38 183 14 30 43 3 88 41 126 27 27 51 42 41 78-11 39-51 44-64 84-13 39 17 56 0 76-24 29-89-11-120-62-22-36-24-77-53-99-42-31-92-20-109-56-17-37 23-61 33-95 8-29 18-43 48-66Z"/>
          <path class="continent" d="M438 106c58-40 132-41 178-3 37 31 81 29 124 47 54 22 89 62 75 91-12 24-62 12-90 34-37 29-20 80-63 104-34 19-78-5-113 12-33 16-28 54-59 55-37 1-80-56-70-105 9-42 53-59 49-95-4-41-62-46-66-82-2-21 14-42 35-58Z"/>
          <path class="continent" d="M523 247c44-20 112-4 143 39 33 46 10 97 35 137 20 32 59 42 52 62-9 28-94 17-151-22-46-31-73-82-84-132-8-36-22-68 5-84Z"/>
          <path class="continent" d="M746 161c53-29 138-17 181 28 24 25 34 58 18 78-18 24-58 7-82 31-23 23-7 60-35 78-29 19-78-3-96-36-17-31 7-54-5-86-15-39-57-54-42-75 10-14 35-4 61-18Z"/>
          <path class="continent" d="M770 392c42-16 101 9 115 48 10 28-9 54-39 58-45 6-96-38-92-78 1-12 7-22 16-28Z"/>
        </svg>
        ${francophonePlaces.map((place) => `
          <button class="map-pin" type="button" data-place="${place.id}" style="left:${place.x}%;top:${place.y}%" aria-label="${place.name}">
            <span></span>${place.name}
          </button>
        `).join("")}
      </div>
      <aside class="map-info" id="mapInfo" aria-live="polite"></aside>
    </div>
    <div class="map-reflection">
      <strong>Tenk over:</strong> Hva overrasker deg mest når du sammenligner Europa, Canada/Karibia og Afrika?
    </div>
  `;

  const buttons = Array.from(map.querySelectorAll(".map-pin"));
  const info = map.querySelector("#mapInfo");

  function renderPlace(place) {
    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.place === place.id);
    });

    info.innerHTML = `
      <p class="map-region">${place.region}</p>
      <h3>${place.name}</h3>
      <div class="speaker-number">${place.speakers}</div>
      <p><strong>${place.percent}</strong> av befolkningen regnes som fransktalende i tallgrunnlaget.</p>
      <p>${place.note}</p>
    `;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const place = francophonePlaces.find((item) => item.id === button.dataset.place);
      if (place) renderPlace(place);
    });
  });

  renderPlace(francophonePlaces[0]);
}

function injectFrancophoneMapStyles() {
  if (document.querySelector("#francophoneMapStyles")) return;

  const style = document.createElement("style");
  style.id = "francophoneMapStyles";
  style.textContent = `
    .franco-map.interactive-world-map,
    .franco-map[data-enhanced="true"] {
      display: block;
      padding: 18px;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      background: linear-gradient(135deg, #eff6ff, #ecfeff 55%, #f0fdf4);
    }

    .franco-map-intro {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: start;
      margin-bottom: 14px;
    }

    .franco-map-intro h3 {
      margin: 0 0 4px;
      color: #1e3a8a;
    }

    .franco-map-intro p {
      margin: 0;
      color: #475569;
      font-weight: 700;
    }

    .franco-map-intro span {
      padding: 8px 10px;
      border-radius: 8px;
      background: #ffffff;
      color: #0f766e;
      font-size: 0.86rem;
      font-weight: 900;
      white-space: nowrap;
    }

    .world-map-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.65fr) minmax(250px, 0.75fr);
      gap: 16px;
      align-items: stretch;
    }

    .world-map-stage {
      min-height: 390px;
      position: relative;
      overflow: hidden;
      border: 1px solid #dbeafe;
      border-radius: 8px;
      background: linear-gradient(180deg, #dbeafe 0%, #ecfeff 100%);
    }

    .world-map-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .continent {
      fill: #bbf7d0;
      stroke: #86efac;
      stroke-width: 4;
      filter: drop-shadow(0 10px 12px rgba(15, 118, 110, 0.12));
    }

    .map-pin {
      position: absolute;
      transform: translate(-50%, -50%);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: 140px;
      min-height: 36px;
      padding: 6px 9px;
      border: 2px solid #ffffff;
      border-radius: 999px;
      color: #0f172a;
      background: #ffffff;
      box-shadow: 0 10px 20px rgba(15, 23, 42, 0.14);
      font-size: 0.82rem;
      font-weight: 900;
      cursor: pointer;
      z-index: 2;
    }

    .map-pin span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ef4444;
      box-shadow: 0 0 0 5px rgba(239, 68, 68, 0.2);
    }

    .map-pin:hover,
    .map-pin.active {
      color: #ffffff;
      background: #1d4ed8;
      border-color: #bfdbfe;
    }

    .map-pin.active span,
    .map-pin:hover span {
      background: #facc15;
      box-shadow: 0 0 0 5px rgba(250, 204, 21, 0.3);
    }

    .map-info {
      min-height: 260px;
      padding: 18px;
      border: 1px solid #dbeafe;
      border-radius: 8px;
      background: #ffffff;
      box-shadow: 0 12px 26px rgba(70, 89, 126, 0.08);
    }

    .map-info h3 {
      margin: 4px 0 10px;
      color: #1e3a8a;
      font-size: 1.45rem;
    }

    .map-info p {
      color: #475569;
      line-height: 1.45;
    }

    .map-region {
      margin: 0;
      color: #0f766e;
      font-weight: 900;
      text-transform: uppercase;
      font-size: 0.78rem;
    }

    .speaker-number {
      margin: 10px 0;
      padding: 12px;
      border-radius: 8px;
      background: #eff6ff;
      color: #1e3a8a;
      font-size: 1.35rem;
      font-weight: 900;
    }

    .map-reflection {
      margin-top: 14px;
      padding: 12px 14px;
      border-radius: 8px;
      background: #fff7ed;
      color: #9a3412;
      font-weight: 800;
      line-height: 1.4;
    }

    @media (max-width: 920px) {
      .world-map-layout {
        grid-template-columns: 1fr;
      }

      .world-map-stage {
        min-height: 340px;
      }
    }

    @media (max-width: 700px) {
      .franco-map-intro {
        flex-direction: column;
      }

      .world-map-stage {
        min-height: 460px;
      }

      .map-pin {
        max-width: 116px;
        font-size: 0.72rem;
        padding: 5px 7px;
      }
    }
  `;
  document.head.appendChild(style);
}

function renderMission() {
  if (!missionQuestion || !missionAnswers || !missionCounter) return;

  missionAnswers.innerHTML = "";
  missionFeedback.textContent = "";
  missionFeedback.className = "mission-feedback";
  updateMissionRoute();

  if (module3State.missionFinished) {
    missionCounter.textContent = "Mission fullført";
    missionQuestion.textContent = `Du fikk ${module3State.missionCorrect} av ${missionQuestions.length} riktige oppdrag.`;
    missionFeedback.textContent = "🏁 Mission accomplie!";
    missionFeedback.className = "mission-feedback correct";
    return;
  }

  const current = missionQuestions[module3State.currentMission];
  missionCounter.textContent = `Oppdrag ${module3State.currentMission + 1} av ${missionQuestions.length}`;
  missionQuestion.textContent = current.text;

  current.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => checkMissionAnswer(answer));
    missionAnswers.appendChild(button);
  });
}

function checkMissionAnswer(answer) {
  const current = missionQuestions[module3State.currentMission];

  if (answer === current.correct) {
    module3State.missionCorrect += 1;
    module3State.currentMission += 1;
    module3State.missionFinished = module3State.currentMission >= missionQuestions.length;
    missionFeedback.textContent = `✅ ${current.feedback}`;
    missionFeedback.className = "mission-feedback correct";
    window.setTimeout(renderMission, 800);
    return;
  }

  missionFeedback.textContent = "🔁 Ikke helt. Prøv igjen før meldingen sendes videre.";
  missionFeedback.className = "mission-feedback wrong";
}

function updateMissionRoute() {
  const nodes = document.querySelectorAll(".mission-node");
  if (!nodes.length) return;
  const activeIndex = Math.min(Math.floor(module3State.currentMission / 3), nodes.length - 1);
  nodes.forEach((node, index) => {
    node.classList.toggle("active", index <= activeIndex);
  });
}

function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}
