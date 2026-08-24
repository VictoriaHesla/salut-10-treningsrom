(() => {
  const glossaryUnlockKey = "salut10-blog-glossary-unlocked-v1";

  function loadUnlockedGlossaries() {
    try {
      const stored = JSON.parse(localStorage.getItem(glossaryUnlockKey));
      return new Set(Array.isArray(stored) ? stored : []);
    } catch (error) {
      return new Set();
    }
  }

  function setButtonText(button, text) {
    if (button) button.textContent = text;
  }

  function syncOpenButton(wrapper) {
    if (!wrapper) return;
    const button = wrapper.querySelector(".glossary-open-button");
    const content = wrapper.querySelector(".glossary-content");
    const panel = wrapper.querySelector(".glossary-password-panel");
    const sectionId = wrapper.dataset.glossary;
    const unlocked = loadUnlockedGlossaries().has(sectionId);

    if (content && !content.hidden) {
      setButtonText(button, "🔓 Lukk gloseliste");
      return;
    }

    if (unlocked) {
      setButtonText(button, "🔓 Åpne gloseliste igjen");
      return;
    }

    setButtonText(button, panel && !panel.hidden ? "🔐 Skjul passordfelt" : "🔐 Åpne gloseliste");
  }

  function enhanceGlossaries() {
    document.querySelectorAll(".glossary-lock").forEach((wrapper) => {
      const button = wrapper.querySelector(".glossary-open-button");
      const content = wrapper.querySelector(".glossary-content");
      const panel = wrapper.querySelector(".glossary-password-panel");
      const sectionId = wrapper.dataset.glossary;
      if (!button || button.dataset.closeToggleReady === "true") return;

      button.dataset.closeToggleReady = "true";
      syncOpenButton(wrapper);

      button.addEventListener("click", () => {
        window.setTimeout(() => {
          const unlocked = loadUnlockedGlossaries().has(sectionId);

          if (content && !content.hidden) {
            content.hidden = true;
            if (panel) panel.hidden = true;
            syncOpenButton(wrapper);
            return;
          }

          if (unlocked && content) {
            content.hidden = false;
            if (panel) panel.hidden = true;
          }

          syncOpenButton(wrapper);
        }, 0);
      });
    });

    document.querySelectorAll(".glossary-unlock-button").forEach((button) => {
      if (button.dataset.closeToggleReady === "true") return;
      button.dataset.closeToggleReady = "true";
      button.addEventListener("click", () => {
        window.setTimeout(() => syncOpenButton(button.closest(".glossary-lock")), 0);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceGlossaries);
  } else {
    enhanceGlossaries();
  }
})();
