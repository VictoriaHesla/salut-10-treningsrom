const summaryCarKey = "salut10-module1-summary-v2";

positionSummaryCar();
window.addEventListener("resize", positionSummaryCar);

document.querySelector("#summaryReset")?.addEventListener("click", () => {
  window.setTimeout(positionSummaryCar, 20);
});

document.querySelector("#summaryAnswers")?.addEventListener("click", () => {
  window.setTimeout(positionSummaryCar, 820);
});

function positionSummaryCar() {
  const car = document.querySelector("#roadCar");
  const wrap = car?.closest(".road-wrap");
  if (!car || !wrap) {
    return;
  }

  let current = 0;
  try {
    current = JSON.parse(localStorage.getItem(summaryCarKey))?.current || 0;
  } catch (error) {
    current = 0;
  }

  const steps = 20;
  const maxTravel = Math.max(0, wrap.clientWidth - 100);
  const pixels = Math.min(maxTravel, (current / steps) * maxTravel);
  car.style.transform = `translateX(${pixels}px)`;
}
