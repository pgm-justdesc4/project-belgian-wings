/**
 * =================================================================================================
 *  GAME WIN
 * =================================================================================================
 */
function gameWin(gameInterval, score) {
  if (gameInterval) clearInterval(gameInterval);
  alert("You win! Your score is: " + score);
}

/**
 * =================================================================================================
 *  GAME OVER
 * =================================================================================================
 */
function gameOver(gameInterval, restartGame) {
  if (gameInterval) clearInterval(gameInterval);
  alert("Game over!");

  restartGame();
}
