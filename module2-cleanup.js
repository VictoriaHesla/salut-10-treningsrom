const oldModule2Intro = "Modul 2 er delt i fire stasjoner. Elevene kan jobbe i rekkefølge, men de kan også hoppe videre med knappene under. Reiseruta er åpen, så den trenger ikke låses opp.";
const newModule2Intro = "Du skal jobbe med fire stasjoner i denne modulen. Start gjerne med Stasjon 1, og bruk knappene under når du vil gå videre til neste del.";

replaceOldModule2Intro();

const introObserver = new MutationObserver(replaceOldModule2Intro);
introObserver.observe(document.body, { childList: true, subtree: true, characterData: true });

function replaceOldModule2Intro() {
  document.querySelectorAll("p, div, span").forEach((element) => {
    if (element.children.length > 0) return;
    const text = element.textContent.trim();
    if (text === oldModule2Intro) {
      element.textContent = newModule2Intro;
    }
  });
}
