(() => {
  let scoreElement = document.getElementById("pointsh2");
  let multi = document.getElementById("multi");
  let bonus = document.getElementById("bonus");
  let auto = document.getElementById("auto");
  let price = document.getElementById("price");
  let timer = document.getElementById("timer");
  let info = document.getElementById("info");
  let pricebonus = document.getElementById("pricebonus");
  let priceauto = document.getElementById("priceauto");
  let rocket = document.getElementById("rocket");

  let score = 0;
  let purchaseCost = 0;
  function updateScore() {
    scoreElement.textContent = score;
  }

  rocket.addEventListener("click", function () {
    score++;
    updateScore();

    if (score >= purchaseCost) {
      score -= purchaseCost;
      score = Math.max(0, score);
      updateScore();
    }
  });
  updateScore();
  return score;
})();
