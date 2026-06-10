const stationOrder = ["verbverksted", "eiendomsord", "passe-compose", "oppsummering"];
const stationLabels = {
  "verbverksted": { number: "1", title: "Verb", subtitle: "30 oppgaver" },
  "eiendomsord": { number: "2", title: "Eiendomsord", subtitle: "tabell og øving" },
  "passe-compose": { number: "3", title: "Passé composé", subtitle: "avoir, être og partisipp" },
  "oppsummering": { number: "4", title: "Reiseruta", subtitle: "låses opp til slutt" }
};

setupStationTabs();

function setupStationTabs() {
  const panels = stationOrder
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const links = [...document.querySelectorAll(".station-nav a")]
    .filter((link) => stationOrder.includes(link.getAttribute("href")?.replace("#", "")));

  if (!panels.length || !links.length) return;

  panels.forEach((panel) => panel.classList.add("station-panel"));
  upgradeStationLinks(links);
  addNextButtons(panels);

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showStation(link.getAttribute("href").replace("#", ""), true);
    });
  });

  window.addEventListener("hashchange", () => {
    const id = window.location.hash.replace("#", "");
    if (stationOrder.includes(id)) showStation(id, false);
  });

  const start = stationOrder.includes(window.location.hash.replace("#", ""))
    ? window.location.hash.replace("#", "")
    : stationOrder[0];
  showStation(start, false);
}

function upgradeStationLinks(links) {
  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    const label = stationLabels[id];
    const emoji = link.textContent.trim().split(" ")[0];
    link.innerHTML = `
      <span class="station-link-content">
        <span class="station-step">${label.number}</span>
        <span>
          <span class="station-link-title">${emoji} ${label.title}</span>
          <span class="station-link-subtitle">${label.subtitle}</span>
        </span>
      </span>
    `;
  });
}

function addNextButtons(panels) {
  panels.forEach((panel, index) => {
    if (panel.querySelector(".station-next-row")) return;
    const nextId = stationOrder[index + 1];
    const previousId = stationOrder[index - 1];
    const row = document.createElement("div");
    row.className = "station-next-row";

    if (previousId) {
      row.appendChild(makeStationButton(previousId, "← Forrige stasjon", "secondary"));
    }

    if (nextId) {
      const label = nextId === "oppsummering" ? "Gå til Reiseruta →" : "Neste stasjon →";
      row.appendChild(makeStationButton(nextId, label));
    }

    if (row.children.length) panel.appendChild(row);
  });
}

function makeStationButton(id, label, extraClass = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `station-next-button ${extraClass}`.trim();
  button.textContent = label;
  button.addEventListener("click", () => showStation(id, true));
  return button;
}

function showStation(id, updateHash) {
  stationOrder.forEach((stationId) => {
    const panel = document.getElementById(stationId);
    const link = document.querySelector(`.station-nav a[href="#${stationId}"]`);
    const active = stationId === id;

    if (panel) {
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    }

    if (link) {
      link.classList.toggle("active", active);
      link.setAttribute("aria-current", active ? "step" : "false");
    }
  });

  if (updateHash) {
    history.pushState(null, "", `#${id}`);
  }

  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}
