const summaryQuestions = [
  {
    text: "Stopp 1: Velg riktig form: Je ___ à Paris.",
    answers: ["habite", "habites", "habitons", "habitez"],
    correct: "habite",
    feedback: "Riktig. Je habite blir j'habite foran vokal."
  },
  {
    text: "Stopp 2: Hvilken setning er riktig?",
    answers: ["Tu parles français.", "Tu parle français.", "Tu parlons français.", "Tu parlez français."],
    correct: "Tu parles français.",
    feedback: "Ja. Tu-formen av parler er parles."
  },
  {
    text: "Stopp 3: Velg riktig form: Nous ___ la région.",
    answers: ["visite", "visites", "visitons", "visitent"],
    correct: "visitons",
    feedback: "Riktig. Nous visitons."
  },
  {
    text: "Stopp 4: Velg riktig form: Ils ___ le train.",
    answers: ["attend", "attends", "attendons", "attendent"],
    correct: "attendent",
    feedback: "Bra. Ils attendent."
  },
  {
    text: "Stopp 5: Hvilken form hører til elle?",
    answers: ["suis", "es", "est", "sommes"],
    correct: "est",
    feedback: "Riktig. Elle est."
  },
  {
    text: "Stopp 6: Oversett: Vi har en bil.",
    answers: ["Nous sommes une voiture.", "Nous avons une voiture.", "Nous avez une voiture.", "Nous ont une voiture."],
    correct: "Nous avons une voiture.",
    feedback: "Riktig. Vi har = nous avons."
  },
  {
    text: "Stopp 7: Velg riktig form: Vous ___ une carte.",
    answers: ["avez", "avons", "ont", "as"],
    correct: "avez",
    feedback: "Ja. Vous avez."
  },
  {
    text: "Stopp 8: Hvilken setning er riktig?",
    answers: ["Elle finit le texte.", "Elle finis le texte.", "Elle finissons le texte.", "Elle finissez le texte."],
    correct: "Elle finit le texte.",
    feedback: "Riktig. Elle finit."
  },
  {
    text: "Stopp 9: Velg riktig form: Nous ___ le chapitre.",
    answers: ["finis", "finit", "finissons", "finissent"],
    correct: "finissons",
    feedback: "Riktig. Nous finissons."
  },
  {
    text: "Stopp 10: Velg riktig form: Mes amis ___ Paris.",
    answers: ["aime", "aimes", "aimons", "aiment"],
    correct: "aiment",
    feedback: "Bra. Mes amis = ils, altså aiment."
  },
  {
    text: "Stopp 11: Hvilket verb er avoir?",
    answers: ["å være", "å ha", "å snakke", "å vente"],
    correct: "å ha",
    feedback: "Riktig. Avoir betyr å ha."
  },
  {
    text: "Stopp 12: Hvilket verb er être?",
    answers: ["å være", "å ha", "å bo", "å besøke"],
    correct: "å være",
    feedback: "Riktig. Être betyr å være."
  },
  {
    text: "Stopp 13: Velg riktig form: On ___ à Meaux.",
    answers: ["suis", "es", "est", "sommes"],
    correct: "est",
    feedback: "Ja. On bruker ofte samme form som il/elle: on est."
  },
  {
    text: "Stopp 14: Hvilken setning er riktig?",
    answers: ["Lina et Sara sont contentes.", "Lina et Sara est contentes.", "Lina et Sara sommes contentes.", "Lina et Sara suis contentes."],
    correct: "Lina et Sara sont contentes.",
    feedback: "Riktig. To personer = flertall, elles sont."
  },
  {
    text: "Stopp 15: Velg riktig form: Je ___ un billet.",
    answers: ["vends", "vend", "vendons", "vendent"],
    correct: "vends",
    feedback: "Riktig. Je vends."
  },
  {
    text: "Stopp 16: Velg riktig form: Il ___ à la question.",
    answers: ["réponds", "répond", "répondons", "répondent"],
    correct: "répond",
    feedback: "Bra. Il répond."
  },
  {
    text: "Stopp 17: Hvilken setning betyr: De bor i Frankrike?",
    answers: ["Ils habitent en France.", "Ils habite en France.", "Ils habitons en France.", "Ils habitez en France."],
    correct: "Ils habitent en France.",
    feedback: "Riktig. Ils habitent en France."
  },
  {
    text: "Stopp 18: Velg riktig form: Lucas ___ une photo.",
    answers: ["ai", "as", "a", "ont"],
    correct: "a",
    feedback: "Ja. Lucas = il, og il a."
  },
  {
    text: "Stopp 19: Hvilken setning er riktig?",
    answers: ["Vous répondez vite.", "Vous réponds vite.", "Vous répond vite.", "Vous répondent vite."],
    correct: "Vous répondez vite.",
    feedback: "Riktig. Vous-formen slutter ofte på -ez."
  },
  {
    text: "Stopp 20: Siste stopp! Velg riktig setning.",
    answers: ["Ma famille et moi sommes en Corse.", "Ma famille et moi est en Corse.", "Ma famille et moi sont en Corse.", "Ma famille et moi êtes en Corse."],
    correct: "Ma famille et moi sommes en Corse.",
    feedback: "Riktig. Ma famille et moi = nous, og nous sommes."
  }
];

