const blogKey = "salut10-blog-module1-v1";
const sections = [
  { id: "salut", title: "Salut !", checks: [
    { ok: (t) => words(t) >= 12, good: "Du har skrevet en liten presentasjon.", try: "Skriv minst 2-3 setninger om deg selv." },
    { ok: (t) => has(t, ["je m'appelle", "j m appelle", "je suis", "j'ai", "jai"]), good: "Du bruker en god presentasjonsform.", try: "Prøv å bruke je m'appelle, je suis eller j'ai." },
    { ok: (t) => has(t, ["?", "qui", "comment", "quel", "quelle", "tu"]), good: "Du har med et spørsmål eller en spørreform.", try: "Legg gjerne inn et spørsmål, for eksempel Et toi ? eller Tu aimes ... ?" }
  ]},
  { id: "famille", title: "Ma famille", checks: [
    { ok: (t) => words(t) >= 14, good: "Du skriver litt om familien din.", try: "Skriv litt mer om hvem som er i familien din." },
    { ok: (t) => has(t, ["mon", "ma", "mes", "notre", "nos", "son", "sa", "ses"]), good: "Du bruker eiendomsord.", try: "Prøv å bruke et eiendomsord: mon, ma, mes, notre eller nos." },
    { ok: (t) => has(t, ["frere", "frère", "soeur", "sœur", "mere", "mère", "pere", "père", "parents", "famille"]), good: "Du har med familieord.", try: "Legg inn et familieord, for eksempel ma famille, mon frère eller mes parents." }
  ]},
  { id: "chezmoi", title: "Chez moi", checks: [
    { ok: (t) => words(t) >= 14, good: "Du forteller om hjemstedet ditt.", try: "Skriv litt mer om stedet der du bor." },
    { ok: (t) => has(t, ["j'habite", "j habite", "ville", "village", "chez moi", "il y a", "c'est", "cest"]), good: "Du bruker ord som passer til sted og hjemsted.", try: "Prøv å bruke j'habite, c'est eller il y a." },
    { ok: (t) => has(t, ["grand", "petit", "belle", "beau", "calme", "joli", "jolie", "super"]), good: "Du har med et adjektiv.", try: "Legg til et adjektiv, for eksempel petit, grand, calme eller joli." }
  ]},
  { id: "college", title: "Mon collège", checks: [
    { ok: (t) => words(t) >= 14, good: "Du skriver om skolen din.", try: "Skriv litt mer om skolen, klassen eller fagene dine." },
    { ok: (t) => has(t, ["college", "collège", "ecole", "école", "classe", "matiere", "matière", "prof", "francais", "français"]), good: "Du bruker skoleord.", try: "Prøv å bruke collège, classe, matière eller école." },
    { ok: (t) => has(t, ["j'aime", "j aime", "je deteste", "je déteste", "mon", "ma", "mes"]), good: "Du uttrykker mening eller bruker eiendomsord.", try: "Legg til en mening: j'aime ... eller je n'aime pas ..." }
  ]},
  { id: "loisirs", title: "Mes loisirs", checks: [
    { ok: (t) => words(t) >= 14, good: "Du skriver om fritiden din.", try: "Skriv litt mer om hva du gjør på fritiden." },
    { ok: (t) => has(t, ["j'aime", "j aime", "je joue", "je fais", "je lis", "j'ecoute", "j'écoute"]), good: "Du bruker presens om fritidsaktiviteter.", try: "Prøv å bruke j'aime, je joue eller je fais." },
    { ok: (t) => has(t, ["foot", "musique", "sport", "danse", "gaming", "jeux", "livre", "amis", "dessin"]), good: "Du har med konkrete aktiviteter.", try: "Legg til en aktivitet, for eksempel sport, musique, jeux eller amis." }
  ]},
  { id: "plat", title: "Mon plat préféré", checks: [
    { ok: (t) => words(t) >= 12, good: "Du skriver om mat du liker.", try: "Skriv litt mer om favorittmaten din." },
    { ok: (t) => has(t, ["mon plat prefere", "mon plat préféré", "j'adore", "j adore", "j'aime", "j aime", "je n'aime pas", "je n aime pas"]), good: "Du uttrykker smak eller favoritt.", try: "Prøv å bruke mon plat préféré, j'aime eller j'adore." },
    { ok: (t) => has(t, ["delicieux", "délicieux", "bon", "bonne", "sucre", "sucré", "sale", "salé", "chaud", "froid"]), good: "Du har med et adjektiv om mat.", try: "Legg til et adjektiv, for eksempel bon, délicieux, sucré eller salé." }
  ]},
  { id: "vacances", title: "Mes vacances", checks: [
    { ok: (t) => words(t) >= 14, good: "Du skriver om ferien din.", try: "Skriv litt mer om hva du gjorde i ferien." },
    { ok: (t) => has(t, ["j'ai", "jai", "nous avons", "on a"]), good: "Du bruker passé composé med avoir.", try: "Prøv å bruke j'ai, nous avons eller on a." },
    { ok: (t) => has(t, ["visite", "visité", "mange", "mangé", "joue", "joué", "regarde", "regardé", "achete", "acheté"]), good: "Du har med et partisipp som passer til avoir.", try: "Legg til et partisipp, for eksempel visité, mangé, joué eller regardé." }
  ]}
];

