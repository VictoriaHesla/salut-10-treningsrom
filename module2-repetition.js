const ordinalList = [
  ["1.", "premier / première"],
  ["2.", "deuxième"],
  ["3.", "troisième"],
  ["4.", "quatrième"],
  ["5.", "cinquième"],
  ["6.", "sixième"],
  ["7.", "septième"],
  ["8.", "huitième"],
  ["9.", "neuvième"],
  ["10.", "dixième"],
  ["11.", "onzième"],
  ["12.", "douzième"],
  ["13.", "treizième"],
  ["14.", "quatorzième"],
  ["15.", "quinzième"],
  ["16.", "seizième"],
  ["17.", "dix-septième"],
  ["18.", "dix-huitième"],
  ["19.", "dix-neuvième"],
  ["20.", "vingtième"]
];

insertModule2Repetition();

function insertModule2Repetition() {
  const workspace = document.querySelector("#verbverksted");
  if (!workspace || document.querySelector(".module2-repetition")) return;

  injectRepetitionStyles();
  workspace.insertAdjacentHTML("beforeend", renderRepetitionPanel());
  setupRepetitionChecks();
  updateStationOneLabel();
}

function renderRepetitionPanel() {
  return `
    <section class="module2-repetition" aria-labelledby="repetitionTitle">
      <div class="repetition-header">
        <div class="repetition-icon" aria-hidden="true">🔁</div>
        <div>
          <p class="eyebrow">Stasjon 1 · Repetisjon</p>
          <h2 id="repetitionTitle">Tall, årstall og små uttrykk</h2>
          <p>Her repeterer du årstall, ordenstall fra 1 til 20 og forskjellen på <strong>c'est</strong> og <strong>il y a</strong>.</p>
        </div>
      </div>

      <div class="repetition-rule-grid">
        <article>
          <h3>C'est</h3>
          <p>Ligner på engelsk <strong>it is</strong>. Bruk <strong>c'est</strong> når du sier hva noe er, eller beskriver noe.</p>
          <div class="mini-example">C'est une belle région. = It is a beautiful region.</div>
          <div class="mini-example">C'est en France. = It is in France.</div>
        </article>
        <article>
          <h3>Il y a</h3>
          <p>Ligner på engelsk <strong>there is / there are</strong>. Bruk <strong>il y a</strong> når du sier at noe finnes eller er et sted.</p>
          <div class="mini-example">Il y a une plage. = There is a beach.</div>
          <div class="mini-example">Il y a beaucoup de touristes. = There are many tourists.</div>
        </article>
        <article>
          <h3>Årstall</h3>
          <p>På fransk sier vi ofte årstall som vanlige tall.</p>
          <div class="mini-example">1998 = mille neuf cent quatre-vingt-dix-huit</div>
          <div class="mini-example">2024 = deux mille vingt-quatre</div>
        </article>
      </div>

      <details class="ordinal-details">
        <summary>Se ordenstall 1-20</summary>
        <div class="ordinal-grid">
          ${ordinalList.map(([number, word]) => `<span><strong>${number}</strong>${word}</span>`).join("")}
        </div>
      </details>

      <div class="repetition-activity-grid">
        <article class="repetition-card" data-repetition-card>
          <h3>🎯 C'est eller il y a?</h3>
          <div class="rep-row"><label>___ une ville intéressante.</label><select data-rep-answer="c'est"><option></option><option>c'est</option><option>il y a</option></select></div>
          <div class="rep-row"><label>À Paris, ___ la tour Eiffel.</label><select data-rep-answer="il y a"><option></option><option>c'est</option><option>il y a</option></select></div>
          <div class="rep-row"><label>La Guyane, ___ en Amérique du Sud.</label><select data-rep-answer="c'est"><option></option><option>c'est</option><option>il y a</option></select></div>
          <div class="rep-row"><label>En Corse, ___ des montagnes.</label><select data-rep-answer="il y a"><option></option><option>c'est</option><option>il y a</option></select></div>
          <button class="rep-check" type="button">Sjekk svar</button>
          <p class="rep-feedback" aria-live="polite"></p>
        </article>

        <article class="repetition-card" data-repetition-card>
          <h3>📅 Årstall</h3>
          <p class="rep-help">Velg riktig fransk årstall.</p>
          <div class="rep-row"><label>1789</label><select data-rep-answer="mille sept cent quatre-vingt-neuf"><option></option><option>mille sept cent quatre-vingt-neuf</option><option>mille neuf cent quatre-vingt-neuf</option><option>deux mille dix-neuf</option></select></div>
          <div class="rep-row"><label>1998</label><select data-rep-answer="mille neuf cent quatre-vingt-dix-huit"><option></option><option>mille neuf cent quatre-vingt-dix-huit</option><option>mille neuf cent quatre-vingt-huit</option><option>deux mille huit</option></select></div>
          <div class="rep-row"><label>2010</label><select data-rep-answer="deux mille dix"><option></option><option>deux mille dix</option><option>deux mille vingt</option><option>mille deux cent dix</option></select></div>
          <div class="rep-row"><label>2024</label><select data-rep-answer="deux mille vingt-quatre"><option></option><option>deux mille vingt-quatre</option><option>deux mille quatorze</option><option>vingt vingt-quatre</option></select></div>
          <button class="rep-check" type="button">Sjekk svar</button>
          <p class="rep-feedback" aria-live="polite"></p>
        </article>

        <article class="repetition-card" data-repetition-card>
          <h3>🏁 Ordenstall 1-20</h3>
          <p class="rep-help">Ordenstall forteller rekkefølge: første, andre, tredje ...</p>
          <div class="rep-row"><label>1. =</label><select data-rep-answer="premier"><option></option><option>premier</option><option>un</option><option>deuxième</option></select></div>
          <div class="rep-row"><label>2. =</label><select data-rep-answer="deuxième"><option></option><option>deux</option><option>deuxième</option><option>douzième</option></select></div>
          <div class="rep-row"><label>5. =</label><select data-rep-answer="cinquième"><option></option><option>cinqième</option><option>cinquième</option><option>cinq</option></select></div>
          <div class="rep-row"><label>9. =</label><select data-rep-answer="neuvième"><option></option><option>neufième</option><option>neuvième</option><option>neuf</option></select></div>
          <div class="rep-row"><label>20. =</label><select data-rep-answer="vingtième"><option></option><option>vingt</option><option>vingtième</option><option>vingt-et-unième</option></select></div>
          <button class="rep-check" type="button">Sjekk svar</button>
          <p class="rep-feedback" aria-live="polite"></p>
        </article>

        <article class="repetition-card" data-repetition-card>
          <h3>✍️ Bland selv</h3>
          <p class="rep-help">Skriv korte svar. Du kan bruke aksenter, men siden godtar også svar uten aksent.</p>
          <div class="rep-row"><label>Det er en vakker øy. = ___ une belle île.</label><input data-rep-answer="c'est|cest" autocomplete="off"></div>
          <div class="rep-row"><label>Det finnes en havn. = ___ un port.</label><input data-rep-answer="il y a|ilya" autocomplete="off"></div>
          <div class="rep-row"><label>3. på fransk =</label><input data-rep-answer="troisième|troisieme" autocomplete="off"></div>
          <div class="rep-row"><label>12. på fransk =</label><input data-rep-answer="douzième|douzieme" autocomplete="off"></div>
          <button class="rep-check" type="button">Sjekk svar</button>
          <p class="rep-feedback" aria-live="polite"></p>
        </article>
      </div>
    </section>`;
}

