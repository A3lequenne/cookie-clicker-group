(() => {
  let scoreElement = document.getElementById("pointsh2");
  let multi = document.getElementById("multi");
  let bonus = document.getElementById("bonus");
  let auto = document.getElementById("auto");
  let price = document.getElementById("price");
  let timer = document.getElementById("timer");
  let pricebonus = document.getElementById("pricebonus");
  let priceAuto = document.getElementById("priceauto");
  let rocket = document.getElementById("rocket");
  const infoButton = document.getElementById("buttoninfo");
  const reset = document.getElementById("buttonreset");
  const overlay = document.getElementById("overlay");
  const gameInfo = document.getElementById("gameInfo");
  const closeButton = document.getElementById("closeButton");
  const purchaseHistoryDisplay = document.getElementById("purchasehistorydisplay");
  let containerPage = document.getElementById("container");
  const soundIcon = document.getElementById("soundicon");
  const music = document.getElementById("music");
  const rocketIcons = document.querySelectorAll(".costum i");
  const mainRocket = document.getElementById("rocket");
  var menus = document.getElementById("menus");
  var startgame = document.getElementById("startgame");

  // General
  let score;
  let clickValue;

  // Bonus
  let bonusActive;
  let bonusPriceValue;
  let timeLeft;

  // autoClick
  let autoPriceValue;
  let autoInterval;
  let autoClickSpeed;
  let autoActive;

  // Multiplier
  let purchaseCost;
  let multiplier;
  let multiplierCost;

  // purchaseHistory
  let purchaseHistory = [];
  let historyText = "";

  // Sound + Landing Page
  var delay = 100;
  let color;

  containerPage.style.display = "none";

  function saveLocalStorage() {
    localStorage.setItem("score", score);
    localStorage.setItem("clickValue", clickValue);
    localStorage.setItem("bonusActive", bonusActive);
    localStorage.setItem("bonusPriceValue", bonusPriceValue);
    localStorage.setItem("autoPriceValue", autoPriceValue);
    localStorage.setItem("timeLeft", timeLeft);
    localStorage.setItem("autoInterval", autoInterval);
    localStorage.setItem("autoClickSpeed", autoClickSpeed);
    localStorage.setItem("autoActive", autoActive);
    localStorage.setItem("purchageCost", purchaseCost);
    localStorage.setItem("multiplier", multiplier);
    localStorage.setItem("multiplierCost", multiplierCost);
    localStorage.setItem("color", color);
  }

  function updateScore() {
    scoreElement.textContent = score;
  }

  function clickOnRocket() {
    score += clickValue * multiplier;
    updateScore();

    if (score >= purchaseCost) {
      score -= purchaseCost;
      score = Math.max(0, score);
      updateScore();
    }
  }

  function displayPurchaseHistory() {
    historyText = "";
    for (let i = 0; i < purchaseHistory.length; i++) {
      historyText += `${purchaseHistory[i][0]} for ${purchaseHistory[i][1]} credit(s)`;
      if (i < purchaseHistory.length) {
        historyText += "\n";
      }
      if (i == 9) {
        break;
      }
    }
    purchaseHistoryDisplay.innerText = historyText;
  }

  function getPurchaseHistory(nameButton, cost) {
    let newPurchase = [nameButton, cost];
    purchaseHistory.unshift(newPurchase);
    displayPurchaseHistory();
  }

  function countdown() {
    if (timeLeft == 30) {
      clickValue = clickValue * 2;
    }

    timeLeft--;
    document.getElementById("timer").innerText =
      "Bonus Time:" + "  " + timeLeft;

    if (timeLeft > 0) {
      setTimeout(countdown, 1000);
    } else {
      bonusActive = false;
      timer.style.display = "none";
      bonus.disabled = false;
      if (clickValue > 1) {
        clickValue /= 2;
      }
    }
  }

  function bonusHandler() {
    if (!bonusActive) {
      if (score >= bonusPriceValue) {
        score -= bonusPriceValue;
        getPurchaseHistory("Bonus", bonusPriceValue);
        bonusPriceValue *= 2;
        pricebonus.innerText = bonusPriceValue + " credits";
        updateScore();

        timeLeft = 30;
        countdown(30);
        bonusActive = true;
        timer.style.display = "block";
        bonus.disabled = true;
        const bonusSound = document.getElementById("bonusSound");
        bonusSound.play();
      }
    }
  }

  function bonusAfterReload() {
    setTimeout(countdown, 1000);
    timer.style.display = "block";
    clickValue *= 2;
  }

  function updateMultiplierButton() {
    if (multiplier > 1) {
      multi.innerText = `Multiplier x${multiplier}`;
    } else {
      multi.innerText = `Multiplier`;
    }
  }

  function buyMultiplier() {
    if (score >= multiplierCost && score != 0) {
      score -= multiplierCost;
      getPurchaseHistory("Multiplier", multiplierCost);
      multiplierCost *= 2;
      multiplier += 1;
      price.innerText = multiplierCost + " credits";

      updateScore();
      updateMultiplierButton();
    }
  }

  function autoIncrement() {
    score += clickValue * multiplier;
    updateScore();
  }

  function buyAutoClick() {
    if (score >= autoPriceValue && score != 0 && autoClickSpeed > 500) {
      score -= autoPriceValue;
      getPurchaseHistory("Auto-click", autoPriceValue);
      autoPriceValue *= 2;
      updateScore();
      autoActive = true;
      autoClickSpeed -= 500;
    }

    auto.innerText = `Auto-click / ${(autoClickSpeed)/ 1000} secs`;

    priceAuto.innerText = autoPriceValue + ` credits`;
    if (autoClickSpeed == 500) {
      priceAuto.innerText = "Max reached";
    }

    if (autoActive == true) {
      clearInterval(autoInterval);
      autoInterval = setInterval(autoIncrement, autoClickSpeed);
    }
  }

  function createStarOutsideView() {
    const starsContainer = document.querySelector(".stars");

    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = "0vh";

    const animationDuration = `${Math.random() * 3 + 2}s`;
    star.style.animation = `moveStar ${animationDuration} linear infinite`;

    function createBackground() {
      starsContainer.removeChild(star);
      createStarOutsideView();
    }

    star.addEventListener("animationiteration", createBackground);

    starsContainer.appendChild(star);
  }

  function createStarsOutsideView(count) {
    const interval = 200;
    for (let i = 0; i < count; i++) {
      setTimeout(createStarOutsideView, i * interval);
    }
  }

  createStarsOutsideView(100);

  function infoButtonClick() {
    overlay.style.display = "block";
    gameInfo.style.display = "block";
  }

  function infoOverlay() {
    overlay.style.display = "none";
    gameInfo.style.display = "none";
  }

  function closeInfoPanel() {
    gameInfo.style.display = "none";
    overlay.style.display = "none";
  }

  function resetGame() {
    if (score == 0) {
      rocket.style.color = "whitesmoke";
      color = "whitesmoke";
      localStorage.setItem("color", color);
    }
    score = 0;
    clickValue = 1;
    bonusActive = false;
    bonusPriceValue = 1;
    timeLeft = 0;
    autoPriceValue = 1;
    clearInterval(autoInterval);
    autoInterval = false;
    autoClickSpeed = 5500;
    autoActive = false;
    purchaseCost = 0;
    multiplier = 1;
    multiplierCost = 1;
    purchaseHistory = [];
    historyText = "";
    updateScore();
    updateMultiplierButton();
    displayPurchaseHistory();
    price.innerText = multiplierCost + " credits";
    pricebonus.innerText = bonusPriceValue + " credits";
    priceAuto.innerText = autoPriceValue + " credits";
    auto.innerText = "Auto-click";
  }

  function getLocalStorage() {
    score = parseInt(localStorage.getItem("score")) || 0;
    clickValue = parseInt(localStorage.getItem("clickValue")) || 1;
    bonusActive = localStorage.getItem("bonusActive") === "true";
    bonusPriceValue = parseInt(localStorage.getItem("bonusPriceValue")) || 1;
    timeLeft = parseInt(localStorage.getItem("timeLeft")) || 0;
    autoPriceValue = parseInt(localStorage.getItem("autoPriceValue")) || 1;
    autoInterval = localStorage.getItem("autoInterval") || false;
    autoClickSpeed = parseInt(localStorage.getItem("autoClickSpeed")) || 5500;
    autoActive = localStorage.getItem("autoActive") || false;
    if (autoActive == "true") {
      clearInterval(autoInterval);
      autoInterval = setInterval(autoIncrement, autoClickSpeed);
    }
    purchaseCost = parseInt(localStorage.getItem("purchaseCost")) || 0;
    multiplier = parseInt(localStorage.getItem("multiplier")) || 1;
    multiplierCost = parseInt(localStorage.getItem("multiplierCost")) || 1;
    updateScore();
    updateMultiplierButton();
    if (timeLeft > 0) {
      bonusAfterReload();
    }
    price.innerText = multiplierCost + " credits";
    pricebonus.innerText = bonusPriceValue + " credits";
    priceAuto.innerText = autoPriceValue + " credits";
    if (score > 0) {
      containerPage.style.display = "flex";
      document.querySelector(".startpage").style.display = "none";
    }
    color = localStorage.getItem("color");
    mainRocket.style.color = color;
    music.muted = localStorage.getItem("soundMuted") === "true";
  }

  function updateButtonStyles(bonus, multi, auto) {
    if (score >= bonusPriceValue) {
      bonus.classList.remove("disabled");
    } else {
      bonus.classList.add("disabled");
    }

    if (score >= multiplierCost) {
      multi.classList.remove("disabled");
    } else {
      multi.classList.add("disabled");
    }

    if (score >= autoPriceValue) {
      auto.classList.remove("disabled");
    } else {
      auto.classList.add("disabled");
    }
  }

  function updateButtonStylesInBackground(bonus, multi, auto) {
    setInterval(() => {
      updateButtonStyles(bonus, multi, auto);
    }, 1000);
  }

  updateButtonStylesInBackground(bonus, multi, auto);

  function startGame() {
    document.querySelector(".startpage").style.display = "none";
    containerPage.style.display = "flex";
  }

  function playSound() {
    setTimeout(function () {
      menus.currentTime = 0;
      menus.play();
    }, delay);
  }

  function stopSound() {
    setTimeout(function () {
      menus.pause();
    }, delay);
  }

  music.volume = 0.1;

  if (music.muted) {
    soundIcon.classList.add("fa-volume-mute");
  }

  function muteMusic() {
    if (music.muted) {
      music.muted = false;
      soundIcon.classList.remove("fa-volume-mute");
    } else {
      music.muted = true;
      soundIcon.classList.add("fa-volume-mute");
    }
    localStorage.setItem("soundMuted", music.muted);
  }

  function chooseColor(rocketIcon) {
    color = getComputedStyle(rocketIcon).color;
    localStorage.setItem("color", color);
    mainRocket.style.color = color;
    closeInfoPanel();
  }

  window.addEventListener("load", getLocalStorage);
  window.addEventListener("beforeunload", saveLocalStorage);

  startgame.addEventListener("click", startGame);

  rocket.addEventListener("click", clickOnRocket);

  auto.addEventListener("click", buyAutoClick);
  multi.addEventListener("click", buyMultiplier);
  bonus.addEventListener("click", bonusHandler);

  reset.addEventListener("click", resetGame);

  infoButton.addEventListener("click", infoButtonClick);
  overlay.addEventListener("click", infoOverlay);
  closeButton.addEventListener("click", closeInfoPanel);
  soundIcon.addEventListener("click", muteMusic);
  rocketIcons.forEach((rocketIcon) => {
    rocketIcon.addEventListener("click", () => chooseColor(rocketIcon));
  });

  startgame.addEventListener("mouseenter", playSound);
  startgame.addEventListener("mouseleave", stopSound);
  multi.addEventListener("mouseenter", playSound);
  multi.addEventListener("mouseleave", stopSound);
  bonus.addEventListener("mouseenter", playSound);
  bonus.addEventListener("mouseleave", stopSound);
  auto.addEventListener("mouseenter", playSound);
  auto.addEventListener("mouseleave", stopSound);

})();
