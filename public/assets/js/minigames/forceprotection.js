let score = 0; // Initialize score
let gameInterval; // Declare gameInterval
let timerInterval; // Declare timerInterval
let strikes = 0; // Initialize strike count
let selectedPlaneSpeedInMs = 30; // Default speed
let timer = 30;

const gameArea = document.getElementById("gameArea"); // Game area element
const objectsContainer = document.getElementById("objects"); // Container for game objects

/**
 * =================================================================================================
 *  Initialize friendly forces and enemies
 * =================================================================================================
 */
function initializeForces() {
  const friendlyForces = Array.from({ length: 5 }, () => ({
    x: Math.floor(Math.random() * (gameArea.clientWidth - 20)), // Subtract the width of a game element
    y: Math.floor(Math.random() * (gameArea.clientHeight - 20)), // Subtract the height of a game element
    angle: Math.random() * 2 * Math.PI, // Random initial angle
  }));

  friendlyForces.forEach((force) => {
    const friendly = document.createElement("div");
    friendly.classList.add("friendly");
    friendly.style.left = `${force.x}px`;
    friendly.style.top = `${force.y}px`;
    friendly.setAttribute("data-angle", force.angle.toString());
    objectsContainer.appendChild(friendly);
  });

  spawnEnemies();
}

// Move the friendly forces
function moveFriendlyForces() {
  const friendlies = document.querySelectorAll(".friendly");
  const protectedObject = document.getElementById("protectedObject");
  const rect = protectedObject.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  friendlies.forEach((friendly) => {
    let angle = parseFloat(friendly.getAttribute("data-angle"));
    angle += 0.01;
    const radius = 100;
    const leftPos =
      centerX + Math.cos(angle) * radius - friendly.clientWidth / 2;
    const topPos =
      centerY + Math.sin(angle) * radius - friendly.clientHeight / 2;
    friendly.setAttribute("data-angle", angle.toString());
    friendly.style.left = `${leftPos}px`;
    friendly.style.top = `${topPos}px`;
  });
}

/**
 * =================================================================================================
 *  Spawn enemies at initial positions
 * =================================================================================================
 */
function spawnEnemies() {
  const spawnInterval = setInterval(() => {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    // Randomize enemy type
    if (Math.random() > 0.5) {
      enemy.classList.add("hard");
    } else {
      enemy.classList.add("easy");
    }
    enemy.style.left = `${Math.floor(
      Math.random() * (gameArea.clientWidth - 20)
    )}px`; // Subtract the width of a game element
    enemy.style.top = `${Math.floor(
      Math.random() * (gameArea.clientHeight - 20)
    )}px`; // Subtract the height of a game element
    enemy.setAttribute("data-angle", Math.random() * 360); // Randomize initial angle
    enemy.setAttribute("data-phase", "circling"); // Set initial phase to circling
    objectsContainer.appendChild(enemy);

    // Stop spawning enemies when the timer reaches 0
    if (timer <= 0) {
      clearInterval(spawnInterval);
    }
  }, 1000); // Spawn a new enemy every second
}

/**
 * =================================================================================================
 *  Move enemies towards the protected object
 * =================================================================================================
 */
