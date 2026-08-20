(() => {
  const tasks = [
    {
      no: 1,
      norsk: "Det er en gutt som snakker fransk.",
      test: "Som må være med: Det er en gutt snakker fransk blir feil.",
      fransk: "C'est un garçon ___ parle français."
    },
    {
      no: 2,
      norsk: "Det er en by som jeg liker.",
      test: "Som kan tas bort: Det er en by jeg liker fungerer fint.",
      fransk: "C'est une ville ___ j'aime."
    },
    {
      no: 3,
      norsk: "Det er en region som er vakker.",
      test: "Som må være med: Det er en region er vakker blir feil.",
      fransk: "C'est une région ___ est belle."
    },
    {
      no: 4,
      norsk: "Det er et ord som du kjenner.",
      test: "Som kan tas bort: Det er et ord du kjenner fungerer fint.",
      fransk: "C'est un mot ___ tu connais."
    }
  ];

  function render() {
    const cards = Array.from(document.querySelectorAll(".m3-card"));
    const card = cards.find((item) => item.querySelector("h3")?.textContent.includes("Oversett"));
    if (!card || card.dataset.quiLayout === "true") return;

    injectStyles();
    card.dataset.quiLayout = "true";

    const rows = Array.from(card.querySelectorAll(".m3-row"));
    rows.forEach((row, index) => {
      const task = tasks[index];
      const label = row.querySelector("label");
      if (!task || !label) return;

      row.classList.add("qui-step-row");
      label.innerHTML = `
        <span class="qui-task-number">${task.no}</span>
        <span class="qui-task-lines">
          <span class="qui-line qui-line-norsk"><strong>Norsk:</strong> ${task.norsk}</span>
          <span class="qui-line qui-line-test"><strong>Test:</strong> ${task.test}</span>
          <span class="qui-line qui-line-fransk"><strong>Fransk:</strong> ${task.fransk}</span>
        </span>
      `;
    });
  }

  function injectStyles() {
    if (document.querySelector("#quiTranslationLayoutStyles")) return;

    const style = document.createElement("style");
    style.id = "quiTranslationLayoutStyles";
    style.textContent = `
      .qui-step-row {
        grid-template-columns: minmax(0, 1fr) minmax(120px, 0.22fr);
        align-items: stretch;
        padding: 12px;
        border: 1px solid #dbeafe;
        border-radius: 8px;
        background: #f8fafc;
      }

      .qui-step-row label {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 10px;
        align-items: start;
      }

      .qui-task-number {
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        color: #ffffff;
        background: #2563eb;
        font-weight: 900;
      }

      .qui-task-lines {
        display: grid;
        gap: 8px;
      }

      .qui-task-lines .qui-line {
        display: block;
        padding: 8px 10px;
        border: 1px solid transparent;
        border-radius: 8px;
        line-height: 1.35;
      }

      .qui-line strong {
        display: inline-block;
        min-width: 58px;
      }

      .qui-line-norsk {
        color: #1e3a8a;
        border-color: #bfdbfe;
        background: #eff6ff;
      }

      .qui-line-test {
        color: #92400e;
        border-color: #fde68a;
        background: #fef3c7;
      }

      .qui-line-fransk {
        color: #991b1b;
        border-color: #fecaca;
        background: #fee2e2;
      }

      .qui-step-row select {
        align-self: center;
      }

      @media (max-width: 700px) {
        .qui-step-row {
          grid-template-columns: 1fr;
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
