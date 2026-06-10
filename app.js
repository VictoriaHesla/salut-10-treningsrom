const questionBank = [
  {
    id: "lett-1",
    level: "lett",
    title: "Regelrett -ER",
    rule: "-ER-verb får ofte endelsene -e, -es, -e, -ons, -ez, -ent.",
    text: "Velg riktig form: Je ___ français.",
    answers: ["parle", "parles", "parlons", "parlez"],
    correct: "parle",
    feedback: "Riktig! Je parle betyr jeg snakker.",
    hint: "Se på je. Je-formen slutter ofte på -e."
  },
  {
    id: "lett-2",
    level: "lett",
    title: "Regelrett -ER",
    rule: "Med tu får regelrette -ER-verb ofte endelsen -es.",
    text: "Velg riktig form: Tu ___ à Paris.",
    answers: ["habite", "habites", "habitons", "habitez"],
    correct: "habites",
    feedback: "Ja! Tu habites betyr du bor.",
    hint: "Tu-formen slutter ofte på -es."
  },
  {
    id: "lett-3",
    level: "lett",
    title: "Regelrett -ER",
    rule: "Med nous får regelrette -ER-verb endelsen -ons.",
    text: "Velg riktig form: Nous ___ la Corse.",
    answers: ["visite", "visites", "visitons", "visitez"],
    correct: "visitons",
    feedback: "Flott! Nous visitons betyr vi besøker.",
    hint: "Nous trenger ofte endelsen -ons."
  },
  {
    id: "lett-4",
    level: "lett",
    title: "Regelrett -IR",
    rule: "Mange regelrette -IR-verb bruker -is, -is, -it, -issons, -issez, -issent.",
    text: "Velg riktig form: Je ___ le devoir.",
    answers: ["finis", "finit", "finissons", "finissez"],
    correct: "finis",
    feedback: "Riktig! Je finis betyr jeg gjør ferdig.",
    hint: "Je-formen av finir er finis."
  },
  {
    id: "lett-5",
    level: "lett",
    title: "Regelrett -IR",
    rule: "Il og elle får ofte endelsen -it i regelrette -IR-verb.",
    text: "Velg riktig form: Elle ___ une région.",
    answers: ["choisis", "choisit", "choisissons", "choisissez"],
    correct: "choisit",
    feedback: "Bra! Elle choisit betyr hun velger.",
    hint: "Elle-formen slutter ofte på -it."
  },
  {
    id: "lett-6",
    level: "lett",
    title: "Regelrett -RE",
    rule: "Mange regelrette -RE-verb bruker -s, -s, ingenting, -ons, -ez, -ent.",
    text: "Velg riktig form: Ils ___ le train.",
    answers: ["attend", "attends", "attendons", "attendent"],
    correct: "attendent",
    feedback: "Ja! Ils attendent betyr de venter.",
    hint: "Ils/elles-formen slutter ofte på -ent."
  },
  {
    id: "lett-7",
    level: "lett",
    title: "Regelrett -RE",
    rule: "Med je får mange regelrette -RE-verb endelsen -s.",
    text: "Velg riktig form: Je ___ un billet.",
    answers: ["vends", "vend", "vendons", "vendent"],
    correct: "vends",
    feedback: "Riktig! Je vends betyr jeg selger.",
    hint: "Je-formen får ofte -s i -RE-verb."
  },
  {
    id: "lett-8",
    level: "lett",
    title: "Être",
    rule: "Être betyr å være: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.",
    text: "Velg riktig form: Elle ___ en Guyane.",
    answers: ["suis", "es", "est", "sommes"],
    correct: "est",
    feedback: "Très bien! Elle est betyr hun er.",
    hint: "Elle bruker samme form som il: est."
  },
  {
    id: "lett-9",
    level: "lett",
    title: "Avoir",
    rule: "Avoir betyr å ha: j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.",
    text: "Velg riktig form: Nous ___ un plan de Paris.",
    answers: ["ai", "as", "avons", "ont"],
    correct: "avons",
    feedback: "Flott! Nous avons betyr vi har.",
    hint: "Nous bruker formen avons."
  },
  {
    id: "lett-10",
    level: "lett",
    title: "Avoir",
    rule: "Med ils og elles bruker vi ont.",
    text: "Velg riktig form: Ils ___ une carte.",
    answers: ["ai", "a", "avons", "ont"],
    correct: "ont",
    feedback: "Riktig! Ils ont betyr de har.",
    hint: "Ils/elles + avoir = ont."
  },
  {
    id: "middels-1",
    level: "middels",
    title: "Velg riktig verbform",
    rule: "Se først på pronomenet. Det bestemmer verbformen.",
    text: "Velg riktig setning.",
    answers: ["Nous regardez Paris.", "Nous regardons Paris.", "Nous regardent Paris.", "Nous regardes Paris."],
    correct: "Nous regardons Paris.",
    feedback: "Riktig. Nous passer med regardons.",
    hint: "Nous-formen slutter ofte på -ons."
  },
  {
    id: "middels-2",
    level: "middels",
    title: "Velg riktig verbform",
    rule: "Vous-formen slutter ofte på -ez i regelrette verb.",
    text: "Velg riktig setning.",
    answers: ["Vous visitez Meaux.", "Vous visitons Meaux.", "Vous visitent Meaux.", "Vous visites Meaux."],
    correct: "Vous visitez Meaux.",
    feedback: "Ja! Vous visitez er riktig.",
    hint: "Se etter formen som slutter på -ez."
  },
  {
    id: "middels-3",
    level: "middels",
    title: "-IR-verb",
    rule: "Nous-formen av mange -IR-verb slutter på -issons.",
    text: "Velg riktig form: Nous ___ le chapitre.",
    answers: ["finis", "finit", "finissons", "finissez"],
    correct: "finissons",
    feedback: "Riktig. Nous finissons betyr vi gjør ferdig.",
    hint: "Nous + finir = finissons."
  },
  {
    id: "middels-4",
    level: "middels",
    title: "-IR-verb",
    rule: "Ils og elles får ofte -issent i regelrette -IR-verb.",
    text: "Velg riktig form: Elles ___ une ville.",
    answers: ["choisit", "choisissent", "choisissons", "choisissez"],
    correct: "choisissent",
    feedback: "Bra! Elles choisissent er riktig.",
    hint: "Elles-formen slutter ofte på -issent."
  },
  {
    id: "middels-5",
    level: "middels",
    title: "-RE-verb",
    rule: "Il/elle-formen av mange -RE-verb har ingen uttalt endelse.",
    text: "Velg riktig form: Il ___ à la question.",
    answers: ["réponds", "répond", "répondons", "répondent"],
    correct: "répond",
    feedback: "Riktig. Il répond betyr han svarer.",
    hint: "Il-formen er répond."
  },
  {
    id: "middels-6",
    level: "middels",
    title: "-RE-verb",
    rule: "Vous-formen slutter ofte på -ez.",
    text: "Velg riktig form: Vous ___ vos clés.",
    answers: ["perds", "perd", "perdez", "perdent"],
    correct: "perdez",
    feedback: "Ja! Vous perdez betyr dere mister.",
    hint: "Vous-formen slutter på -ez."
  },
  {
    id: "middels-7",
    level: "middels",
    title: "Être",
    rule: "Être er uregelrett og må læres utenat.",
    text: "Velg riktig setning.",
    answers: ["Je suis à Paris.", "Je es à Paris.", "Je est à Paris.", "Je sommes à Paris."],
    correct: "Je suis à Paris.",
    feedback: "Riktig. Je suis betyr jeg er.",
    hint: "Je + être = suis."
  },
  {
    id: "middels-8",
    level: "middels",
    title: "Être",
    rule: "Ils/elles + être = sont.",
    text: "Velg riktig form: Les élèves ___ en classe.",
    answers: ["suis", "est", "sommes", "sont"],
    correct: "sont",
    feedback: "Riktig! Les élèves er flertall, så vi bruker sont.",
    hint: "Les élèves kan byttes ut med ils eller elles."
  },
  {
    id: "middels-9",
    level: "middels",
    title: "Avoir",
    rule: "Tu + avoir = as.",
    text: "Velg riktig form: Tu ___ une photo de Corse.",
    answers: ["ai", "as", "a", "ont"],
    correct: "as",
    feedback: "Bra! Tu as betyr du har.",
    hint: "Tu bruker formen as."
  },
  {
    id: "middels-10",
    level: "middels",
    title: "Avoir",
    rule: "Il/elle/on + avoir = a.",
    text: "Velg riktig form: On ___ un hôtel près de la gare.",
    answers: ["ai", "as", "a", "avons"],
    correct: "a",
    feedback: "Riktig. On a betyr man har / vi har.",
    hint: "On bruker samme form som il og elle."
  },
  {
    id: "utfordring-1",
    level: "utfordring",
    title: "Finn feilen",
    rule: "Subjektet og verbet må passe sammen.",
    text: "Hvilken setning er riktig?",
    answers: ["Ils parle français.", "Ils parlons français.", "Ils parlent français.", "Ils parlez français."],
    correct: "Ils parlent français.",
    feedback: "Riktig. Ils + parler = parlent.",
    hint: "Se etter ils-formen."
  },
  {
    id: "utfordring-2",
    level: "utfordring",
    title: "Blandede verb",
    rule: "Du må kjenne igjen om verbet er -ER, -IR, -RE eller uregelrett.",
    text: "Velg riktig form: Ma famille et moi ___ en Guyane.",
    answers: ["sommes", "êtes", "sont", "est"],
    correct: "sommes",
    feedback: "Ja. Ma famille et moi betyr vi, altså nous sommes.",
    hint: "Ma famille et moi = nous."
  },
  {
    id: "utfordring-3",
    level: "utfordring",
    title: "Oversett til fransk",
    rule: "Start med pronomenet, og velg riktig verbform.",
    text: "Velg riktig oversettelse av: Vi venter på toget.",
    answers: ["Nous attend le train.", "Nous attends le train.", "Nous attendons le train.", "Nous attendent le train."],
    correct: "Nous attendons le train.",
    feedback: "Riktig. Nous attendons le train.",
    hint: "Nous-formen av attendre er attendons."
  },
  {
    id: "utfordring-4",
    level: "utfordring",
    title: "Oversett til fransk",
    rule: "Husk at avoir er uregelrett.",
    text: "Velg riktig oversettelse av: De har en liten bil.",
    answers: ["Ils ont une petite voiture.", "Ils avons une petite voiture.", "Ils a une petite voiture.", "Ils sont une petite voiture."],
    correct: "Ils ont une petite voiture.",
    feedback: "Riktig. Ils ont betyr de har.",
    hint: "De har = ils ont."
  },
  {
    id: "utfordring-5",
    level: "utfordring",
    title: "Velg riktig setning",
    rule: "Noen former høres like ut, men skrives forskjellig.",
    text: "Hvilken setning er grammatisk riktig?",
    answers: ["Tu finit le texte.", "Tu finis le texte.", "Tu finissons le texte.", "Tu finissez le texte."],
    correct: "Tu finis le texte.",
    feedback: "Riktig. Tu finis er riktig form.",
    hint: "Tu-formen av finir er finis."
  },
  {
    id: "utfordring-6",
    level: "utfordring",
    title: "Velg riktig setning",
    rule: "Adressen eller stedet endrer ikke verbformen. Subjektet gjør det.",
    text: "Hvilken setning er riktig?",
    answers: ["Elle habitons à Meaux.", "Elle habitez à Meaux.", "Elle habitent à Meaux.", "Elle habite à Meaux."],
    correct: "Elle habite à Meaux.",
    feedback: "Ja. Elle habite er riktig.",
    hint: "Elle-formen av -ER-verb slutter ofte på -e."
  },
  {
    id: "utfordring-7",
    level: "utfordring",
    title: "Kontekst",
    rule: "Et navn kan ofte byttes ut med il eller elle.",
    text: "Velg riktig form: Lucas ___ une carte de France.",
    answers: ["ai", "as", "a", "ont"],
    correct: "a",
    feedback: "Riktig. Lucas = il, og il a.",
    hint: "Lucas kan byttes ut med il."
  },
  {
    id: "utfordring-8",
    level: "utfordring",
    title: "Kontekst",
    rule: "To eller flere personer blir flertall.",
    text: "Velg riktig form: Lina et Sara ___ contentes.",
    answers: ["suis", "est", "sommes", "sont"],
    correct: "sont",
    feedback: "Riktig. Lina et Sara = elles, og elles sont.",
    hint: "To jenter kan byttes ut med elles."
  },
  {
    id: "utfordring-9",
    level: "utfordring",
    title: "Blandede former",
    rule: "Ikke se bare på slutten av verbet. Se på hele subjektet.",
    text: "Velg riktig form: Mes amis ___ la région.",
    answers: ["aime", "aimes", "aimons", "aiment"],
    correct: "aiment",
    feedback: "Riktig. Mes amis = ils, og ils aiment.",
    hint: "Mes amis er flertall."
  },
  {
    id: "utfordring-10",
    level: "utfordring",
    title: "Blandede former",
    rule: "I korte tekster må du bruke sammenhengen for å finne subjektet.",
    text: "Velg riktig form: Dans ma lettre, je ___ de Paris.",
    answers: ["parle", "parles", "parlons", "parlent"],
    correct: "parle",
    feedback: "Riktig. Je parle de Paris.",
    hint: "Subjektet er je."
  }
];

