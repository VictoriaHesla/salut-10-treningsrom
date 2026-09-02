(() => {
  const blogKey = "salut10-blog-module1-v1";
  const sectionTitles = {
    salut: "Salut !",
    famille: "Ma famille",
    chezmoi: "Chez moi",
    college: "Mon collège",
    loisirs: "Mes loisirs",
    plat: "Mon plat préféré",
    vacances: "Mes vacances"
  };

  function getStateFromPage() {
    const name = document.querySelector("#studentName")?.value.trim() || "";
    const posts = {};
    document.querySelectorAll("textarea[data-text]").forEach((field) => {
      posts[field.dataset.text] = field.value || "";
    });
    return { name, posts, savedAt: new Date().toISOString() };
  }

  function saveNow() {
    const state = getStateFromPage();
    localStorage.setItem(blogKey, JSON.stringify(state));
    showStatus("Lagret på denne Macen/nettleseren nå.", "good");
  }

  function getPrintableText() {
    const state = getStateFromPage();
    const nameLine = state.name ? `Le blog de ${state.name}` : "Le blog de ...";
    const dateLine = new Date().toLocaleString("nb-NO", { dateStyle: "short", timeStyle: "short" });
    const parts = [
      "Bienvenue sur mon blog !",
      nameLine,
      `Lagret: ${dateLine}`,
      ""
    ];

    Object.entries(sectionTitles).forEach(([id, title]) => {
      const text = (state.posts[id] || "").trim();
      if (!text) return;
      parts.push(title);
      parts.push("-".repeat(title.length));
      parts.push(text);
      parts.push("");
    });

    if (parts.length <= 4) {
      parts.push("Eleven har ikke skrevet tekst ennå.");
    }

    return parts.join("\n");
  }

  function downloadTextFile() {
    saveNow();
    const text = getPrintableText();
    const name = document.querySelector("#studentName")?.value.trim() || "elev";
    const safeName = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "elev";
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `mon-blog-${safeName}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    showStatus("Tekstfilen er lastet ned. Den kan sendes til lærer hvis PDF blir vanskelig.", "good");
  }

  async function copyBlogText() {
    saveNow();
    const text = getPrintableText();
    try {
      await navigator.clipboard.writeText(text);
      showStatus("Bloggteksten er kopiert. Nå kan den limes inn i et dokument eller en melding.", "good");
    } catch (error) {
      const helper = document.querySelector("#blogCopyHelper");
      if (helper) {
        helper.hidden = false;
        helper.value = text;
        helper.focus();
        helper.select();
      }
      showStatus("Marker teksten i feltet under og kopier den.", "warn");
    }
  }

  function showStatus(text, type = "neutral") {
    const status = document.querySelector("#blogSaveStatus");
    if (!status) return;
    status.textContent = text;
    status.className = `save-status ${type}`;
  }

  function installSavePanel() {
    const previewPanel = document.querySelector(".blog-preview-panel");
    const printButton = document.querySelector("#printBlog");
    if (!previewPanel || document.querySelector("#blogSavePanel")) return;

    const panel = document.createElement("section");
    panel.id = "blogSavePanel";
    panel.className = "save-panel";
    panel.innerHTML = `
      <h3>Lagre arbeidet ditt</h3>
      <p>Teksten lagres automatisk på denne maskinen mens du skriver. Last gjerne ned en tekstfil som ekstra sikkerhet.</p>
      <div class="save-actions">
        <button id="saveDraftButton" type="button">Lagre kladd</button>
        <button id="downloadDraftButton" type="button">Last ned tekstfil</button>
        <button id="copyBlogButton" type="button">Kopier bloggtekst</button>
      </div>
      <p id="blogSaveStatus" class="save-status neutral" aria-live="polite">Automatisk lagring er klar.</p>
      <textarea id="blogCopyHelper" class="copy-helper" rows="6" hidden readonly></textarea>
    `;

    previewPanel.insertBefore(panel, printButton || null);

    document.querySelector("#saveDraftButton")?.addEventListener("click", saveNow);
    document.querySelector("#downloadDraftButton")?.addEventListener("click", downloadTextFile);
    document.querySelector("#copyBlogButton")?.addEventListener("click", copyBlogText);

    let timer = null;
    document.querySelectorAll("#studentName, textarea[data-text]").forEach((field) => {
      field.addEventListener("input", () => {
        showStatus("Lagrer automatisk ...", "neutral");
        window.clearTimeout(timer);
        timer = window.setTimeout(() => showStatus("Lagret automatisk på denne maskinen.", "good"), 450);
      });
    });
  }

  function injectStyles() {
    if (document.querySelector("#blogSaveStyles")) return;
    const style = document.createElement("style");
    style.id = "blogSaveStyles";
    style.textContent = `
      .save-panel {
        padding: 16px;
        border: 1px solid var(--blog-line);
        border-radius: 8px;
        background: #fff9fb;
        box-shadow: 0 10px 28px rgba(159, 23, 77, 0.08);
      }

      .save-panel h3 {
        margin: 0 0 6px;
        color: var(--blog-berry);
        font-size: 1rem;
      }

      .save-panel p {
        margin: 0;
        color: var(--blog-muted);
        line-height: 1.45;
        font-weight: 700;
      }

      .save-actions {
        display: grid;
        gap: 8px;
        margin: 12px 0;
      }

      .save-actions button {
        min-height: 42px;
        padding: 10px 12px;
        border: 0;
        border-radius: 8px;
        color: #ffffff;
        background: var(--blog-rose);
        font: inherit;
        font-weight: 900;
        cursor: pointer;
      }

      .save-actions button:nth-child(2) {
        background: #0f766e;
      }

      .save-actions button:nth-child(3) {
        background: #2563eb;
      }

      .save-status {
        padding: 9px 10px;
        border-radius: 8px;
        font-size: 0.92rem;
      }

      .save-status.good {
        color: #166534;
        background: #dcfce7;
      }

      .save-status.warn {
        color: #92400e;
        background: #fef3c7;
      }

      .save-status.neutral {
        color: #334155;
        background: #e2e8f0;
      }

      .copy-helper {
        width: 100%;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid var(--blog-line);
        border-radius: 8px;
        font: inherit;
        resize: vertical;
      }

      @media print {
        .save-panel { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    injectStyles();
    installSavePanel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