const summaryKey = "salut10-module1-summary-v1";
const summaryState = loadSummaryState();

const summaryCounter = document.querySelector("#summaryCounter");
const summaryScore = document.querySelector("#summaryScore");
const summaryQuestion = document.querySelector("#summaryQuestion");
const summaryAnswers = document.querySelector("#summaryAnswers");
const summaryFeedback = document.querySelector("#summaryFeedback");
const summaryReset = document.querySelector("#summaryReset");
const roadCar = document.querySelector("#roadCar");

renderSummaryGame();

summaryReset.addEventListener("click", () => {
  summaryState.current = 0;
  summaryState.correct = 0;
  summaryState.finished = false;
  saveSummaryState();
  renderSummaryGame();
});

function renderSummaryGame() {
  const current = Math.min(summaryState.current, summaryQuestions.length - 1);
  const question = summaryQuestions[current];
  const isFinished = summaryState.finished;
  const percent = Math.round((summaryState.current / summaryQuestions.length) * 100);

  summaryCounter.textContent = isFinished ? "Alle 20 stopp er fullført" : `Stopp ${current + 1} av ${summaryQuestions.length}`;
  summaryScore.textContent = `${summaryState.correct} riktige`;
  summaryQuestion.textContent = isFinished ? "🏁 Du kom i mål! Start spillet på nytt hvis du vil prøve igjen." : question.text;
  summaryFeedback.textContent = "";
  summaryFeedback.className = "summary-feedback";
  roadCar.style.transform = `translateX(calc(${percent}% * 9.4))`;
  summaryAnswers.innerHTML = "";

  if (isFinished) {
    summaryFeedback.textContent = `🏆 Resultat: ${summaryState.correct} av ${summaryQuestions.length} riktige på reisen.`;
    summaryFeedback.className = "summary-feedback correct";
    return;
  }

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => checkSummaryAnswer(answer));
    summaryAnswers.appendChild(button);
  });
}

function checkSummaryAnswer(answer) {
  const question = summaryQuestions[summaryState.current];

  if (answer === question.correct) {
    summaryState.correct += 1;
    summaryState.current += 1;
    summaryState.finished = summaryState.current >= summaryQuestions.length;
    saveSummaryState();

    summaryFeedback.textContent = `✅ ${question.feedback}`;
    summaryFeedback.className = "summary-feedback correct";

    window.setTimeout(renderSummaryGame, 750);
    return;
  }

  summaryFeedback.textContent = "🔁 Ikke helt. Prøv en gang til før bilen kjører videre.";
  summaryFeedback.className = "summary-feedback wrong";
}

function loadSummaryState() {
  const fallback = {
    current: 0,
    correct: 0,
    finished: false
  };

  try {
    const stored = JSON.parse(localStorage.getItem(summaryKey));
    if (typeof stored?.current === "number" && typeof stored?.correct === "number") {
      return stored;
    }
    return fallback;
  } catch (error) {
    return fallback;
  }
}

function saveSummaryState() {
  localStorage.setItem(summaryKey, JSON.stringify(summaryState));
}
