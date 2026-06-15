const soundKey = "salut10-sound-enabled";
let audioContext;
let soundEnabled = localStorage.getItem(soundKey) === "true";

applyTextCorrections();
insertDeresPractice();
enhancePasseTranslationTask();
insertAvoirEtreAgreementPractice();

const soundButton = document.createElement("button");
soundButton.type = "button";
soundButton.className = "sound-toggle";
soundButton.setAttribute("aria-label", "Slå lyd av eller på");
document.body.appendChild(soundButton);
updateSoundButton();

soundButton.addEventListener("click", async () => {
  soundEnabled = !soundEnabled;
  localStorage.setItem(soundKey, String(soundEnabled));

  if (soundEnabled) {
    await ensureAudio();
    playTone([523, 659, 784], 0.06, "sine");
  }

  updateSoundButton();
});

document.addEventListener("click", (event) => {
  if (!soundEnabled || event.target === soundButton) {
    return;
  }

  const clickedAnswer = event.target.closest("#answerGrid button, #summaryAnswers button, .check-button");
  if (!clickedAnswer) {
    return;
  }

  window.setTimeout(() => {
    const isCorrect = document.querySelector(".feedback.correct, .summary-feedback.correct, .activity-feedback.correct");
    const isWrong = document.querySelector(".feedback.wrong, .summary-feedback.wrong, .activity-feedback.wrong");

    if (isCorrect) {
      playTone([660, 880], 0.055, "triangle");
    } else if (isWrong) {
      playTone([220, 196], 0.055, "sine");
    }
  }, 40);
});

function applyTextCorrections() {
  const possessiveLabels = document.querySelectorAll("#eiendomsord .activity-row label");
  possessiveLabels.forEach((label) => {
    if (label.textContent.trim() === "deres bil = ___ voiture") {
      label.textContent = "bilen til dem = ___ voiture";
    }
  });

  const ruleCard = document.querySelector("#eiendomsord .rule-card");
  if (ruleCard && !document.querySelector(".possessive-note")) {
    ruleCard.insertAdjacentHTML(
      "beforeend",
      `<p class="possessive-note"><strong>Obs:</strong> På norsk kan "deres" bety både <strong>til dere</strong> og <strong>til dem</strong>. På fransk blir det <strong>votre/vos</strong> for dere, men <strong>leur/leurs</strong> for dem.</p>`
    );
  }
}

function enhancePasseTranslationTask() {
  const cards = document.querySelectorAll("#passe-compose .activity-card");
  const translationCard = [...cards].find((card) => card.querySelector("h3")?.textContent.includes("Oversett kort"));
  if (!translationCard || translationCard.dataset.translationEnhanced) return;

  translationCard.dataset.translationEnhanced = "true";
  translationCard.querySelectorAll(".activity-row label").forEach((label) => {
    const text = label.textContent.trim();
    if (text === "Jeg dro til Paris. = Je ___ allé à Paris.") {
      label.textContent = "Jeg dro til Paris. (aller) = Je ___ allé à Paris.";
    }
    if (text === "Hun kom til Meaux. = Elle est ___ à Meaux.") {
      label.textContent = "Hun ankom Meaux. (arriver) = Elle est ___ à Meaux.";
    }
    if (text === "Vi besøkte Korsika. = Nous avons ___ la Corse.") {
      label.textContent = "Vi besøkte Korsika. (visiter) = Nous avons ___ la Corse.";
    }
  });

  const heading = translationCard.querySelector("h3");
  heading.insertAdjacentHTML(
    "afterend",
    `<p class="passe-translation-note">Bruk verbet i parentes. <strong>Visiter</strong> får partisippet <strong>visité</strong>; her legger vi ikke til s etter <strong>avoir</strong>.</p>`
  );
}

