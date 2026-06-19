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
    type: "write",
    title: "Skriv selv: -ER med je",
    rule: "Bruk subjektet je og ett av verbene parler, habiter, visiter, aimer eller regarder i presens.",
    text: "Lag en egen fransk setning med je og et regelrett -ER-verb i presens.",
    minimumWords: 4,
    subjects: ["je", "j'"],
    requirements: [{ label: "en riktig je-form av et -ER-verb", forms: ["parle", "habite", "visite", "aime", "regarde", "écoute"] }],
    feedback: "Fin setning. Du bruker je og en regelrett -ER-form i presens.",
    hint: "Ingen hint på utfordring. Prøv å skrive en hel setning selv."
  },
  {
    id: "utfordring-2",
    level: "utfordring",
    type: "write",
    title: "Skriv selv: -ER med nous",
    rule: "Bruk nous og ett -ER-verb i presens. Formen slutter ofte på -ons.",
    text: "Skriv en setning om en reise eller et sted med nous og et -ER-verb.",
    minimumWords: 5,
    subjects: ["nous"],
    requirements: [{ label: "en riktig nous-form av et -ER-verb", forms: ["visitons", "habitons", "regardons", "aimons", "parlons", "écoutons"] }],
    feedback: "Bra. Du bruker nous og en -ER-form som passer.",
    hint: "Ingen hint på utfordring."
  },
  {
    id: "utfordring-3",
    level: "utfordring",
    type: "write",
    title: "Skriv selv: -IR med je eller tu",
    rule: "Bruk je eller tu og et regelrett -IR-verb som finir, choisir eller réussir.",
    text: "Lag en egen setning med je eller tu og et regelrett -IR-verb i presens.",
    minimumWords: 4,
    subjects: ["je", "j'", "tu"],
    requirements: [{ label: "en riktig je/tu-form av et -IR-verb", forms: ["finis", "choisis", "réussis", "remplis"] }],
    feedback: "Dette fungerer. Je/tu-formen av mange -IR-verb slutter på -is.",
    hint: "Ingen hint på utfordring."
  },
  {
    id: "utfordring-4",
    level: "utfordring",
    type: "write",
    title: "Skriv selv: -IR med nous eller vous",
    rule: "Bruk nous eller vous og et -IR-verb i presens. Formene er ofte -issons og -issez.",
    text: "Skriv en setning med nous eller vous og et regelrett -IR-verb.",
    minimumWords: 5,
    subjects: ["nous", "vous"],
    requirements: [{ label: "en riktig nous/vous-form av et -IR-verb", forms: ["finissons", "choisissons", "réussissons", "finissez", "choisissez", "réussissez"] }],
    feedback: "Godt jobbet. Du har brukt en tydelig -IR-form i presens.",
    hint: "Ingen hint på utfordring."
  },
  {
    id: "utfordring-5",
    level: "utfordring",
    type: "write",
    title: "Skriv selv: -RE med il eller elle",
    rule: "Bruk il eller elle og et regelrett -RE-verb som attendre, vendre, répondre eller perdre.",
    text: "Lag en egen setning med il eller elle og et regelrett -RE-verb i presens.",
    minimumWords: 4,
    subjects: ["il", "elle"],
    requirements: [{ label: "en riktig il/elle-form av et -RE-verb", forms: ["attend", "vend", "répond", "perd", "descend"] }],
    feedback: "Ja. Med il/elle har mange -RE-verb kort form, for eksempel il attend.",
    hint: "Ingen hint på utfordring."
  },
  {
    id: "utfordring-6",
    level: "utfordring",
    type: "write",
    title: "Skriv selv: -RE med ils eller elles",
    rule: "Bruk ils eller elles og et regelrett -RE-verb i presens.",
    text: "Skriv en setning med ils eller elles og et -RE-verb.",
    minimumWords: 5,
    subjects: ["ils", "elles"],
    requirements: [{ label: "en riktig ils/elles-form av et -RE-verb", forms: ["attendent", "vendent", "répondent", "perdent", "descendent"] }],
    feedback: "Flott. Du har brukt en flertallsform av et -RE-verb.",
    hint: "Ingen hint på utfordring."
  },
  {
    id: "utfordring-7",
    level: "utfordring",
    type: "write",
    title: "Tre setninger: ER, IR og RE",
    rule: "Skriv tre setninger. Du må bruke minst ett -ER-verb, ett -IR-verb og ett -RE-verb i presens.",
    text: "Skriv tre korte setninger på fransk: én med -ER, én med -IR og én med -RE.",
    minimumWords: 12,
    minimumSentences: 3,
    requirements: [
      { label: "minst ett -ER-verb i presens", forms: ["parle", "parles", "parlons", "parlez", "parlent", "habite", "habites", "habitons", "habitez", "habitent", "visite", "visitons", "visitez", "visitent"] },
      { label: "minst ett -IR-verb i presens", forms: ["finis", "finit", "finissons", "finissez", "finissent", "choisis", "choisit", "choisissons", "choisissez", "choisissent"] },
      { label: "minst ett -RE-verb i presens", forms: ["attends", "attend", "attendons", "attendez", "attendent", "vends", "vend", "vendons", "vendez", "vendent", "réponds", "répond", "répondons", "répondez", "répondent"] }
    ],
    feedback: "Très bien. Her viser du at du kan bruke alle tre verbgruppene.",
    hint: "Ingen hint på utfordring."
  },
  {
    id: "utfordring-8",
    level: "utfordring",
    type: "write",
    title: "Miniavsnitt: en region",
    rule: "Skriv et lite avsnitt om et sted. Bruk minst to presensverb.",
    text: "Skriv 3-4 setninger om Paris, Meaux, Corse, Guyane eller en annen fransk region. Bruk minst to presensverb.",
    minimumWords: 18,
    minimumSentences: 3,
    requirements: [
      { label: "minst ett -ER-verb i presens", forms: ["parle", "parles", "parlons", "parlez", "parlent", "habite", "habites", "habitons", "habitez", "habitent", "visite", "visitons", "visitez", "visitent", "aime", "aimes", "aimons", "aimez", "aiment"] },
      { label: "minst ett annet presensverb", forms: ["suis", "es", "est", "sommes", "êtes", "sont", "ai", "as", "a", "avons", "avez", "ont", "finis", "finit", "choisis", "choisit", "attends", "attend", "répond", "vends"] }
    ],
    feedback: "Fint avsnitt. Dette er mer som en liten fri skriveoppgave.",
    hint: "Ingen hint på utfordring."
  },
  {
    id: "utfordring-9",
    level: "utfordring",
    type: "write",
    title: "Muntlig forberedelse",
    rule: "Skriv noe du kunne sagt høyt. Bruk presens og minst to ulike verb.",
    text: "Skriv 3 setninger du kunne lest inn muntlig om deg selv eller en reise.",
    minimumWords: 16,
    minimumSentences: 3,
    requirements: [{ label: "minst to presensverb", forms: ["suis", "es", "est", "sommes", "êtes", "sont", "ai", "as", "a", "avons", "avez", "ont", "parle", "habite", "aime", "visite", "regarde", "finis", "choisis", "attends", "réponds", "vends"] }],
    feedback: "Dette kan brukes som muntlig trening. Les det gjerne høyt etterpå.",
    hint: "Ingen hint på utfordring."
  },
  {
    id: "utfordring-10",
    level: "utfordring",
    type: "write",
    title: "Fri utfordring",
    rule: "Skriv uten svaralternativer. Bruk ER, IR og RE i presens hvis du klarer.",
    text: "Skriv et lite avsnitt på fransk. Tema: en by, en region, skolen din eller fritiden din. Bruk minst ett -ER-verb, ett -IR-verb og ett -RE-verb.",
    minimumWords: 24,
    minimumSentences: 4,
    requirements: [
      { label: "minst ett -ER-verb", forms: ["parle", "parles", "parlons", "parlez", "parlent", "habite", "habites", "habitons", "habitez", "habitent", "visite", "visitons", "visitez", "visitent", "aime", "aimons", "aiment"] },
      { label: "minst ett -IR-verb", forms: ["finis", "finit", "finissons", "finissez", "finissent", "choisis", "choisit", "choisissons", "choisissez", "choisissent"] },
      { label: "minst ett -RE-verb", forms: ["attends", "attend", "attendons", "attendez", "attendent", "vends", "vend", "vendons", "vendez", "vendent", "réponds", "répond", "répondons", "répondez", "répondent"] }
    ],
    feedback: "Sterkt jobbet. Dette er en åpen skriveoppgave med mer faglig motstand.",
    hint: "Ingen hint på utfordring."
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
const helpRow = document.querySelector(".help-row");

injectWritingStyles();
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
      if (event.data.size > 0) recordedChunks.push(event.data);
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
  if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
  recordButton.disabled = false;
  stopButton.disabled = true;
});

