const soundKey = "salut10-sound-enabled";
let audioContext;
let ambientTimer;
let soundEnabled = localStorage.getItem(soundKey) === "true";

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
    startAmbient();
    playTone([523, 659, 784], 0.08, "sine");
  } else {
    stopAmbient();
  }

  updateSoundButton();
});

document.addEventListener("click", (event) => {
  if (!soundEnabled || event.target === soundButton) {
    return;
  }

  const clickedAnswer = event.target.closest("#answerGrid button, #summaryAnswers button");
  if (!clickedAnswer) {
    return;
  }

  window.setTimeout(() => {
    const isCorrect = document.querySelector(".feedback.correct, .summary-feedback.correct");
    const isWrong = document.querySelector(".feedback.wrong, .summary-feedback.wrong");

    if (isCorrect) {
      playTone([660, 880], 0.07, "triangle");
    } else if (isWrong) {
      playTone([220, 196], 0.08, "sine");
    }
  }, 40);
});

if (soundEnabled) {
  updateSoundButton();
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

function startAmbient() {
  stopAmbient();
  ambientTimer = window.setInterval(() => {
    playTone([392, 494, 587], 0.045, "sine", 1.2);
  }, 5200);
}

function stopAmbient() {
  if (ambientTimer) {
    window.clearInterval(ambientTimer);
    ambientTimer = undefined;
  }
}

async function playTone(frequencies, volume = 0.06, type = "sine", duration = 0.28) {
  if (!soundEnabled) {
    return;
  }

  await ensureAudio();
  const now = audioContext.currentTime;

  frequencies.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + index * 0.07;
    const stop = start + duration;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, stop);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(stop + 0.04);
  });
}
