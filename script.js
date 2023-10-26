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
    const infoButton = document.getElementById('buttoninfo');
    const reset = document.getElementById("buttonreset");
    const overlay = document.getElementById('overlay');
    const gameInfo = document.getElementById('gameInfo');
    const closeButton = document.getElementById('closeButton');
  
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
    }

    function updateScore() {
        scoreElement.textContent = score;
    }

    function clickOnRocket() {
        score += clickValue * multiplier;
        //console.log(`score: ${score} \nclickValue: ${clickValue} \nmultiplier: ${multiplier} \nincrement: ${clickValue * multiplier}`);
        updateScore();

        if (score >= purchaseCost) {
            score -= purchaseCost;
            score = Math.max(0, score);
            updateScore();
        }
    }

    function countdown() {
        if (timeLeft == 30) {
            clickValue = clickValue * 2;
        }
        
        timeLeft--;
        document.getElementById("timer").innerText = "Bonus Time:" + "  " + timeLeft;
        
        if (timeLeft > 0) {
            setTimeout(countdown, 1000);
        } 
        else {
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
                bonusPriceValue *= 2;
                pricebonus.innerText = bonusPriceValue  + " credits";
                updateScore();

                timeLeft = 30;
                countdown(30);
                bonusActive = true;
                timer.style.display = "block";
                bonus.disabled = true;
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
        }
        else {
            multi.innerText = `Multiplier`;
        }
    }
    
    function buyMultiplier() {
        if (score >= multiplierCost && score != 0) {
            score -= multiplierCost;
            multiplierCost *= 2;
            multiplier += 1;
            price.innerText = multiplierCost  + " credits";
            
            updateScore();
            updateMultiplierButton();
        }
    }

    function autoIncrement() {
        score += clickValue * multiplier;
        updateScore();
    }

    function buyAutoClick() {        
        if (autoClickSpeed > 500) {
            if (score >= autoPriceValue && score != 0) {
                score -= autoPriceValue;
                autoPriceValue *= 2;
                updateScore();
                autoActive = true;
            }
            autoClickSpeed -= 500;
        }

        priceAuto.innerText = autoPriceValue + " credits";

        if (autoActive == true) {
            clearInterval(autoInterval);
            autoInterval = setInterval(autoIncrement, autoClickSpeed);
        }
    } 

  /*
    function updateButtonStates(bonus, multi, auto) {
        if (score >= bonusPriceValue) {
            bonus.removeAttribute("disabled");
        } else {
            bonus.setAttribute("disabled", "disabled");
        }

        if (score >= multiplierCost) {
            multi.removeAttribute("disabled");
        } else {
            multi.setAttribute("disabled", "disabled");
        }

        if (score >= autoPriceValue) {
            auto.removeAttribute("disabled");
        } else {
            auto.setAttribute("disabled", "disabled");
        }
    }

    updateButtonStates(bonus, multi, auto);
    };
*/
  

    /*function addHighscore(playerName, score) {
        const newRow = document.createElement("tr");

        const rankCell = document.createElement("td");
        const playerCell = document.createElement("td");
        const scoreCell = document.createElement("td");

        rankCell.textContent = "1";
        playerCell.textContent = playerName;
        scoreCell.textContent = score;

        newRow.appendChild(rankCell);
        newRow.appendChild(playerCell);
        newRow.appendChild(scoreCell);

        const leaderboardTable = document.querySelector("#leaderboard table tbody");
        leaderboardTable.appendChild(newRow);
  }
    addHighscore("Player 1", 100);
    addHighscore("Player 2", 150);
    addHighscore("Player 3", 200);
    addHighscore("Player 4", 250);
    addHighscore("Player 5", 300);*/
  
    function createStarOutsideView() {
        const starsContainer = document.querySelector(".stars");

        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = "0vh";

        const animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animation = `moveStar ${animationDuration} linear infinite`;

        star.addEventListener("animationiteration", () => {
            starsContainer.removeChild(star);
            createStarOutsideView();
        });

        starsContainer.appendChild(star);
}

    function createStarsOutsideView(count) {
        const interval = 200;
        for (let i = 0; i < count; i++) {
            setTimeout(createStarOutsideView, i * interval);
        }
}

    createStarsOutsideView(100);

    // Add a click event listener to the button
    function infoButtonClick() {
        overlay.style.display = 'block';
        gameInfo.style.display = 'block';
    }

    // Add a click event listener to the overlay (to close the modal)
    function infoOverlay() {
        overlay.style.display = 'none';
        gameInfo.style.display = 'none';
    }

    function closeInfoPanel() {
        gameInfo.style.display = 'none';
        overlay.style.display = 'none';
    }

    function resetGame() {
        score = 0;
        clickValue = 1;
        bonusActive = false;
        bonusPriceValue = 1;
        timeLeft = 0;
        autoPriceValue = 1;
        clearInterval(autoInterval);
        autoInterval = false;
        autoClickSpeed = 5000;
        autoActive = false;
        purchaseCost = 0;
        multiplier = 1;
        multiplierCost = 1;
        updateScore();
        updateMultiplierButton();
        price.innerText = multiplierCost  + " credits";
        pricebonus.innerText = bonusPriceValue  + " credits";
        priceAuto.innerText = autoPriceValue + " credits";
    }

    function getLocalStorage() {
        score = parseInt(localStorage.getItem("score")) || 0;
        clickValue = parseInt(localStorage.getItem("click")) || 1;
        bonusActive = localStorage.getItem("bonusActive") === "true";
        bonusPriceValue = parseInt(localStorage.getItem("bonusPriceValue")) || 1;
        timeLeft = parseInt(localStorage.getItem("timeLeft")) || 0;
        autoPriceValue = parseInt(localStorage.getItem("autoPriceValue")) || 1;
        autoInterval = localStorage.getItem("autoInterval") || false;
        autoClickSpeed = parseInt(localStorage.getItem("autoClickSpeed")) || 5000;
        autoActive = localStorage.getItem("autoActive") || false;
        if (autoActive == 'true') {
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
        price.innerText = multiplierCost  + " credits";
        pricebonus.innerText = bonusPriceValue  + " credits";
        priceAuto.innerText = autoPriceValue + " credits";
    }

    window.addEventListener("load", getLocalStorage);
    window.addEventListener("beforeunload", saveLocalStorage);

    rocket.addEventListener("click", clickOnRocket);

    auto.addEventListener("click", buyAutoClick);
    multi.addEventListener("click", buyMultiplier);
    bonus.addEventListener("click", bonusHandler);

    reset.addEventListener("click", resetGame);

    infoButton.addEventListener('click', infoButtonClick);
    overlay.addEventListener('click', infoOverlay);
    closeButton.addEventListener('click', closeInfoPanel);
})();