function getQuestions() {
  if (currentLevel === "blandet") return questionBank;
  return questionBank.filter((question) => question.level === currentLevel);
}

function renderQuestion() {
  const questions = getQuestions();
  const completed = state.verb.levels[currentLevel];

  if (completed >= questions.length) currentIndex = questions.length - 1;

  const question = questions[currentIndex];
  const isWritingTask = question.type === "write";
  questionTitle.textContent = `${levelNames[currentLevel]}: ${question.title}`;
  questionCount.textContent = `Oppgave ${Math.min(currentIndex + 1, questions.length)} av ${questions.length}`;
  questionText.textContent = question.text;
  feedback.textContent = completed >= questions.length ? "🏆 Dette nivået er fullført. Start nivået på nytt hvis du vil terpe mer." : "";
  feedback.className = completed >= questions.length ? "feedback correct" : "feedback";
  supportText.textContent = "";
  supportText.className = "support-text";
  answerGrid.innerHTML = "";
  answerGrid.classList.toggle("writing-grid", isWritingTask);
  if (helpRow) helpRow.style.display = isWritingTask ? "none" : "flex";

  if (isWritingTask) {
    renderWritingTask(question);
    return;
  }

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(answer));
    answerGrid.appendChild(button);
  });
}

function renderWritingTask(question) {
  const wrapper = document.createElement("div");
  wrapper.className = "writing-task";
  wrapper.innerHTML = `
    <p class="challenge-note"><strong>Utfordring uten svaralternativer:</strong> Skriv selv. Siden sjekker noen tydelige kjennetegn, men læreren kan fortsatt vurdere språk og innhold.</p>
    <textarea id="challengeAnswer" rows="7" spellcheck="false" placeholder="Skriv setningen eller avsnittet ditt her..."></textarea>
    <div class="writing-checklist" id="writingChecklist"></div>
    <button class="writing-check-button" id="writingCheckButton" type="button">Sjekk setning</button>
  `;
  answerGrid.appendChild(wrapper);

  const textarea = wrapper.querySelector("#challengeAnswer");
  const button = wrapper.querySelector("#writingCheckButton");
  button.addEventListener("click", () => checkWritingAnswer(question, textarea.value));
  textarea.addEventListener("input", () => {
    feedback.textContent = "";
    feedback.className = "feedback";
    wrapper.querySelector("#writingChecklist").innerHTML = "";
  });
}

