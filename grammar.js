insertEtreVerbFigures();

document.querySelectorAll(".check-button[data-check]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".activity-card");
    const fields = card.querySelectorAll("[data-answer]");
    let correct = 0;

    fields.forEach((field) => {
      const expected = field.dataset.answer
        .split("|")
        .map((item) => normalizeAnswer(item));
      const given = normalizeAnswer(field.value);
      const isCorrect = expected.includes(given);
      field.classList.toggle("is-correct", isCorrect);
      field.classList.toggle("is-wrong", !isCorrect);
      if (isCorrect) {
        correct += 1;
      }
    });

    const feedback = card.querySelector(".activity-feedback");
    const allCorrect = correct === fields.length;
    feedback.textContent = allCorrect
      ? "✅ Alt riktig. Très bien!"
      : `🔁 ${correct} av ${fields.length} riktige. Se på ordene rundt, og prøv igjen.`;
    feedback.className = allCorrect ? "activity-feedback correct" : "activity-feedback wrong";
  });
});

function insertEtreVerbFigures() {
  const station = document.querySelector("#passe-compose");
  const ruleCard = station?.querySelector(".rule-card");
  if (!station || !ruleCard || document.querySelector(".etre-figure-board")) {
    return;
  }

  const styles = document.createElement("style");
  styles.textContent = `
    .etre-figure-board {
      margin: 18px 0;
      padding: 16px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid var(--line);
    }
    .etre-figure-board h3 {
      margin: 0 0 8px;
    }
    .etre-figure-board > p {
      margin-bottom: 14px;
      color: var(--muted);
      line-height: 1.5;
    }
    .etre-figure-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }
    .etre-card {
      min-height: 190px;
      display: grid;
      grid-template-rows: 112px auto auto;
      gap: 7px;
      padding: 12px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: white;
    }
    .etre-card svg {
      width: 100%;
      height: 112px;
    }
    .etre-card strong {
      font-size: 1.05rem;
    }
    .etre-card span {
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.3;
    }
    .svg-line {
      fill: none;
      stroke: #253047;
      stroke-width: 5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .svg-soft {
      fill: #e8f2ff;
      stroke: #93c5fd;
      stroke-width: 3;
    }
    .svg-accent {
      fill: #fef3c7;
      stroke: #f59e0b;
      stroke-width: 3;
    }
    .svg-green {
      fill: #dcfce7;
      stroke: #22c55e;
      stroke-width: 3;
    }
    @media (max-width: 980px) {
      .etre-figure-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 560px) {
      .etre-figure-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(styles);

  const verbs = [
    { verb: "Naître", meaning: "å bli født", svg: babySvg() },
    { verb: "Partir", meaning: "å dra", svg: suitcaseSvg("out") },
    { verb: "Aller", meaning: "å gå / dra", svg: walkingSvg() },
    { verb: "Descendre", meaning: "å gå ned", svg: stairsSvg("down") },
    { verb: "Rester", meaning: "å bli / være igjen", svg: restingSvg() },
    { verb: "Tomber", meaning: "å falle", svg: fallingSvg() },
    { verb: "Monter", meaning: "å gå opp", svg: stairsSvg("up") },
    { verb: "Entrer", meaning: "å gå inn", svg: doorSvg("in") },
    { verb: "Sortir", meaning: "å gå ut", svg: doorSvg("out") },
    { verb: "Mourir", meaning: "å dø", svg: quietSvg() }
  ];

  const board = document.createElement("section");
  board.className = "etre-figure-board";
  board.innerHTML = `
    <h3>🎬 Être-verb i bilder</h3>
    <p>Mange av disse verbene handler om bevegelse, retning eller overgang fra én tilstand til en annen.</p>
    <div class="etre-figure-grid">
      ${verbs.map((item) => `
        <article class="etre-card">
          ${item.svg}
          <strong>${item.verb}</strong>
          <span>${item.meaning}</span>
        </article>
      `).join("")}
    </div>
  `;

  ruleCard.insertAdjacentElement("afterend", board);
}

function babySvg() {
  return `<svg viewBox="0 0 160 120" aria-hidden="true"><rect class="svg-soft" x="32" y="52" width="96" height="48" rx="24"/><circle class="svg-accent" cx="80" cy="45" r="20"/><path class="svg-line" d="M70 45h1M90 45h1M74 56q6 5 12 0"/><path class="svg-line" d="M47 75q33 22 66 0"/><path class="svg-line" d="M118 22l9-9M128 35h14M111 13V2"/></svg>`;
}

function suitcaseSvg() {
  return `<svg viewBox="0 0 160 120" aria-hidden="true"><path class="svg-line" d="M60 92h52M82 34h25v12M72 46h48v46H72z"/><circle class="svg-accent" cx="48" cy="34" r="12"/><path class="svg-line" d="M48 46v25M48 71l-16 18M48 71l14 19M45 55l-16 9M50 55l16-8M122 68h24M136 58l10 10-10 10"/></svg>`;
}

function walkingSvg() {
  return `<svg viewBox="0 0 160 120" aria-hidden="true"><circle class="svg-accent" cx="60" cy="30" r="14"/><path class="svg-line" d="M60 44l-8 28M52 72l-24 22M52 72l28 20M55 54l-24 8M57 55l26 1M96 60h38M124 47l14 13-14 13"/><path class="svg-green" d="M25 103h94"/></svg>`;
}

function stairsSvg(direction) {
  const arrow = direction === "up" ? "M104 83l24-24M128 59v22M128 59h-22" : "M104 37l24 24M128 61V39M128 61h-22";
  const personY = direction === "up" ? 36 : 26;
  return `<svg viewBox="0 0 160 120" aria-hidden="true"><path class="svg-line" d="M22 96h25V76h25V56h25V36h25"/><circle class="svg-accent" cx="58" cy="${personY}" r="12"/><path class="svg-line" d="M58 ${personY + 12}l-8 28M50 ${personY + 40}l-17 17M50 ${personY + 40}l24 12M54 ${personY + 23}l21-4"/><path class="svg-line" d="${arrow}"/></svg>`;
}

function restingSvg() {
  return `<svg viewBox="0 0 160 120" aria-hidden="true"><rect class="svg-soft" x="36" y="76" width="88" height="18" rx="8"/><circle class="svg-accent" cx="80" cy="35" r="15"/><path class="svg-line" d="M73 34h1M87 34h1M72 45q8 4 16 0M80 50v28M80 78l-24 0M80 78l24 0M51 26h14M56 18l9 8-9 8"/></svg>`;
}

function fallingSvg() {
  return `<svg viewBox="0 0 160 120" aria-hidden="true"><circle class="svg-accent" cx="72" cy="34" r="13"/><path class="svg-line" d="M82 46l29 25M111 71l-9 27M111 71l30 4M96 58l-26 20M37 26l16 10M26 50h20M36 78l17-8"/><path class="svg-green" d="M25 103h110"/></svg>`;
}

function doorSvg(direction) {
  const arrow = direction === "in" ? "M34 72h38M58 58l14 14-14 14" : "M86 72h38M110 58l14 14-14 14";
  const personX = direction === "in" ? 38 : 104;
  return `<svg viewBox="0 0 160 120" aria-hidden="true"><rect class="svg-soft" x="72" y="20" width="46" height="82" rx="4"/><path class="svg-line" d="M72 102h46M105 61h2"/><circle class="svg-accent" cx="${personX}" cy="40" r="12"/><path class="svg-line" d="M${personX} 52v28M${personX} 80l-18 18M${personX} 80l20 16M${personX - 3} 62l-18 8M${personX + 2} 62l18-6M${arrow}"/></svg>`;
}

function quietSvg() {
  return `<svg viewBox="0 0 160 120" aria-hidden="true"><path class="svg-green" d="M30 96h100"/><circle class="svg-accent" cx="54" cy="76" r="12"/><path class="svg-line" d="M66 80h46M88 80l18-16M88 80l18 13M124 80l10-18M134 62l8 14M134 62l-15 6"/><path class="svg-line" d="M44 34q14-18 28 0q14-18 28 0"/></svg>`;
}

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}
