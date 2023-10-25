(() => {
    let scoreElement = document.getElementById("pointsh2");
    let multi = document.getElementById("multi");
    let bonus = document.getElementById("bonus");
    let auto = document.getElementById("auto");
    let price = document.getElementById("price");
    let timer = document.getElementById("timer");
    let info = document.getElementById("info");
    let pricebonus = document.getElementById("pricebonus");
    let priceAuto = document.getElementById("priceauto");
    let rocket = document.getElementById("rocket");
  
    // General
    let score = 0;

    // Bonus
    let bonusActive = false;
    let bonuscredit= 20;
    // autoClick
    let autoInterval;
    let autoClickSpeed = 5000;
    let price_auto = 1;
    let autoClickValue = 1;

    // Multiplier
    let purchaseCost = 0;
    let multiplier = 1;
    let multiplierCost = 20;
    

    function updateScore() {
        scoreElement.textContent = score;
    }

    function countdown() {
        timeLeft--;
        document.getElementById("timer").innerText = "Bonus Time:" + timeLeft;

        if (timeLeft > 0) {
            setTimeout(countdown, 1000);
        } else {
            bonusActive = false;
            timer.style.display = "none";
            bonus.disabled = false;
        }
    }

    bonus.addEventListener("click", function () {
        let bonuscredit = Math.floor(score * 0.05);
        if (score >= bonuscredit) {
            score -= bonuscredit;
            pricebonus.innerText = bonuscredit;
            updateScore();
            if (!bonusActive) {
                timeLeft = 30;
                countdown();
                bonusActive = true;
                timer.style.display = "block";
                bonus.disabled = true;
            }
        }
    });

    rocket.addEventListener("click", function () {
        
        if (bonusActive) {
        score += 2;
        } else {
            score++;
        }
        updateScore();

        if (score >= purchaseCost) {
            score -= purchaseCost;
            score = Math.max(0, score);
            updateScore();
        }
    });

    /*rocket.addEventListener("click", function () {
        score += 1 * multiplier;
        updateScore();
    });*/

    function updateMultiplierButton() {
        multi.innerText = `Buy Multiplier x${multiplierCounter} (Cost: ${multiplierCost})`;
    }
    
    function buyMultiplier() {
        if (score >= multiplierCost && multiplier === 1) {
            score -= multiplierCost;
            multiplier = 2;

            multi.disabled = true;
            updateScore();
            updateMultiplierButton();
        }
    }

    function autoIncrement() {
        score += autoClickValue;
        updateScore();
    }

    function autoClick() {
        if (score >= price_auto && score != 0) {
            score -= price_auto;
            price_auto++;
            updateScore();
        }

        if (autoClickSpeed > 500) {
            autoClickSpeed -= 500;
        }

        if (autoClickSpeed == 500) {
            priceAuto.textContent += `<br> Maximum auto-click speed reached`;
        }

        priceAuto.textContent = price_auto + " credits";

        clearInterval(autoInterval);
        autoInterval = setInterval(autoIncrement, autoClickSpeed);
    }

    auto.addEventListener("click", autoClick);
    
    const infoButton = document.getElementById('buttoninfo');
    const overlay = document.getElementById('overlay');
    const gameInfo = document.getElementById('gameInfo');
    
    // Add a click event listener to the button
    infoButton.addEventListener('click', () => {
      // Show the overlay and the hidden paragraph
        overlay.style.display = 'block';
        gameInfo.style.display = 'block';
    });
    
    // Add a click event listener to the overlay (to close the modal)
    overlay.addEventListener('click', () => {
      // Hide the overlay and the hidden paragraph
        overlay.style.display = 'none';
        gameInfo.style.display = 'none';
    });
    
    closeButton.addEventListener('click', () => {
        gameInfo.style.display = 'none';
        overlay.style.display = 'none';
    });
})();