function checkAnswer(answer) {
  const questions = getQuestions();
  const question = questions[currentIndex];

  if (answer === question.correct) {
    markQuestionCorrect(question, `✅ ${question.feedback}`);
  } else {
    feedback.textContent = "🔁 Ikke helt. Prøv igjen, eller trykk på Vis regel / Vis hint hvis du vil ha hjelp.";
    feedback.className = "feedback wrong";
  }
}

function checkWritingAnswer(question, value) {
  const checks = validateWritingAnswer(question, value);
  const passed = checks.filter((check) => check.ok).length;
  const allCorrect = checks.length > 0 && passed === checks.length;
  const checklist = document.querySelector("#writingChecklist");

  checklist.innerHTML = checks
    .map((check) => `<p class="${check.ok ? "ok" : "missing"}">${check.ok ? "✓" : "•"} ${check.label}</p>`)
    .join("");

  if (allCorrect) {
    markQuestionCorrect(question, `✅ ${question.feedback}`);
  } else {
    feedback.textContent = `🔁 ${passed} av ${checks.length} krav er på plass. Se på punktene over og prøv igjen.`;
    feedback.className = "feedback wrong";
  }
}

function validateWritingAnswer(question, value) {
  const normalized = normalizeAnswer(value);
  const words = normalized.split(" ").filter(Boolean);
  const sentenceCount = countSentences(value);
  const checks = [];

  checks.push({
    label: `minst ${question.minimumWords || 4} ord`,
    ok: words.length >= (question.minimumWords || 4)
  });

  if (question.minimumSentences) {
    checks.push({
      label: `minst ${question.minimumSentences} setninger`,
      ok: sentenceCount >= question.minimumSentences
    });
  }

  if (question.subjects?.length) {
    checks.push({
      label: `riktig subjekt: ${question.subjects.join(" / ")}`,
      ok: question.subjects.some((subject) => containsWord(normalized, normalizeAnswer(subject)))
    });
  }

  question.requirements?.forEach((requirement) => {
    checks.push({
      label: requirement.label,
      ok: requirement.forms.some((form) => containsWord(normalized, normalizeAnswer(form)))
    });
  });

  return checks;
}