function insertAvoirEtreAgreementPractice() {
  const grid = document.querySelector("#passe-compose .activity-grid");
  if (!grid || document.querySelector("[data-check='passe-9']")) return;

  grid.insertAdjacentHTML(
    "beforeend",
    `<article class="activity-card avoir-etre-card">
      <h3>🔎 Avoir eller être: bøyer partisippet?</h3>
      <p>Finn først hjelpeverbet. Med <strong>avoir</strong> endrer vi vanligvis ikke partisippet. Med <strong>être</strong> må partisippet passe med personen.</p>
      <div class="activity-row"><label>Nous ___ visité Paris. Hjelpeverb?</label><select data-answer="avons"><option></option><option>avons</option><option>sommes</option></select></div>
      <div class="activity-row"><label>Nous avons ___ Paris.</label><select data-answer="visité"><option></option><option>visité</option><option>visités</option><option>visitées</option></select></div>
      <div class="activity-row"><label>Elles ___ arrivées en Corse. Hjelpeverb?</label><select data-answer="sont"><option></option><option>ont</option><option>sont</option></select></div>
      <div class="activity-row"><label>Elles sont ___ en Corse.</label><select data-answer="arrivées"><option></option><option>arrivé</option><option>arrivée</option><option>arrivées</option></select></div>
      <div class="activity-row"><label>Elle ___ regardé les photos. Hjelpeverb?</label><select data-answer="a"><option></option><option>a</option><option>est</option></select></div>
      <div class="activity-row"><label>Elle a ___ les photos.</label><select data-answer="regardé"><option></option><option>regardé</option><option>regardée</option><option>regardées</option></select></div>
      <div class="activity-row"><label>Ils ___ partis de la gare. Hjelpeverb?</label><select data-answer="sont"><option></option><option>ont</option><option>sont</option></select></div>
      <div class="activity-row"><label>Ils sont ___ de la gare.</label><select data-answer="partis"><option></option><option>parti</option><option>partie</option><option>partis</option><option>parties</option></select></div>
      <div class="activity-row"><label>Med avoir gjør vi vanligvis dette med partisippet:</label><select data-answer="lar det stå"><option></option><option>lar det stå</option><option>legger alltid til e</option><option>legger alltid til s</option></select></div>
      <div class="activity-row"><label>Med être må partisippet passe med:</label><select data-answer="personen"><option></option><option>personen</option><option>stedet</option><option>eiendomsordet</option></select></div>
      <button class="check-button" data-check="passe-9" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>`
  );

  const card = document.querySelector(".avoir-etre-card");
  const button = card.querySelector(".check-button");
  const completed = getCompletedSoundActivityIds();
  if (completed.has("passe-9")) card.classList.add("activity-complete");

  button.addEventListener("click", () => checkAvoirEtrePractice(card, button));
  card.querySelectorAll("[data-answer]").forEach((field) => {
    field.addEventListener("change", () => clearDeresField(field));
    field.addEventListener("input", () => clearDeresField(field));
  });
}

function insertDeresPractice() {
  const grid = document.querySelector("#eiendomsord .activity-grid");
  if (!grid || document.querySelector("[data-check='possessifs-9']")) return;

  grid.insertAdjacentHTML(
    "beforeend",
    `<article class="activity-card deres-card">
      <h3>🧭 Deres: dere eller dem?</h3>
      <p>Spør først: betyr "deres" <strong>til dere</strong> eller <strong>til dem</strong>? Se deretter på entall eller flertall.</p>
      <div class="activity-row"><label>bilen til dere = ___ voiture</label><select data-answer="votre"><option></option><option>votre</option><option>vos</option><option>leur</option><option>leurs</option></select></div>
      <div class="activity-row"><label>bilene til dere = ___ voitures</label><select data-answer="vos"><option></option><option>votre</option><option>vos</option><option>leur</option><option>leurs</option></select></div>
      <div class="activity-row"><label>bilen til dem = ___ voiture</label><select data-answer="leur"><option></option><option>votre</option><option>vos</option><option>leur</option><option>leurs</option></select></div>
      <div class="activity-row"><label>bilene til dem = ___ voitures</label><select data-answer="leurs"><option></option><option>votre</option><option>vos</option><option>leur</option><option>leurs</option></select></div>
      <div class="activity-row"><label>votre/vos betyr at eieren er:</label><select data-answer="dere"><option></option><option>dere</option><option>de/dem</option><option>han/hun</option></select></div>
      <div class="activity-row"><label>leur/leurs betyr at eieren er:</label><select data-answer="de/dem"><option></option><option>dere</option><option>de/dem</option><option>jeg</option></select></div>
      <button class="check-button" data-check="possessifs-9" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>`
  );

  const card = document.querySelector(".deres-card");
  const button = card.querySelector(".check-button");
  const completed = getCompletedSoundActivityIds();
  if (completed.has("possessifs-9")) card.classList.add("activity-complete");

  button.addEventListener("click", () => checkDeresPractice(card, button));
  card.querySelectorAll("[data-answer]").forEach((field) => {
    field.addEventListener("change", () => clearDeresField(field));
    field.addEventListener("input", () => clearDeresField(field));
  });
}

