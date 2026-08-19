insertAllerPartirExplanation();

function insertAllerPartirExplanation() {
  const board = document.querySelector(".etre-figure-board");
  if (!board || document.querySelector(".aller-partir-card")) return;

  injectAllerPartirStyles();

  board.insertAdjacentHTML(
    "afterend",
    `<section class="aller-partir-card" aria-labelledby="allerPartirTitle">
      <div class="aller-partir-header">
        <span aria-hidden="true">🧭</span>
        <div>
          <p class="eyebrow">Forstå forskjellen</p>
          <h3 id="allerPartirTitle">Aller eller partir?</h3>
        </div>
      </div>

      <div class="aller-partir-grid">
        <article>
          <h4>Aller</h4>
          <p><strong>Hvor skal du?</strong></p>
          <p>Bruk <strong>aller</strong> når fokus er på stedet man går eller drar til.</p>
          <div class="example-line">Je suis allé <strong>à Paris</strong>.</div>
          <div class="example-line">Nous sommes allés <strong>au collège</strong>.</div>
        </article>
        <article>
          <h4>Partir</h4>
          <p><strong>Du drar av gårde.</strong></p>
          <p>Bruk <strong>partir</strong> når fokus er på at man reiser bort, starter reisen eller forlater et sted.</p>
          <div class="example-line">Je suis parti <strong>de la maison</strong>.</div>
          <div class="example-line">Elle est partie <strong>de Paris</strong>.</div>
        </article>
      </div>

      <div class="memory-line">
        <strong>Husk:</strong> <span>aller = til et sted</span> <span>partir = bort/fra/av gårde</span>
      </div>

      <div class="aller-partir-mini">
        <h4>Prøv selv</h4>
        <div class="mini-choice-row">
          <label>Jeg dro til Korsika. = Je suis ___ en Corse.</label>
          <select data-ap-answer="allé"><option></option><option>allé</option><option>parti</option></select>
        </div>
        <div class="mini-choice-row">
          <label>Jeg dro fra huset. = Je suis ___ de la maison.</label>
          <select data-ap-answer="parti"><option></option><option>allé</option><option>parti</option></select>
        </div>
        <div class="mini-choice-row">
          <label>Hun dro til Paris. = Elle est ___ à Paris.</label>
          <select data-ap-answer="allée"><option></option><option>allée</option><option>partie</option></select>
        </div>
        <div class="mini-choice-row">
          <label>Hun reiste av gårde. = Elle est ___.</label>
          <select data-ap-answer="partie"><option></option><option>allée</option><option>partie</option></select>
        </div>
        <button class="aller-partir-check" type="button">Sjekk svar</button>
        <p class="aller-partir-feedback" aria-live="polite"></p>
      </div>
    </section>`
  );

  const card = document.querySelector(".aller-partir-card");
  card.querySelector(".aller-partir-check")?.addEventListener("click", () => {
    const fields = card.querySelectorAll("[data-ap-answer]");
    let correct = 0;
    fields.forEach((field) => {
      const isCorrect = field.value === field.dataset.apAnswer;
      field.classList.toggle("is-correct", isCorrect);
      field.classList.toggle("is-wrong", !isCorrect);
      if (isCorrect) correct += 1;
    });

    const feedback = card.querySelector(".aller-partir-feedback");
    const allCorrect = correct === fields.length;
    feedback.textContent = allCorrect
      ? "Riktig. Aller peker ofte mot hvor du skal. Partir handler mer om å dra bort eller fra noe."
      : `${correct} av ${fields.length} riktige. Se etter à/au/en når noen drar til et sted, og de når noen drar fra et sted.`;
    feedback.className = allCorrect ? "aller-partir-feedback correct" : "aller-partir-feedback wrong";
  });
}

function injectAllerPartirStyles() {
  if (document.querySelector("#allerPartirStyles")) return;
  const styles = document.createElement("style");
  styles.id = "allerPartirStyles";
  styles.textContent = `
    .aller-partir-card { margin: 22px 0; padding: 22px; border: 1px solid #bfdbfe; border-radius: 8px; background: linear-gradient(135deg, #eff6ff, #fff7ed); box-shadow: 0 14px 30px rgba(70, 89, 126, 0.1); }
    .aller-partir-header { display: flex; gap: 12px; align-items: center; margin-bottom: 14px; }
    .aller-partir-header > span { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 8px; background: white; font-size: 2rem; box-shadow: 0 8px 18px rgba(70, 89, 126, 0.1); }
    .aller-partir-card h3 { margin: 0; color: #1e3a8a; font-size: 1.55rem; }
    .aller-partir-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .aller-partir-grid article { padding: 16px; border: 1px solid #dbeafe; border-radius: 8px; background: rgba(255, 255, 255, 0.86); }
    .aller-partir-grid h4, .aller-partir-mini h4 { margin: 0 0 8px; color: #0f766e; font-size: 1.25rem; }
    .aller-partir-grid p { margin: 0 0 8px; color: #334155; line-height: 1.45; }
    .example-line { margin-top: 8px; padding: 9px 10px; border-radius: 8px; background: #f8fafc; color: #1e293b; font-weight: 800; }
    .memory-line { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0; padding: 12px; border-radius: 8px; background: #fef3c7; color: #78350f; line-height: 1.4; }
    .memory-line span { padding: 4px 8px; border-radius: 999px; background: rgba(255, 255, 255, 0.72); font-weight: 900; }
    .aller-partir-mini { padding: 16px; border-radius: 8px; background: white; border: 1px solid #dbeafe; }
    .mini-choice-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(120px, 0.22fr); gap: 10px; align-items: center; margin-top: 10px; }
    .mini-choice-row label { color: #334155; font-weight: 800; line-height: 1.35; }
    .mini-choice-row select { min-height: 42px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; font: inherit; background: white; }
    .mini-choice-row select.is-correct { border-color: #16a34a; background: #f0fdf4; }
    .mini-choice-row select.is-wrong { border-color: #dc2626; background: #fff1f2; }
    .aller-partir-check { min-height: 44px; margin-top: 12px; padding: 10px 14px; border: 0; border-radius: 8px; color: white; background: #2563eb; font-weight: 900; cursor: pointer; }
    .aller-partir-feedback { margin: 10px 0 0; padding: 10px; border-radius: 8px; font-weight: 800; line-height: 1.4; }
    .aller-partir-feedback:empty { display: none; }
    .aller-partir-feedback.correct { color: #166534; background: #dcfce7; }
    .aller-partir-feedback.wrong { color: #991b1b; background: #fee2e2; }
    @media (max-width: 760px) { .aller-partir-grid, .mini-choice-row { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(styles);
}