function markQuestionCorrect(question, message) {
  const questions = getQuestions();
  feedback.textContent = message;
  feedback.className = "feedback correct";

  if (state.verb.levels[currentLevel] === currentIndex) {
    state.verb.levels[currentLevel] += 1;
    if (!state.verb.answered.includes(question.id)) state.verb.answered.push(question.id);
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
  }, question.type === "write" ? 1400 : 850);
}

function showSupport(text) {
  supportText.textContent = text;
  supportText.className = "support-text visible";
}

function renderProgress() {
  const questions = getQuestions();
  const completed = Math.min(state.verb.levels[currentLevel], questions.length);
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
    if (stored?.verb?.levels && Array.isArray(stored.verb.answered)) return stored;
    return fallback;
  } catch (error) {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function containsWord(text, word) {
  if (!word) return false;
  if (word.endsWith("'")) return text.includes(word);
  return new RegExp(`(^|\\s)${escapeRegExp(word)}($|\\s|[,.!?;:])`).test(text);
}

function countSentences(value) {
  const punctuationCount = (value.match(/[.!?]+/g) || []).length;
  const lineCount = value.split(/\n+/).map((line) => line.trim()).filter(Boolean).length;
  return Math.max(punctuationCount, lineCount);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’]/g, "'")
    .replace(/[\n\r\t]+/g, " ")
    .replace(/\s+/g, " ");
}

function injectWritingStyles() {
  if (document.querySelector("#writingTaskStyles")) return;
  const styles = document.createElement("style");
  styles.id = "writingTaskStyles";
  styles.textContent = `
    .answer-grid.writing-grid { display: block; }
    .writing-task { display: grid; gap: 12px; }
    .challenge-note { margin: 0; padding: 12px; border-radius: 8px; background: #eef2ff; color: #3730a3; line-height: 1.45; }
    .writing-task textarea { width: 100%; min-height: 160px; resize: vertical; padding: 14px; border: 1px solid var(--line); border-radius: 8px; font: inherit; line-height: 1.5; color: var(--ink); background: white; }
    .writing-task textarea:focus { outline: 2px solid #93c5fd; border-color: #2563eb; }
    .writing-check-button { min-height: 46px; border: 0; border-radius: 8px; color: white; background: #0f766e; font-weight: 900; cursor: pointer; }
    .writing-checklist { display: grid; gap: 6px; }
    .writing-checklist p { margin: 0; padding: 8px 10px; border-radius: 8px; line-height: 1.35; }
    .writing-checklist .ok { color: #166534; background: #dcfce7; }
    .writing-checklist .missing { color: #991b1b; background: #fee2e2; }
  `;
  document.head.appendChild(styles);
}
