(() => {
  const places = [
    {
      id: "france",
      name: "France",
      region: "Europa",
      speakers: "ca. 66,4 millioner",
      percent: "97 %",
      note: "Frankrike er ofte det første vi tenker på, men fransk finnes på mange kontinenter."
    },
    {
      id: "quebec",
      name: "Québec",
      region: "Nord-Amerika",
      speakers: "ca. 8,0 millioner",
      percent: "93 %",
      note: "I Québec er fransk et viktig hverdagsspråk, selv om området ligger i Canada."
    },
    {
      id: "belgique",
      name: "Belgique",
      region: "Europa",
      speakers: "ca. 8,8 millioner",
      percent: "76 %",
      note: "Belgia har flere offisielle språk. Fransk brukes særlig i Vallonia og Brussel."
    },
    {
      id: "suisse",
      name: "Suisse",
      region: "Europa",
      speakers: "ca. 5,9 millioner",
      percent: "67 %",
      note: "Sveits har fire nasjonalspråk. Fransk er ett av dem."
    },
    {
      id: "rdc",
      name: "Congo (RD)",
      region: "Afrika",
      speakers: "ca. 48,9 millioner",
      percent: "51 %",
      note: "Dette er et av stedene med flest fransktalende i verden. Mange elever blir overrasket over dette."
    },
    {
      id: "cameroun",
      name: "Cameroun",
      region: "Afrika",
      speakers: "ca. 11,5 millioner",
      percent: "41 %",
      note: "Kamerun har både fransk og engelsk som offisielle språk."
    },
    {
      id: "coteivoire",
      name: "Côte d'Ivoire",
      region: "Afrika",
      speakers: "ca. 9,3 millioner",
      percent: "34 %",
      note: "Her er fransk et viktig felles språk i et land med mange lokale språk."
    },
    {
      id: "senegal",
      name: "Sénégal",
      region: "Afrika",
      speakers: "ca. 4,6 millioner",
      percent: "26 %",
      note: "I Senegal brukes fransk mye i skole, administrasjon og skrift, sammen med lokale språk."
    },
    {
      id: "madagascar",
      name: "Madagascar",
      region: "Afrika / Indiahavet",
      speakers: "ca. 7,7 millioner",
      percent: "28 %",
      note: "Madagaskar ligger i Indiahavet. Fransk brukes sammen med gassisk."
    },
    {
      id: "haiti",
      name: "Haïti",
      region: "Karibia",
      speakers: "ca. 4,3 millioner",
      percent: "39 %",
      note: "På Haiti brukes både fransk og haitisk kreol."
    }
  ];

  const worldButtons = [
    { id: "quebec", label: "Québec", style: "left:20%;top:25%" },
    { id: "haiti", label: "Haïti", style: "left:27%;top:54%" },
    { id: "france", label: "France", style: "left:48%;top:30%" },
    { id: "belgique", label: "Belgique", style: "left:56%;top:24%" },
    { id: "suisse", label: "Suisse", style: "left:57%;top:38%" },
    { id: "madagascar", label: "Madagascar", style: "left:62%;top:78%" }
  ];

  const africaButtons = ["rdc", "cameroun", "coteivoire", "senegal", "madagascar"];

  function byId(id) {
    return places.find((place) => place.id === id);
  }

  function render() {
    const map = document.querySelector(".franco-map");
    if (!map) return;
    injectStyles();

    map.classList.add("cartoon-franco-map");
    map.innerHTML = `
      <div class="cartoon-map-head">
        <div>
          <p class="eyebrow">Interaktivt kart</p>
          <h3>Où parle-t-on français?</h3>
          <p>Trykk på store kartknapper. Afrika er forstørret, fordi flere land ligger tett sammen på verdenskartet.</p>
        </div>
        <span>cirka-tall, OIF 2022</span>
      </div>

      <div class="cartoon-map-layout">
        <div class="cartoon-world" aria-label="Tegneseriekart over verden">
          <svg viewBox="0 0 900 480" role="img" aria-label="Tegneserieaktig verdenskart">
            <rect class="ocean" x="0" y="0" width="900" height="480" rx="26" />
            <path class="land americas" d="M96 72c58-42 154-34 196 23 26 35 1 71 34 108 31 35 76 46 74 88-2 39-47 52-63 90-15 37 14 61-8 79-34 28-118-39-133-105-11-48-52-51-92-81-50-39-37-88-10-118 18-21-18-52 2-84Z" />
            <path class="land europe-asia" d="M407 76c63-44 148-37 198 1 47 35 100 20 151 50 45 27 72 70 49 100-21 27-73 13-105 44-30 29-7 72-41 99-36 28-86-8-126 10-32 14-28 47-61 49-48 3-96-68-75-117 16-38 57-49 48-84-11-43-75-44-78-87-2-25 15-48 40-65Z" />
            <path class="land africa" d="M488 221c42-25 112-10 146 33 31 39 12 88 33 125 20 36 62 49 51 72-16 32-107 9-159-36-42-37-61-93-67-136-4-31-25-45-4-58Z" />
            <path class="land oceania" d="M694 362c47-24 117-3 143 37 20 31 1 62-39 69-52 9-125-35-124-75 0-12 7-23 20-31Z" />
            <path class="map-route" d="M187 132 C315 94, 432 120, 510 177 S632 294, 559 333" />
          </svg>
          <button class="map-zone africa-main" type="button" data-place="rdc">Afrika<br><small>trykk i zoomfeltet</small></button>
          ${worldButtons.map((item, index) => `
            <button class="map-chip" type="button" data-place="${item.id}" style="${item.style}">
              <span>${index + 1}</span>${item.label}
            </button>
          `).join("")}
        </div>

        <aside class="africa-zoom" aria-label="Forstørret Afrika-kart">
          <div>
            <p class="eyebrow">Zoom</p>
            <h3>Afrika</h3>
            <p>Her ligger knappene større, slik at de er lette å treffe.</p>
          </div>
          <div class="africa-button-grid">
            ${africaButtons.map((id, index) => {
              const place = byId(id);
              return `<button type="button" data-place="${id}"><span>${index + 1}</span>${place.name}</button>`;
            }).join("")}
          </div>
        </aside>

        <aside class="cartoon-map-info" id="cartoonMapInfo" aria-live="polite"></aside>
      </div>

      <div class="cartoon-map-list" aria-label="Alle steder på kartet">
        ${places.map((place) => `<button type="button" data-place="${place.id}">${place.name}</button>`).join("")}
      </div>

      <div class="map-reflection cartoon-reflection">
        <strong>Tenk over:</strong> Hvorfor tror du så mange fransktalende bor i Afrika? Hva sier kartet om fransk som verdensspråk?
      </div>
    `;

    const buttons = Array.from(map.querySelectorAll("button[data-place]"));
    const info = map.querySelector("#cartoonMapInfo");

    function renderPlace(place) {
      buttons.forEach((button) => {
        button.classList.toggle("active", button.dataset.place === place.id);
      });

      info.innerHTML = `
        <p class="map-region">${place.region}</p>
        <h3>${place.name}</h3>
        <div class="speaker-number">${place.speakers}</div>
        <p><strong>${place.percent}</strong> av befolkningen regnes som fransktalende i tallgrunnlaget.</p>
        <p>${place.note}</p>
      `;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const place = byId(button.dataset.place);
        if (place) renderPlace(place);
      });
    });

    renderPlace(byId("rdc"));
  }

  function injectStyles() {
    if (document.querySelector("#cartoonFrancophoneMapStyles")) return;

    const style = document.createElement("style");
    style.id = "cartoonFrancophoneMapStyles";
    style.textContent = `
      .franco-map.cartoon-franco-map {
        display: block;
        padding: 18px;
        border: 2px solid #bfdbfe;
        border-radius: 8px;
        background: linear-gradient(135deg, #e0f2fe 0%, #ecfeff 52%, #fef9c3 100%);
      }

      .cartoon-map-head {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: flex-start;
        margin-bottom: 14px;
      }

      .cartoon-map-head h3,
      .africa-zoom h3,
      .cartoon-map-info h3 {
        margin: 0 0 6px;
        color: #1e3a8a;
      }

      .cartoon-map-head p,
      .africa-zoom p,
      .cartoon-map-info p {
        margin: 0;
        color: #475569;
        line-height: 1.45;
      }

      .cartoon-map-head > span {
        padding: 8px 10px;
        border-radius: 8px;
        background: #ffffff;
        color: #0f766e;
        font-size: 0.86rem;
        font-weight: 900;
        white-space: nowrap;
      }

      .cartoon-map-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(220px, 0.62fr) minmax(250px, 0.72fr);
        gap: 14px;
        align-items: stretch;
      }

      .cartoon-world {
        min-height: 430px;
        position: relative;
        overflow: hidden;
        border: 2px solid #bae6fd;
        border-radius: 8px;
        background: #dff7ff;
        box-shadow: inset 0 0 0 8px rgba(255, 255, 255, 0.45);
      }

      .cartoon-world svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .ocean {
        fill: #dff7ff;
      }

      .land {
        stroke: #ffffff;
        stroke-width: 8;
        stroke-linejoin: round;
        filter: drop-shadow(0 10px 10px rgba(15, 118, 110, 0.16));
      }

      .americas { fill: #bbf7d0; }
      .europe-asia { fill: #fde68a; }
      .africa { fill: #fed7aa; }
      .oceania { fill: #c7d2fe; }
      .map-route {
        fill: none;
        stroke: rgba(37, 99, 235, 0.35);
        stroke-width: 8;
        stroke-linecap: round;
        stroke-dasharray: 12 16;
      }

      .map-chip,
      .map-zone,
      .africa-button-grid button,
      .cartoon-map-list button {
        border: 2px solid #ffffff;
        border-radius: 8px;
        background: #ffffff;
        color: #0f172a;
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.14);
        font-weight: 900;
        cursor: pointer;
      }

      .map-chip {
        position: absolute;
        transform: translate(-50%, -50%);
        min-width: 94px;
        min-height: 48px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 10px;
        z-index: 2;
      }

      .map-chip span,
      .africa-button-grid span {
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: #2563eb;
        color: #ffffff;
        font-size: 0.82rem;
      }

      .map-zone.africa-main {
        position: absolute;
        left: 53%;
        top: 58%;
        min-width: 136px;
        min-height: 74px;
        transform: translate(-50%, -50%);
        background: #fff7ed;
        color: #9a3412;
        z-index: 3;
      }

      .map-zone small {
        color: #475569;
        font-weight: 800;
      }

      .africa-zoom,
      .cartoon-map-info {
        padding: 16px;
        border: 2px solid #dbeafe;
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0 12px 26px rgba(70, 89, 126, 0.08);
      }

      .africa-zoom {
        background: linear-gradient(180deg, #fff7ed 0%, #ffffff 100%);
      }

      .africa-button-grid {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }

      .africa-button-grid button {
        min-height: 52px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        text-align: left;
      }

      .cartoon-map-info {
        min-height: 260px;
      }

      .speaker-number {
        margin: 10px 0;
        padding: 12px;
        border-radius: 8px;
        background: #eff6ff;
        color: #1e3a8a;
        font-size: 1.35rem;
        font-weight: 900;
      }

      .cartoon-map-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }

      .cartoon-map-list button {
        min-height: 38px;
        padding: 7px 10px;
        color: #1e3a8a;
      }

      .map-chip:hover,
      .map-zone:hover,
      .africa-button-grid button:hover,
      .cartoon-map-list button:hover,
      .map-chip.active,
      .map-zone.active,
      .africa-button-grid button.active,
      .cartoon-map-list button.active {
        color: #ffffff;
        background: #1d4ed8;
        border-color: #bfdbfe;
      }

      .map-chip.active span,
      .africa-button-grid button.active span,
      .map-chip:hover span,
      .africa-button-grid button:hover span {
        background: #facc15;
        color: #1e293b;
      }

      .cartoon-reflection {
        margin-top: 14px;
      }

      @media (max-width: 1050px) {
        .cartoon-map-layout {
          grid-template-columns: 1fr 1fr;
        }

        .cartoon-world {
          grid-column: 1 / -1;
          min-height: 390px;
        }
      }

      @media (max-width: 700px) {
        .cartoon-map-head,
        .cartoon-map-layout {
          grid-template-columns: 1fr;
        }

        .cartoon-map-head {
          display: grid;
        }

        .cartoon-world {
          min-height: 470px;
        }

        .map-chip {
          min-width: 82px;
          min-height: 42px;
          font-size: 0.76rem;
        }

        .map-zone.africa-main {
          min-width: 116px;
          min-height: 66px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    window.setTimeout(render, 0);
  }
})();
