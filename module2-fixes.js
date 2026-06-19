function containsWord(text, word) {
  if (!word) return false;
  if (word.endsWith("'")) return text.includes(word);
  return new RegExp(`(^|\\s|')${escapeRegExp(word)}($|\\s|[,.!?;:])`).test(text);
}

const challengeLevelButton = document.querySelector(".level-button[data-level='utfordring']");
if (challengeLevelButton) {
  challengeLevelButton.textContent = "🔥 Skriv selv";
}