function moveEnemies() {
  const enemies = document.querySelectorAll(".enemy");
  const protectedObject = document.getElementById("protectedObject");
  const protectedRect = protectedObject.getBoundingClientRect();
  const centerX = protectedRect.left + protectedRect.width / 2;
  const centerY = protectedRect.top + protectedRect.height / 2;

  enemies.forEach((enemy) => {
    const enemyRect = enemy.getBoundingClientRect();
    const enemyX = enemyRect.left + enemyRect.width / 2;
    const enemyY = enemyRect.top + enemyRect.height / 2;

    const phase = enemy.getAttribute("data-phase");

    if (phase === "circling") {
      // Circling Phase
      let angle = parseFloat(enemy.getAttribute("data-angle"));
      angle += 0.01;
      const radius = 150; // Circling radius
      const leftPos =
        centerX + Math.cos(angle) * radius - enemy.clientWidth / 2;
      const topPos =
        centerY + Math.sin(angle) * radius - enemy.clientHeight / 2;
      enemy.setAttribute("data-angle", angle.toString());
      enemy.style.left = `${leftPos}px`;
      enemy.style.top = `${topPos}px`;

      // After a certain time or condition, switch to attacking phase
      if (Math.random() < 0.01) {
        // Random condition to switch phase
        enemy.setAttribute("data-phase", "attacking");
      }
    } else if (phase === "attacking") {
      // Attacking Phase
      let angle = parseFloat(enemy.getAttribute("data-angle"));
      angle += 0.01;
      const radius =
        Math.sqrt((enemyX - centerX) ** 2 + (enemyY - centerY) ** 2) - 2; // Decrease radius to spiral inward
      const leftPos =
        centerX + Math.cos(angle) * radius - enemy.clientWidth / 2;
      const topPos =
        centerY + Math.sin(angle) * radius - enemy.clientHeight / 2;
      enemy.setAttribute("data-angle", angle.toString());
      enemy.style.left = `${leftPos}px`;
      enemy.style.top = `${topPos}px`;
    }
  });
}

/**
 * =================================================================================================
 *  Handle click events to destroy enemies or avoid friendly forces
 * =================================================================================================
 */

function handleClick(event) {
  const x = event.clientX;
  const y = event.clientY;

  const enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    const rect = enemy.getBoundingClientRect();
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      if (enemy.classList.contains("hard")) {
        if (enemy.getAttribute("data-clicked")) {
          enemy.remove();
          score += 20;
        } else {
          enemy.setAttribute("data-clicked", "true");
        }
      } else {
        enemy.remove();
        score += 10;
      }
    }
  });

  const friendlies = document.querySelectorAll(".friendly");
  friendlies.forEach((friendly) => {
    const rect = friendly.getBoundingClientRect();
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      strikes += 1;
      if (strikes >= 3) {
        gameOver(gameInterval, restartGame);
      }
    }
  });
}

/**
 * =================================================================================================
 *  Restart the game
 * =================================================================================================
 */
function restartGame() {
  score = 0; // Reset score
  strikes = 0; // Reset strikes
  timer = 30; // Reset timer
  objectsContainer.innerHTML = ""; // Clear game objects
  initializeForces(); // Reinitialize forces
  startGame(); // Restart the game
}

/**
 * =================================================================================================
 *  Start the game
 * =================================================================================================
 */

// Timer display
function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = timer;
}
// Start the game
function startGame() {
  // Initialize forces
  initializeForces();

  // Main game loop: Move enemies and check their positions
  gameInterval = setInterval(() => {
    moveEnemies();
    moveFriendlyForces();
    checkEnemyPositions();
  }, selectedPlaneSpeedInMs);

  // Timer to track game duration and decrease timer
  timerInterval = setInterval(() => {
    timer -= 1; // Decrease timer
    updateTimer(); // Update timer display
    if (timer <= 0) {
      clearInterval(timerInterval);
      gameWin(gameInterval, score);
    }
  }, 1000);

  // Handle click events
  gameArea.addEventListener("click", handleClick);
}

/**
 * =================================================================================================
 *  Check if any enemies have reached the protected area
 * =================================================================================================
 */
function checkEnemyPositions() {
  const enemies = document.querySelectorAll(".enemy");
  const protectedObject = document.getElementById("protectedObject");
  const protectedRect = protectedObject.getBoundingClientRect();

  enemies.forEach((enemy) => {
    const enemyRect = enemy.getBoundingClientRect();
    if (
      enemyRect.left < protectedRect.right &&
      enemyRect.right > protectedRect.left &&
      enemyRect.top < protectedRect.bottom &&
      enemyRect.bottom > protectedRect.top
    ) {
      gameOver(gameInterval, restartGame);
    }
  });
}

// Start the game on page load
window.onload = () => {
  updateTimer();
  startGame();
};