const levelNames = {
  blandet: "Blandet",
  lett: "Lett",
  middels: "Middels",
  utfordring: "Utfordring"
};

const speechSentences = [
  "Je suis allé à Paris.",
  "J'habite dans une petite ville.",
  "Nous avons visité la Corse.",
  "Elle est en Guyane avec sa famille.",
  "Il y a une gare à Meaux.",
  "C'est une région très belle."
];

const storageKey = "salut10-progress-v2";
const state = loadState();
let currentLevel = "blandet";
let currentIndex = Math.min(state.verb.levels[currentLevel], getQuestions().length - 1);
let mediaRecorder;
let recordedChunks = [];
let microphoneStream;
let speechIndex = 0;

const totalScore = document.querySelector("#totalScore");
const verbProgress = document.querySelector("#verbProgress");
const verbProgressText = document.querySelector("#verbProgressText");
const questionTitle = document.querySelector("#questionTitle");
const questionCount = document.querySelector("#questionCount");
const questionText = document.querySelector("#questionText");
const answerGrid = document.querySelector("#answerGrid");
const feedback = document.querySelector("#feedback");
const supportText = document.querySelector("#supportText");
const ruleButton = document.querySelector("#ruleButton");
const hintButton = document.querySelector("#hintButton");
const resetButton = document.querySelector("#resetButton");
const listenButton = document.querySelector("#listenButton");
const recordButton = document.querySelector("#recordButton");
const stopButton = document.querySelector("#stopButton");
const newSentenceButton = document.querySelector("#newSentenceButton");
const playback = document.querySelector("#playback");
const recordStatus = document.querySelector("#recordStatus");
const levelButtons = document.querySelectorAll(".level-button");

