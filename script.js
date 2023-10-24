(() => {
  let scorep = 300;
  let score = document.getElementById("pointsh2");
  let multi = document.getElementById("multi");
  let bonus = document.getElementById("bonus");
  let auto = document.getElementById("auto");
  let price = document.getElementById("price");
  let timer = document.getElementById("timer");
  let info = document.getElementById("info");
  let pricebonus = document.getElementById("pricebonus");
  let priceauto = document.getElementById("priceauto");
  let rocket = document.getElementById("rocket");
  let bonusActive = false;

  function countdown() {
    timeLeft--;
    document.getElementById("timer").innerText = "Bouns Time:" + timeLeft;

    if (timeLeft > 0) {
      setTimeout(countdown, 1000);
    } else {
      bonusActive = false;
      timer.style.display = "none";
      bonus.disabled = false;
    }
  }
  score.innerText = scorep;
  bonus.addEventListener("click", function () {
    if (!bonusActive) {
      scorep = scorep + scorep;
      score.innerText = scorep;
      timeLeft = 30;
      countdown();
      bonusActive = true;
      timer.style.display = "block";
      bonus.disabled = true;
    }
  });
})();