function setupRepetitionChecks() {
  document.querySelectorAll(".repetition-card[data-repetition-card]").forEach((card) => {
    const button = card.querySelector(".rep-check");
    button?.addEventListener("click", () => checkRepetitionCard(card));
    card.querySelectorAll("[data-rep-answer]").forEach((field) => {
      field.addEventListener("input", () => clearRepetitionField(field));
      field.addEventListener("change", () => clearRepetitionField(field));
    });
  });
}

function checkRepetitionCard(card) {
  const fields = card.querySelectorAll("[data-rep-answer]");
  let correct = 0;

  fields.forEach((field) => {
    const expected = field.dataset.repAnswer.split("|").map(normalizeRepAnswer);
    const given = normalizeRepAnswer(field.value);
    const isCorrect = expected.includes(given);
    field.classList.toggle("is-correct", isCorrect);
    field.classList.toggle("is-wrong", !isCorrect);
    if (isCorrect) correct += 1;
  });

  const feedback = card.querySelector(".rep-feedback");
  const allCorrect = correct === fields.length;
  feedback.textContent = allCorrect
    ? "Riktig. Très bien!"
    : `${correct} av ${fields.length} riktige. Prøv igjen og bruk regelen over.`;
  feedback.className = allCorrect ? "rep-feedback correct" : "rep-feedback wrong";
}