renderProgress();
renderQuestion();

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLevel = button.dataset.level;
    currentIndex = Math.min(state.verb.levels[currentLevel], getQuestions().length - 1);
    levelButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderProgress();
    renderQuestion();
  });
});

resetButton.addEventListener("click", () => {
  state.verb.levels[currentLevel] = 0;
  currentIndex = 0;
  saveState();
  renderProgress();
  renderQuestion();
});

ruleButton.addEventListener("click", () => {
  const question = getQuestions()[currentIndex];
  showSupport(`💡 Regel: ${question.rule}`);
});

hintButton.addEventListener("click", () => {
  const question = getQuestions()[currentIndex];
  showSupport(`🧩 Hint: ${question.hint}`);
});

listenButton.addEventListener("click", () => {
  const text = document.querySelector("#speechText").textContent;
  if (!("speechSynthesis" in window)) {
    recordStatus.textContent = "Denne nettleseren støtter ikke opplesing akkurat nå.";
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
});

newSentenceButton.addEventListener("click", () => {
  speechIndex = (speechIndex + 1) % speechSentences.length;
  document.querySelector("#speechText").textContent = speechSentences[speechIndex];
  recordStatus.textContent = "Ny setning klar. Lytt først, og les den inn når du vil.";
});

recordButton.addEventListener("click", async () => {
  if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
    recordStatus.textContent = "Opptak støttes ikke i denne nettleseren. Prøv Chrome, Edge eller Safari.";
    return;
  }

  try {
    if (playback.src) {
      URL.revokeObjectURL(playback.src);
      playback.removeAttribute("src");
      playback.load();
    }

    microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedChunks = [];
    const options = MediaRecorder.isTypeSupported("audio/webm") ? { mimeType: "audio/webm" } : undefined;
    mediaRecorder = new MediaRecorder(microphoneStream, options);

    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioType = recordedChunks[0]?.type || "audio/webm";
      const blob = new Blob(recordedChunks, { type: audioType });
      playback.src = URL.createObjectURL(blob);
      recordStatus.textContent = "Opptaket er klart. Trykk play for å høre deg selv, eller spill inn på nytt.";
      recordButton.textContent = "🎙️ Spill inn på nytt";
      microphoneStream.getTracks().forEach((track) => track.stop());
    });

    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
    recordStatus.textContent = "Tar opp... Les setningen rolig på fransk.";
  } catch (error) {
    recordStatus.textContent = "Mikrofonen ble ikke tilgjengelig. Sjekk at du har trykket tillat.";
  }
});

