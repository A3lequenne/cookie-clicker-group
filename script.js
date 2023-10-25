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
    let clickValue = 1;

    // Bonus
    let bonusActive = false;
    let bonusPriceValue = 1;
    
    // autoClick
    let autoPriceValue = 1;
    let autoInterval;
    let autoClickSpeed = 5000;
    let autoActive = false;

    // Multiplier
    let purchaseCost = 0;
    let multiplier = 1;
    let multiplierCost = 1;
    

    function updateScore() {
        scoreElement.textContent = score;
    }

    function countdown() {
        if (timeLeft == 30) {
            clickValue = clickValue * 2;
        }
        
        timeLeft--;
        document.getElementById("timer").innerText = "Bonus Time:" + timeLeft;
        
        if (timeLeft > 0) {
            setTimeout(countdown, 1000);
        } else {
            bonusActive = false;
            timer.style.display = "none";
            bonus.disabled = false;
            clickValue /= 2;
        }
    }

    bonus.addEventListener("click", function () {
        if (!bonusActive) {
            if (score >= bonusPriceValue) {
                score -= bonusPriceValue;
                bonusPriceValue *= 2;
                pricebonus.innerText = bonusPriceValue  + " credits";
                updateScore();

                timeLeft = 30;
                countdown();
                bonusActive = true;
                timer.style.display = "block";
                bonus.disabled = true;
            }
        }
    });

    function updateMultiplierButton() {
        multi.innerText = `Multiplier x${multiplier}`;
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
        if (autoClickSpeed > 2500) {
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

    auto.addEventListener("click", buyAutoClick);
    multi.addEventListener("click", buyMultiplier);

    rocket.addEventListener("click", function () {
        score += clickValue * multiplier;
        //console.log(`score: ${score} \nclickValue: ${clickValue} \nmultiplier: ${multiplier} \nincrement: ${clickValue * multiplier}`);
        updateScore();

        if (score >= purchaseCost) {
            score -= purchaseCost;
            score = Math.max(0, score);
            updateScore();
        }
    });
    
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