const studentName = document.querySelector("#studentName");
const byline = document.querySelector("#blogByline");
const previewName = document.querySelector("#previewName");
const previewPosts = document.querySelector("#previewPosts");
const printButton = document.querySelector("#printBlog");
const textareas = document.querySelectorAll("textarea[data-text]");

const state = loadBlogState();
studentName.value = state.name || "";
textareas.forEach((field) => {
  field.value = state.posts?.[field.dataset.text] || "";
});

updateName();
renderPreview();

studentName.addEventListener("input", () => {
  state.name = studentName.value;
  saveBlogState();
  updateName();
  renderPreview();
});

textareas.forEach((field) => {
  field.addEventListener("input", () => {
    state.posts = state.posts || {};
    state.posts[field.dataset.text] = field.value;
    saveBlogState();
    renderPreview();
  });
});

document.querySelectorAll(".feedback-button[data-feedback]").forEach((button) => {
  button.addEventListener("click", () => showFeedback(button.dataset.feedback));
});

printButton.addEventListener("click", () => window.print());

function showFeedback(sectionId) {
  const section = sections.find((item) => item.id === sectionId);
  const text = document.querySelector(`[data-text="${sectionId}"]`).value;
  const output = document.querySelector(`[data-output="${sectionId}"]`);

  output.innerHTML = section.checks.map((check) => {
    const passed = check.ok(normalize(text));
    return `<div class="feedback-item ${passed ? "good" : "try"}">${passed ? check.good : check.try}</div>`;
  }).join("");
}

function updateName() {
  const name = studentName.value.trim();
  const label = name ? `Le blog de ${name}` : "Le blog de ...";
  byline.textContent = label;
  previewName.textContent = label;
}

function renderPreview() {
  previewPosts.innerHTML = sections.map((section) => {
    const text = state.posts?.[section.id]?.trim();
    if (!text) return "";
    return `<article class="preview-post"><h3>${section.title}</h3><p>${escapeHtml(text)}</p></article>`;
  }).join("");

  if (!previewPosts.innerHTML.trim()) {
    previewPosts.innerHTML = `<article class="preview-post"><h3>Ton premier article</h3><p>Tekstene dine vises her mens du skriver.</p></article>`;
  }
}

function loadBlogState() {
  try {
    const stored = JSON.parse(localStorage.getItem(blogKey));
    return stored && typeof stored === "object" ? stored : { name: "", posts: {} };
  } catch (error) {
    return { name: "", posts: {} };
  }
}

function saveBlogState() {
  localStorage.setItem(blogKey, JSON.stringify(state));
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function has(text, patterns) {
  return patterns.some((pattern) => text.includes(normalize(pattern)));
}

function words(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