stopButton.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
  recordButton.disabled = false;
  stopButton.disabled = true;
});

function getQuestions() {
  if (currentLevel === "blandet") {
    return questionBank;
  }

  return questionBank.filter((question) => question.level === currentLevel);
}

function renderQuestion() {
  const questions = getQuestions();
  const completed = state.verb.levels[currentLevel];

  if (completed >= questions.length) {
    currentIndex = questions.length - 1;
  }

  const question = questions[currentIndex];
  questionTitle.textContent = `${levelNames[currentLevel]}: ${question.title}`;
  questionCount.textContent = `Oppgave ${Math.min(currentIndex + 1, questions.length)} av ${questions.length}`;
  questionText.textContent = question.text;
  feedback.textContent = completed >= questions.length ? "🏆 Dette nivået er fullført. Start nivået på nytt hvis du vil terpe mer." : "";
  feedback.className = completed >= questions.length ? "feedback correct" : "feedback";
  supportText.textContent = "";
  supportText.className = "support-text";
  answerGrid.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(answer));
    answerGrid.appendChild(button);
  });
}

function checkAnswer(answer) {
  const questions = getQuestions();
  const question = questions[currentIndex];

  if (answer === question.correct) {
    feedback.textContent = `✅ ${question.feedback}`;
    feedback.className = "feedback correct";

    if (state.verb.levels[currentLevel] === currentIndex) {
      state.verb.levels[currentLevel] += 1;
      if (!state.verb.answered.includes(question.id)) {
        state.verb.answered.push(question.id);
      }
      saveState();
      renderProgress();
    }

    window.setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        renderQuestion();
      } else {
        feedback.textContent = "🏆 Nivået er fullført! Du kan starte på nytt hvis du vil terpe mer.";
        feedback.className = "feedback correct";
      }
    }, 850);
  } else {
    feedback.textContent = "🔁 Ikke helt. Prøv igjen, eller trykk på Vis regel / Vis hint hvis du vil ha hjelp.";
    feedback.className = "feedback wrong";
  }
}

function showSupport(text) {
  supportText.textContent = text;
  supportText.className = "support-text visible";
}

function renderProgress() {
  const questions = getQuestions();
  const completed = state.verb.levels[currentLevel];
  const percent = Math.round((completed / questions.length) * 100);
  verbProgress.style.width = `${percent}%`;
  verbProgressText.textContent = `${levelNames[currentLevel]}: ${completed} av ${questions.length} oppgaver`;
  totalScore.textContent = state.verb.answered.length * 10;
}

function loadState() {
  const fallback = {
    verb: {
      levels: {
        blandet: 0,
        lett: 0,
        middels: 0,
        utfordring: 0
      },
      answered: []
    }
  };

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (stored?.verb?.levels && Array.isArray(stored.verb.answered)) {
      return stored;
    }
    return fallback;
  } catch (error) {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}
