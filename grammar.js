document.querySelectorAll(".check-button[data-check]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".activity-card");
    const fields = card.querySelectorAll("[data-answer]");
    let correct = 0;

    fields.forEach((field) => {
      const expected = field.dataset.answer
        .split("|")
        .map((item) => normalizeAnswer(item));
      const given = normalizeAnswer(field.value);
      const isCorrect = expected.includes(given);
      field.classList.toggle("is-correct", isCorrect);
      field.classList.toggle("is-wrong", !isCorrect);
      if (isCorrect) {
        correct += 1;
      }
    });

    const feedback = card.querySelector(".activity-feedback");
    const allCorrect = correct === fields.length;
    feedback.textContent = allCorrect
      ? "✅ Alt riktig. Très bien!"
      : `🔁 ${correct} av ${fields.length} riktige. Se på ordene rundt, og prøv igjen.`;
    feedback.className = allCorrect ? "activity-feedback correct" : "activity-feedback wrong";
  });
});

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}
