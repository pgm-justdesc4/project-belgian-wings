/**
 * =================================================================================================
 *  GAME WIN
 * =================================================================================================
 */
function gameWin(gameInterval, score, timerInterval = null) {
  if (gameInterval) clearInterval(gameInterval);
  if (timerInterval) clearInterval(timerInterval);
  fetch("/api/minigameFinished", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ xp: score }),
  });
  const gameWinEl = document.createElement("div");
  gameWinEl.classList.add("game-win");
  document.body.appendChild(gameWinEl);
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.querySelector(".game-win").appendChild(overlay);
  const gameWinScreen = document.createElement("div");
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Speel opnieuw";
  restartButton.addEventListener("click", restartGame);
  gameWinScreen.classList.add("game-win-screen");
  gameWinScreen.innerHTML = `<h1>Spel voltooid</h1>
      <p>+${score} xp</p>
      <a href="/home">Terug naar home</a>
    `;
  gameWinScreen.appendChild(restartButton);
  document.querySelector(".game-win").appendChild(gameWinScreen);
}

/**
 * =================================================================================================
 *  GAME OVER
 * =================================================================================================
 */
function gameOver(gameInterval, timerInterval = null) {
  document.querySelector("main").display = "none";
  if (gameInterval) clearInterval(gameInterval);
  if (timerInterval) clearInterval(timerInterval);
  const gameOverEl = document.createElement("div");
  gameOverEl.classList.add("game-over");
  document.body.appendChild(gameOverEl);
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.querySelector(".game-over").appendChild(overlay);
  const gameOverScreen = document.createElement("div");
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Probeer opnieuw";
  restartButton.addEventListener("click", restartGame);
  gameOverScreen.classList.add("game-over-screen");
  gameOverScreen.innerHTML = `<h1>Game Over</h1>
      <p>Probeer opnieuw, of ga terug naar home.</p>
      <a href="/home">Terug naar home</a>
    `;
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