function clearRepetitionField(field) {
  field.classList.remove("is-correct", "is-wrong");
  const feedback = field.closest(".repetition-card")?.querySelector(".rep-feedback");
  if (feedback?.classList.contains("wrong")) {
    feedback.textContent = "";
    feedback.className = "rep-feedback";
  }
}

function normalizeRepAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}

function updateStationOneLabel() {
  const stationLink = document.querySelector('.station-nav a[href="#verbverksted"]');
  const title = stationLink?.querySelector(".station-link-title");
  const subtitle = stationLink?.querySelector(".station-link-subtitle");

  if (title) title.textContent = "🛠️ Verb + repetisjon";
  if (subtitle) subtitle.textContent = "verb, tall og uttrykk";
  if (stationLink && !title && !subtitle) stationLink.textContent = "🛠️ Verb + repetisjon";
}

function injectRepetitionStyles() {
  if (document.querySelector("#module2RepetitionStyles")) return;
  const styles = document.createElement("style");
  styles.id = "module2RepetitionStyles";
  styles.textContent = `
    .module2-repetition { grid-column: 1 / -1; margin-top: 4px; padding: 22px; border: 1px solid #bfdbfe; border-radius: 8px; background: #ffffff; box-shadow: var(--shadow); }
    .repetition-header { display: flex; gap: 14px; align-items: center; margin-bottom: 16px; }
    .repetition-icon { width: 58px; height: 58px; display: grid; place-items: center; border-radius: 8px; background: #eff6ff; font-size: 2rem; }
    .repetition-header h2 { margin-bottom: 6px; color: #1e3a8a; }
    .repetition-header p:last-child { margin: 0; color: var(--muted); line-height: 1.45; }
    .repetition-rule-grid, .repetition-activity-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .repetition-rule-grid article, .repetition-card, .ordinal-details { padding: 16px; border: 1px solid #dbeafe; border-radius: 8px; background: #f8fafc; }
    .repetition-rule-grid h3, .repetition-card h3 { margin: 0 0 8px; color: #0f766e; }
    .repetition-rule-grid p, .rep-help { color: #475569; line-height: 1.45; }
    .mini-example { margin-top: 8px; padding: 9px 10px; border-radius: 8px; background: white; color: #1e293b; font-weight: 800; }
    .ordinal-details { margin: 14px 0; background: #fff7ed; border-color: #fed7aa; }
    .ordinal-details summary { cursor: pointer; color: #9a3412; font-weight: 900; }
    .ordinal-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
    .ordinal-grid span { display: grid; gap: 3px; padding: 8px; border-radius: 8px; background: white; color: #334155; }
    .ordinal-grid strong { color: #1e3a8a; }
    .rep-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(150px, 0.35fr); gap: 10px; align-items: center; margin-top: 10px; }
    .rep-row label { color: #334155; font-weight: 800; line-height: 1.35; }
    .rep-row select, .rep-row input { min-height: 42px; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; font: inherit; }
    .rep-row .is-correct { border-color: #16a34a; background: #f0fdf4; }
    .rep-row .is-wrong { border-color: #dc2626; background: #fff1f2; }
    .rep-check { min-height: 44px; margin-top: 12px; padding: 10px 14px; border: 0; border-radius: 8px; color: white; background: #2563eb; font-weight: 900; cursor: pointer; }
    .rep-feedback { margin: 10px 0 0; padding: 10px; border-radius: 8px; font-weight: 800; line-height: 1.4; }
    .rep-feedback:empty { display: none; }
    .rep-feedback.correct { color: #166534; background: #dcfce7; }
    .rep-feedback.wrong { color: #991b1b; background: #fee2e2; }
    @media (max-width: 860px) { .repetition-rule-grid, .repetition-activity-grid, .rep-row { grid-template-columns: 1fr; } .ordinal-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 520px) { .module2-repetition { padding: 16px; } .repetition-header { align-items: flex-start; } .ordinal-grid { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(styles);
}
