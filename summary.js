const summaryQuestions = [
  { text: "Stopp 1: Velg riktig form: Je ___ français.", answers: ["parle", "parles", "parlons", "parlez"], correct: "parle", feedback: "Riktig. Je parle." },
  { text: "Stopp 2: Velg riktig eiendomsord: ___ frère est à Paris.", answers: ["mon", "ma", "mes", "notre"], correct: "mon", feedback: "Ja. Frère er hankjønn entall: mon frère." },
  { text: "Stopp 3: Velg riktig hjelpeverb: Elle ___ partie en Corse.", answers: ["a", "est", "as", "sont"], correct: "est", feedback: "Riktig. Partir bruker être: elle est partie." },
  { text: "Stopp 4: Velg riktig form: Nous ___ la région.", answers: ["visite", "visites", "visitons", "visitent"], correct: "visitons", feedback: "Riktig. Nous visitons." },
  { text: "Stopp 5: Velg riktig eiendomsord: ___ amis habitent à Meaux.", answers: ["mon", "ma", "mes", "son"], correct: "mes", feedback: "Bra. Amis er flertall: mes amis." },
  { text: "Stopp 6: Passé composé med avoir: Nous ___ visité Paris.", answers: ["sommes", "avons", "êtes", "ont"], correct: "avons", feedback: "Riktig. Visiter bruker avoir: nous avons visité." },
  { text: "Stopp 7: Hvilken setning er riktig?", answers: ["Tu parles français.", "Tu parle français.", "Tu parlons français.", "Tu parlez français."], correct: "Tu parles français.", feedback: "Ja. Tu-formen av parler er parles." },
  { text: "Stopp 8: Velg riktig eiendomsord: ___ mère aime la Guyane.", answers: ["ton", "ta", "tes", "leur"], correct: "ta", feedback: "Riktig. Mère er hunkjønn entall: ta mère." },
  { text: "Stopp 9: Velg riktig partisipp: Elle est ___ à Paris.", answers: ["allé", "allée", "allés", "aller"], correct: "allée", feedback: "Riktig. Elle gir allée med ekstra e." },
  { text: "Stopp 10: Velg riktig form: Ils ___ le train.", answers: ["attend", "attends", "attendons", "attendent"], correct: "attendent", feedback: "Bra. Ils attendent." },
  { text: "Stopp 11: Hvilket ord passer? Vi liker ___ région.", answers: ["notre", "nos", "votre", "leurs"], correct: "notre", feedback: "Riktig. Région er entall: notre région." },
  { text: "Stopp 12: Velg riktig setning.", answers: ["Ils sont arrivés.", "Ils ont arrivés.", "Ils est arrivés.", "Ils sommes arrivés."], correct: "Ils sont arrivés.", feedback: "Riktig. Arriver bruker être." },
  { text: "Stopp 13: Velg riktig form: Elle ___ une ville.", answers: ["choisis", "choisit", "choisissons", "choisissez"], correct: "choisit", feedback: "Ja. Elle choisit." },
  { text: "Stopp 14: Hvilket eiendomsord er flertall?", answers: ["ma", "ta", "sa", "ses"], correct: "ses", feedback: "Riktig. Ses brukes foran flertall." },
  { text: "Stopp 15: Oversett: Jeg dro til Paris.", answers: ["J'ai allé à Paris.", "Je suis allé à Paris.", "Je suis aller à Paris.", "J'ai aller à Paris."], correct: "Je suis allé à Paris.", feedback: "Riktig. Aller bruker être." },
  { text: "Stopp 16: Velg riktig form: Nous ___ un plan.", answers: ["ai", "as", "avons", "ont"], correct: "avons", feedback: "Riktig. Nous avons." },
  { text: "Stopp 17: Velg riktig eiendomsord: Ils voyagent avec ___ parents.", answers: ["leur", "leurs", "sa", "son"], correct: "leurs", feedback: "Riktig. Parents er flertall: leurs parents." },
  { text: "Stopp 18: Velg riktig partisipp: Elles sont ___ de la gare.", answers: ["sorti", "sortie", "sorties", "sortir"], correct: "sorties", feedback: "Ja. Elles gir sorties." },
  { text: "Stopp 19: Hvilken setning er riktig?", answers: ["Ma famille et moi sommes en Corse.", "Ma famille et moi est en Corse.", "Ma famille et moi sont en Corse.", "Ma famille et moi êtes en Corse."], correct: "Ma famille et moi sommes en Corse.", feedback: "Riktig. Ma famille et moi = nous." },
  { text: "Stopp 20: Siste stopp! Velg riktig setning.", answers: ["Elle a visité Paris.", "Elle est visité Paris.", "Elle as visité Paris.", "Elle ont visité Paris."], correct: "Elle a visité Paris.", feedback: "Riktig. Visiter bruker avoir." }
];

