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
