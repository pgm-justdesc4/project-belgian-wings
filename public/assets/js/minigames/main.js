/**
 * =================================================================================================
 *  GAME WIN
 * =================================================================================================
 */
function gameWin(gameInterval, score) {
  if (gameInterval) clearInterval(gameInterval);
  fetch("/api/minigameFinished", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ xp: score }),
  });
  alert("You win! Your score is: " + score);
}

/**
 * =================================================================================================
 *  GAME OVER
 * =================================================================================================
 */
function gameOver(gameInterval) {
  document.querySelector("main").display = "none";
  if (gameInterval) clearInterval(gameInterval);
  const gameOverEl = document.createElement("div");
  gameOverEl.classList.add("game-over");
  document.body.appendChild(gameOverEl);
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.querySelector(".game-over").appendChild(overlay);
  const gameOverScreen = document.createElement("div");
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart";
  restartButton.addEventListener("click", restartGame);
  gameOverScreen.classList.add("game-over-screen");
  gameOverScreen.innerHTML =
    "<h1>Game Over</h1><p>Probeer volgende keer beter</p>";
  gameOverScreen.appendChild(restartButton);
  document.querySelector(".game-over").appendChild(gameOverScreen);
}

/**
 * =================================================================================================
 *  RESTART GAME
 * =================================================================================================
 */
function restartGame() {
  location.reload();
}

/**
 * =================================================================================================
 *  RESTART GAME
 * =================================================================================================
 */

function restartGame() {
  location.reload();
}
