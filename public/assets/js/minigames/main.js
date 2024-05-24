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
function gameOver(gameInterval, hasRestart = false, restart) {
  if (gameInterval) clearInterval(gameInterval);
  alert("Game over!");

  if (hasRestart) {
    restart();
  } else {
    restartGame();
  }
}

/**
 * =================================================================================================
 *  RESTART GAME
 * =================================================================================================
 */
function restartGame() {
  location.reload();
}