const summaryKey = "salut10-module1-summary-v2";
const verbProgressKey = "salut10-progress-v2";
const activityProgressKey = "salut10-module1-activity-progress-v1";
const requiredActivities = [
  "possessifs-1", "possessifs-2", "possessifs-3", "possessifs-4",
  "possessifs-5", "possessifs-6", "possessifs-7", "possessifs-8",
  "passe-1", "passe-2", "passe-3", "passe-4",
  "passe-5", "passe-6", "passe-7", "passe-8"
];
const summaryState = loadSummaryState();

const summaryCounter = document.querySelector("#summaryCounter");
const summaryScore = document.querySelector("#summaryScore");
const summaryQuestion = document.querySelector("#summaryQuestion");
const summaryAnswers = document.querySelector("#summaryAnswers");
const summaryFeedback = document.querySelector("#summaryFeedback");
const summaryReset = document.querySelector("#summaryReset");
const roadCar = document.querySelector("#roadCar");

renderSummaryGame();
document.addEventListener("moduleProgressChanged", renderSummaryGame);
window.setInterval(() => {
  if (!isSummaryUnlocked()) renderSummaryGame();
}, 1500);

summaryReset.addEventListener("click", () => {
  summaryState.current = 0;
  summaryState.correct = 0;
  summaryState.finished = false;
  saveSummaryState();
  renderSummaryGame();
});

function renderSummaryGame() {
  const lock = getSummaryLockStatus();
  if (!lock.unlocked) {
    summaryCounter.textContent = "Reiseruta er låst";
    summaryScore.textContent = `${lock.done} av ${lock.total} deler fullført`;
    summaryQuestion.textContent = "🔒 Fullfør verbverkstedet, eiendomsord og passé composé før bilen kan starte.";
    summaryFeedback.textContent = lock.message;
    summaryFeedback.className = "summary-feedback wrong";
    summaryAnswers.innerHTML = "";
    summaryReset.disabled = true;
    roadCar.style.transform = "translateX(0px)";
    return;
  }

  summaryReset.disabled = false;
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

function getSummaryLockStatus() {
  const verbDone = getVerbAnsweredCount() >= 30;
  const activities = getCompletedActivities();
  const completedGrammar = requiredActivities.filter((id) => activities.has(id)).length;
  const done = (verbDone ? 1 : 0) + completedGrammar;
  const total = 1 + requiredActivities.length;
  const missing = [];

  if (!verbDone) missing.push("verbverkstedet");
  if (completedGrammar < requiredActivities.length) missing.push("grammatikkortene");

  return {
    unlocked: verbDone && completedGrammar === requiredActivities.length,
    done,
    total,
    message: missing.length ? `Gjenstår: ${missing.join(" og ")}.` : "Klar!"
  };
}

function isSummaryUnlocked() {
  return getSummaryLockStatus().unlocked;
}

function getVerbAnsweredCount() {
  try {
    const stored = JSON.parse(localStorage.getItem(verbProgressKey));
    return Array.isArray(stored?.verb?.answered) ? stored.verb.answered.length : 0;
  } catch (error) {
    return 0;
  }
}

function getCompletedActivities() {
  try {
    const stored = JSON.parse(localStorage.getItem(activityProgressKey));
    return new Set(Array.isArray(stored) ? stored : []);
  } catch (error) {
    return new Set();
  }
}

function loadSummaryState() {
  const fallback = { current: 0, correct: 0, finished: false };

  try {
    const stored = JSON.parse(localStorage.getItem(summaryKey));
    if (typeof stored?.current === "number" && typeof stored?.correct === "number") return stored;
    return fallback;
  } catch (error) {
    return fallback;
  }
}

function saveSummaryState() {
  localStorage.setItem(summaryKey, JSON.stringify(summaryState));
}
