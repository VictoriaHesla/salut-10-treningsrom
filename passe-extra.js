insertExtraPasseComposePractice();

function insertExtraPasseComposePractice() {
  const grid = document.querySelector("#passe-compose .activity-grid");
  if (!grid || document.querySelector("[data-check='passe-5']")) return;

  grid.insertAdjacentHTML("beforeend", `
    <article class="activity-card">
      <h3>🧠 Pugg partisippene 1</h3>
      <p>Velg riktig partisipp. Disse må elevene kjenne igjen raskt.</p>
      <div class="verb-participle-list" aria-label="Huskeliste for partisipp">
        <span><strong>naître</strong> né</span>
        <span><strong>partir</strong> parti</span>
        <span><strong>aller</strong> allé</span>
        <span><strong>descendre</strong> descendu</span>
        <span><strong>rester</strong> resté</span>
      </div>
      <div class="activity-row"><label>naître →</label><select data-answer="né"><option></option><option>né</option><option>parti</option><option>descendu</option></select></div>
      <div class="activity-row"><label>partir →</label><select data-answer="parti"><option></option><option>allé</option><option>parti</option><option>resté</option></select></div>
      <div class="activity-row"><label>aller →</label><select data-answer="allé"><option></option><option>allé</option><option>entré</option><option>sorti</option></select></div>
      <div class="activity-row"><label>descendre →</label><select data-answer="descendu"><option></option><option>descendu</option><option>monté</option><option>mort</option></select></div>
      <div class="activity-row"><label>rester →</label><select data-answer="resté"><option></option><option>tombé</option><option>resté</option><option>né</option></select></div>
      <button class="check-button" data-check="passe-5" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>🧠 Pugg partisippene 2</h3>
      <p>Noen er lette å kjenne igjen. <strong>Mourir → mort</strong> må pugges ekstra.</p>
      <div class="verb-participle-list" aria-label="Huskeliste for partisipp">
        <span><strong>tomber</strong> tombé</span>
        <span><strong>monter</strong> monté</span>
        <span><strong>entrer</strong> entré</span>
        <span><strong>sortir</strong> sorti</span>
        <span><strong>mourir</strong> mort</span>
      </div>
      <div class="activity-row"><label>tomber →</label><input data-answer="tombé|tombe" autocomplete="off"></div>
      <div class="activity-row"><label>monter →</label><input data-answer="monté|monte" autocomplete="off"></div>
      <div class="activity-row"><label>entrer →</label><input data-answer="entré|entre" autocomplete="off"></div>
      <div class="activity-row"><label>sortir →</label><input data-answer="sorti" autocomplete="off"></div>
      <div class="activity-row"><label>mourir →</label><input data-answer="mort" autocomplete="off"></div>
      <button class="check-button" data-check="passe-6" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>⚙️ Bruk alle verbene</h3>
      <p>Velg riktig hjelpeverb. Alle setningene bruker passé composé med être.</p>
      <div class="activity-row"><label>Je ___ né à Paris.</label><select data-answer="suis"><option></option><option>ai</option><option>suis</option><option>est</option></select></div>
      <div class="activity-row"><label>Tu ___ parti en Corse.</label><select data-answer="es"><option></option><option>as</option><option>es</option><option>est</option></select></div>
      <div class="activity-row"><label>Il ___ allé à Meaux.</label><select data-answer="est"><option></option><option>a</option><option>est</option><option>sont</option></select></div>
      <div class="activity-row"><label>Elle ___ descendue du train.</label><select data-answer="est"><option></option><option>a</option><option>est</option><option>sommes</option></select></div>
      <div class="activity-row"><label>Nous ___ restés à l'hôtel.</label><select data-answer="sommes"><option></option><option>avons</option><option>sommes</option><option>sont</option></select></div>
      <div class="activity-row"><label>Vous ___ tombés dans la rue.</label><select data-answer="êtes"><option></option><option>avez</option><option>êtes</option><option>ont</option></select></div>
      <div class="activity-row"><label>Ils ___ montés dans le bus.</label><select data-answer="sont"><option></option><option>ont</option><option>sont</option><option>est</option></select></div>
      <div class="activity-row"><label>Elles ___ entrées dans le musée.</label><select data-answer="sont"><option></option><option>ont</option><option>sont</option><option>êtes</option></select></div>
      <div class="activity-row"><label>Nous ___ sortis de la gare.</label><select data-answer="sommes"><option></option><option>avons</option><option>sommes</option><option>sont</option></select></div>
      <div class="activity-row"><label>Il ___ mort en 1885.</label><select data-answer="est"><option></option><option>a</option><option>est</option><option>suis</option></select></div>
      <button class="check-button" data-check="passe-7" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>

    <article class="activity-card">
      <h3>🧩 Forstå regelen: partisippet passer</h3>
      <p>Med être kan partisippet få ekstra <strong>e</strong> og/eller <strong>s</strong>.</p>
      <div class="activity-row"><label>Il est ___ à Paris.</label><select data-answer="allé"><option></option><option>allé</option><option>allée</option><option>allés</option><option>allées</option></select></div>
      <div class="activity-row"><label>Elle est ___ à Paris.</label><select data-answer="allée"><option></option><option>allé</option><option>allée</option><option>allés</option><option>allées</option></select></div>
      <div class="activity-row"><label>Ils sont ___ à Paris.</label><select data-answer="allés"><option></option><option>allé</option><option>allée</option><option>allés</option><option>allées</option></select></div>
      <div class="activity-row"><label>Elles sont ___ à Paris.</label><select data-answer="allées"><option></option><option>allé</option><option>allée</option><option>allés</option><option>allées</option></select></div>
      <div class="activity-row"><label>Hva må partisippet passe med?</label><select data-answer="personen som gjør verbet"><option></option><option>personen som gjør verbet</option><option>byen i setningen</option><option>eiendomsordet</option></select></div>
      <button class="check-button" data-check="passe-8" type="button">Sjekk svar</button>
      <p class="activity-feedback"></p>
    </article>
  `);
}
