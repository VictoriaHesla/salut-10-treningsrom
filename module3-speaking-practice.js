(() => {
  const questions = [
    {
      word: "où",
      question: "Où habites-tu ?",
      meaning: "Hvor bor du?",
      tip: "Start med où når du spør om sted."
    },
    {
      word: "comment",
      question: "Comment ça va ?",
      meaning: "Hvordan går det?",
      tip: "Comment brukes når du spør hvordan noe er eller går."
    },
    {
      word: "pourquoi",
      question: "Pourquoi tu apprends le français ?",
      meaning: "Hvorfor lærer du fransk?",
      tip: "Pourquoi brukes når du spør om grunn."
    },
    {
      word: "quelle",
      question: "Quelle langue parles-tu ?",
      meaning: "Hvilket språk snakker du?",
      tip: "Quelle brukes med hunkjønnsordet langue."
    },
    {
      word: "combien",
      question: "Combien de langues parles-tu ?",
      meaning: "Hvor mange språk snakker du?",
      tip: "Combien brukes når du spør om antall."
    },
    {
      word: "qui",
      question: "Qui parle français dans ta famille ?",
      meaning: "Hvem snakker fransk i familien din?",
      tip: "Qui brukes når du spør hvem."
    }
  ];

  function render() {
    const card = Array.from(document.querySelectorAll(".m3-card"))
      .find((item) => item.querySelector("h3")?.textContent.includes("Les og svar muntlig"));
    if (!card || card.dataset.speakingPractice === "true") return;

    injectStyles();
    card.dataset.speakingPractice = "true";

    card.innerHTML = `
      <h3>🔊 Still spørsmål muntlig</h3>
      <p class="card-help">Øv inn minst fem spørsmål. Bruk ulike spørreord, hør modellen, si spørsmålet høyt og få enkel tilbakemelding.</p>
      <div class="speaking-progress" aria-live="polite">
        <strong id="speakingDone">0 av 5</strong>
        <span>spørsmål øvd inn</span>
      </div>
      <div class="speaking-question-list">
        ${questions.map((item, index) => `
          <section class="speaking-question" data-speaking-index="${index}">
            <div class="question-word-badge">${item.word}</div>
            <div class="speaking-question-main">
              <p class="question-text">${item.question}</p>
              <p class="question-meaning">${item.meaning}</p>
              <p class="question-tip">${item.tip}</p>
              <p class="speech-result" aria-live="polite"></p>
            </div>
            <div class="speaking-actions">
              <button type="button" data-action="listen">Hør</button>
              <button type="button" data-action="record">Si spørsmålet</button>
              <button type="button" data-action="done">Jeg klarte det</button>
            </div>
          </section>
        `).join("")}
      </div>
      <div class="speaking-own-question">
        <h4>Lag ett eget spørsmål</h4>
        <p>Velg et spørreord du ikke har brukt nok, og lag et nytt spørsmål til en medelev.</p>
        <textarea rows="2" placeholder="For eksempel: Quand est-ce que tu étudies le français?"></textarea>
      </div>
      <p class="tiny-note">Automatisk tale-feedback virker best i Chrome og Edge. På iPad/Safari kan elevene bruke Hør og Jeg klarte det.</p>
    `;

    const completed = new Set();
    const recognition = getSpeechRecognition();

    card.querySelectorAll(".speaking-question").forEach((row) => {
      const index = Number(row.dataset.speakingIndex);
      const item = questions[index];
      const result = row.querySelector(".speech-result");

      row.querySelector('[data-action="listen"]').addEventListener("click", () => speak(item.question));
      row.querySelector('[data-action="done"]').addEventListener("click", () => {
        completed.add(index);
        row.classList.add("is-done");
        result.textContent = "Bra. Du har markert dette spørsmålet som øvd inn.";
        result.className = "speech-result good";
        updateProgress(completed.size);
      });
      row.querySelector('[data-action="record"]').addEventListener("click", () => {
        if (!recognition) {
          result.textContent = "Nettleseren kan ikke gi automatisk tale-feedback her. Hør modellen, si spørsmålet høyt og bruk Jeg klarte det når du er fornøyd.";
          result.className = "speech-result neutral";
          return;
        }
        listenForQuestion(recognition, item, index, row, result, completed, updateProgress);
      });
    });

    updateProgress(0);
  }

  function updateProgress(count) {
    const target = document.querySelector("#speakingDone");
    if (!target) return;
    target.textContent = `${Math.min(count, 5)} av 5`;
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.86;
    window.speechSynthesis.speak(utterance);
  }

  function getSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    return recognition;
  }

  function listenForQuestion(recognition, item, index, row, result, completed, updateProgress) {
    result.textContent = "Lytter ... si hele spørsmålet.";
    result.className = "speech-result listening";

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      const normalized = normalize(transcript);
      const expectedWord = normalize(item.word);
      const expectedCore = normalize(item.question).replace(/[?]/g, "");
      const hasQuestionWord = normalized.includes(expectedWord);
      const closeEnough = expectedCore.split(" ").filter((word) => normalized.includes(word)).length >= 3;

      if (hasQuestionWord && closeEnough) {
        completed.add(index);
        row.classList.add("is-done");
        result.textContent = `Bra! Jeg hørte: "${transcript}". Du brukte ${item.word}.`;
        result.className = "speech-result good";
        updateProgress(completed.size);
        return;
      }

      if (hasQuestionWord) {
        result.textContent = `Du brukte ${item.word}, bra. Prøv igjen og si litt mer av hele spørsmålet. Jeg hørte: "${transcript}".`;
        result.className = "speech-result almost";
        return;
      }

      result.textContent = `Prøv igjen. Husk å starte med ${item.word}. Jeg hørte: "${transcript}".`;
      result.className = "speech-result needs-work";
    };

    recognition.onerror = () => {
      result.textContent = "Jeg fikk ikke lyttet nå. Sjekk at mikrofon er tillatt, eller bruk Hør og Jeg klarte det.";
      result.className = "speech-result neutral";
    };

    recognition.onend = () => {
      if (result.classList.contains("listening")) {
        result.textContent = "Jeg rakk ikke å høre noe tydelig. Prøv én gang til.";
        result.className = "speech-result neutral";
      }
    };

    try {
      recognition.start();
    } catch {
      result.textContent = "Mikrofonen er allerede i bruk. Vent litt og prøv igjen.";
      result.className = "speech-result neutral";
    }
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[?!.,;:]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function injectStyles() {
    if (document.querySelector("#speakingPracticeStyles")) return;
    const style = document.createElement("style");
    style.id = "speakingPracticeStyles";
    style.textContent = `
      .speaking-progress {
        display: inline-flex;
        gap: 8px;
        align-items: center;
        margin: 8px 0 14px;
        padding: 9px 12px;
        border-radius: 8px;
        background: #eff6ff;
        color: #1e3a8a;
        font-weight: 900;
      }

      .speaking-question-list {
        display: grid;
        gap: 12px;
      }

      .speaking-question {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 12px;
        padding: 12px;
        border: 1px solid #dbeafe;
        border-radius: 8px;
        background: #f8fafc;
      }

      .speaking-question.is-done {
        border-color: #86efac;
        background: #f0fdf4;
      }

      .question-word-badge {
        min-width: 84px;
        min-height: 54px;
        display: grid;
        place-items: center;
        border-radius: 8px;
        background: #2563eb;
        color: #ffffff;
        font-size: 1.05rem;
        font-weight: 900;
      }

      .speaking-question-main {
        display: grid;
        gap: 5px;
      }

      .question-text {
        margin: 0;
        color: #1e293b;
        font-size: 1.05rem;
        font-weight: 900;
      }

      .question-meaning {
        margin: 0;
        color: #0f766e;
        font-weight: 800;
      }

      .question-tip {
        margin: 0;
        color: #64748b;
        font-weight: 700;
      }

      .speaking-actions {
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .speaking-actions button {
        min-height: 40px;
        padding: 8px 10px;
        border: 0;
        border-radius: 8px;
        color: #ffffff;
        background: #2563eb;
        font-weight: 900;
        cursor: pointer;
      }

      .speaking-actions button:nth-child(2) {
        background: #0f766e;
      }

      .speaking-actions button:nth-child(3) {
        background: #7c3aed;
      }

      .speech-result {
        grid-column: 2;
        margin: 4px 0 0;
        padding: 9px 10px;
        border-radius: 8px;
        font-weight: 800;
        line-height: 1.4;
      }

      .speech-result:empty {
        display: none;
      }

      .speech-result.good {
        color: #166534;
        background: #dcfce7;
      }

      .speech-result.almost,
      .speech-result.listening {
        color: #92400e;
        background: #fef3c7;
      }

      .speech-result.needs-work {
        color: #991b1b;
        background: #fee2e2;
      }

      .speech-result.neutral {
        color: #334155;
        background: #e2e8f0;
      }

      .speaking-own-question {
        margin-top: 14px;
        padding: 12px;
        border-radius: 8px;
        background: #fff7ed;
      }

      .speaking-own-question h4 {
        margin: 0 0 6px;
        color: #9a3412;
      }

      .speaking-own-question p {
        margin: 0 0 8px;
        color: #475569;
        font-weight: 700;
      }

      .speaking-own-question textarea {
        width: 100%;
        min-height: 72px;
        padding: 10px;
        border: 1px solid #fed7aa;
        border-radius: 8px;
        font: inherit;
        resize: vertical;
      }

      @media (max-width: 700px) {
        .speaking-question {
          grid-template-columns: 1fr;
        }

        .question-word-badge,
        .speaking-actions,
        .speech-result {
          grid-column: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
