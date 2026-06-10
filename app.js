const questions = [
  {
    title: "Regelrett -ER",
    rule: "-ER-verb får ofte endelsene -e, -es, -e, -ons, -ez, -ent.",
    text: "Velg riktig form: Je ___ français.",
    answers: ["parle", "parles", "parlons", "parlez"],
    correct: "parle",
    feedback: "Riktig! Med je bruker vi ofte -e: je parle.",
    hint: "Se på pronomenet je. Det passer med formen som slutter på -e."
  },
  {
    title: "Regelrett -ER",
    rule: "Med nous får regelrette -ER-verb endelsen -ons.",
    text: "Velg riktig form: Nous ___ à Meaux.",
    answers: ["habite", "habites", "habitons", "habitez"],
    correct: "habitons",
    feedback: "Bra! Nous habitons betyr vi bor.",
    hint: "Nous trenger ofte endelsen -ons."
  },
  {
    title: "Regelrett -IR",
    rule: "Mange regelrette -IR-verb bruker -is, -is, -it, -issons, -issez, -issent.",
    text: "Velg riktig form: Tu ___ le devoir.",
    answers: ["finis", "finit", "finissons", "finissez"],
    correct: "finis",
    feedback: "Ja! Tu finis betyr du gjør ferdig.",
    hint: "Tu og je får ofte samme form i regelrette -IR-verb: finis."
  },
  {
    title: "Regelrett -RE",
    rule: "Mange regelrette -RE-verb bruker -s, -s, ingenting, -ons, -ez, -ent.",
    text: "Velg riktig form: Ils ___ le train.",
    answers: ["attend", "attends", "attendons", "attendent"],
    correct: "attendent",
    feedback: "Riktig! Ils attendent betyr de venter.",
    hint: "Ils/elles-formen slutter ofte på -ent."
  },
  {
    title: "Être",
    rule: "Être betyr å være: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.",
    text: "Velg riktig form: Elle ___ en Corse.",
    answers: ["suis", "es", "est", "sommes"],
    correct: "est",
    feedback: "Très bien! Elle est betyr hun er.",
    hint: "Elle bruker samme form som il: est."
  },
  {
    title: "Avoir",
    rule: "Avoir betyr å ha: j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.",
    text: "Velg riktig form: Nous ___ un plan de Paris.",
    answers: ["ai", "as", "avons", "ont"],
    correct: "avons",
    feedback: "Flott! Nous avons betyr vi har.",
    hint: "Nous bruker formen avons."
  }
];

const storageKey = "salut10-progress-v1";
const state = loadState();
let currentIndex = Math.min(state.verb.completed, questions.length - 1);
let mediaRecorder;
let recordedChunks = [];
let microphoneStream;

const totalScore = document.querySelector("#totalScore");
const verbProgress = document.querySelector("#verbProgress");
const verbProgressText = document.querySelector("#verbProgressText");
const questionTitle = document.querySelector("#questionTitle");
const ruleText = document.querySelector("#ruleText");
const questionText = document.querySelector("#questionText");
const answerGrid = document.querySelector("#answerGrid");
const feedback = document.querySelector("#feedback");
const resetButton = document.querySelector("#resetButton");
const listenButton = document.querySelector("#listenButton");
const recordButton = document.querySelector("#recordButton");
const stopButton = document.querySelector("#stopButton");
const playback = document.querySelector("#playback");
const recordStatus = document.querySelector("#recordStatus");

renderProgress();
renderQuestion();

resetButton.addEventListener("click", () => {
  state.verb.completed = 0;
  state.verb.score = 0;
  currentIndex = 0;
  saveState();
  renderProgress();
  renderQuestion();
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

recordButton.addEventListener("click", async () => {
  if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
    recordStatus.textContent = "Opptak støttes ikke i denne nettleseren. Prøv Chrome, Edge eller Safari.";
    return;
  }

  try {
    microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(microphoneStream);

    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    });

    mediaRecorder.addEventListener("stop", () => {
      const blob = new Blob(recordedChunks, { type: "audio/webm" });
      playback.src = URL.createObjectURL(blob);
      recordStatus.textContent = "Opptaket er klart. Trykk play for å høre deg selv.";
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

function renderQuestion() {
  const question = questions[currentIndex];
  questionTitle.textContent = question.title;
  ruleText.textContent = question.rule;
  questionText.textContent = question.text;
  feedback.textContent = "";
  feedback.className = "feedback";
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
  const question = questions[currentIndex];

  if (answer === question.correct) {
    feedback.textContent = `✅ ${question.feedback}`;
    feedback.className = "feedback correct";

    if (state.verb.completed === currentIndex) {
      state.verb.completed += 1;
      state.verb.score += 10;
      saveState();
      renderProgress();
    }

    window.setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        renderQuestion();
      } else {
        feedback.textContent = "🏆 Modulen er fullført! Du kan starte på nytt hvis du vil terpe mer.";
        feedback.className = "feedback correct";
      }
    }, 950);
  } else {
    feedback.textContent = `🔁 Prøv igjen. ${question.hint}`;
    feedback.className = "feedback wrong";
  }
}

function renderProgress() {
  const completed = state.verb.completed;
  const percent = Math.round((completed / questions.length) * 100);
  verbProgress.style.width = `${percent}%`;
  verbProgressText.textContent = `${completed} av ${questions.length} oppgaver`;
  totalScore.textContent = state.verb.score;
}

function loadState() {
  const fallback = {
    verb: {
      completed: 0,
      score: 0
    }
  };

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    return stored?.verb ? stored : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}