function checkDeresPractice(card, button) {
  const fields = card.querySelectorAll("[data-answer]");
  let correct = 0;

  fields.forEach((field) => {
    const expected = normalizeSoundAnswer(field.dataset.answer);
    const given = normalizeSoundAnswer(field.value);
    const isCorrect = expected === given;
    field.classList.toggle("is-correct", isCorrect);
    field.classList.toggle("is-wrong", !isCorrect);
    if (isCorrect) correct += 1;
  });

  const feedback = card.querySelector(".activity-feedback");
  const allCorrect = correct === fields.length;
  feedback.textContent = allCorrect
    ? "✅ Riktig. Nå skiller du mellom deres = til dere og deres = til dem."
    : `🔁 ${correct} av ${fields.length} riktige. Se først på hvem som eier: dere eller de/dem.`;
  feedback.className = allCorrect ? "activity-feedback correct" : "activity-feedback wrong";

  if (allCorrect) {
    const completed = getCompletedSoundActivityIds();
    completed.add(button.dataset.check);
    localStorage.setItem("salut10-module1-activity-progress-v1", JSON.stringify([...completed]));
    card.classList.add("activity-complete");
    document.dispatchEvent(new CustomEvent("moduleProgressChanged"));
  }
}

function checkAvoirEtrePractice(card, button) {
  const fields = card.querySelectorAll("[data-answer]");
  let correct = 0;

  fields.forEach((field) => {
    const expected = normalizeSoundAnswer(field.dataset.answer);
    const given = normalizeSoundAnswer(field.value);
    const isCorrect = expected === given;
    field.classList.toggle("is-correct", isCorrect);
    field.classList.toggle("is-wrong", !isCorrect);
    if (isCorrect) correct += 1;
  });

  const feedback = card.querySelector(".activity-feedback");
  const allCorrect = correct === fields.length;
  feedback.textContent = allCorrect
    ? "✅ Riktig. Med avoir står partisippet vanligvis fast. Med être passer det med personen."
    : `🔁 ${correct} av ${fields.length} riktige. Finn hjelpeverbet først: avoir eller être?`;
  feedback.className = allCorrect ? "activity-feedback correct" : "activity-feedback wrong";

  if (allCorrect) {
    const completed = getCompletedSoundActivityIds();
    completed.add(button.dataset.check);
    localStorage.setItem("salut10-module1-activity-progress-v1", JSON.stringify([...completed]));
    card.classList.add("activity-complete");
    document.dispatchEvent(new CustomEvent("moduleProgressChanged"));
  }
}

function clearDeresField(field) {
  field.classList.remove("is-wrong", "is-correct");
  const feedback = field.closest(".activity-card")?.querySelector(".activity-feedback");
  if (feedback?.classList.contains("wrong")) {
    feedback.textContent = "";
    feedback.className = "activity-feedback";
  }
}

function getCompletedSoundActivityIds() {
  try {
    const stored = JSON.parse(localStorage.getItem("salut10-module1-activity-progress-v1"));
    return new Set(Array.isArray(stored) ? stored : []);
  } catch (error) {
    return new Set();
  }
}

function normalizeSoundAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}

async function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
}

function updateSoundButton() {
  soundButton.dataset.active = String(soundEnabled);
  soundButton.textContent = soundEnabled ? "🔊 Lyd på" : "🔇 Lyd av";
}

async function playTone(frequencies, volume = 0.06, type = "sine", duration = 0.22) {
  if (!soundEnabled) {
    return;
  }

  await ensureAudio();
  const now = audioContext.currentTime;

  frequencies.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + index * 0.06;
    const stop = start + duration;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, stop);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(stop + 0.04);
  });
}
