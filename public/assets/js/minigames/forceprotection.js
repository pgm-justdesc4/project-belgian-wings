let gameInterval;
let timerInterval;
let score = 0;
let strikes = 0;
let enemyMoveSpeed = 75;
let timer = 30;

const gameArea = document.getElementById("gameArea");
const objectsContainer = document.getElementById("objects");

/**
 * =================================================================================================
 *  Initialize friendly forces at random positions
 * =================================================================================================
 */

// Check if two forces are colliding
const forceSize = 32;
function checkCollision(newForce, existingForces) {
  for (let i = 0; i < existingForces.length; i++) {
    const existingForce = existingForces[i];
    const dx = Math.abs(newForce.x - existingForce.x);
    const dy = Math.abs(newForce.y - existingForce.y);

    if (dx < forceSize && dy < forceSize) {
      return true;
    }
  }
  return false;
}

// Initialize friendly forces at random positions
function initializeForces() {
  const friendlyForces = [];
  while (friendlyForces.length < 5) {
    const newForce = {
      x: Math.floor(Math.random() * (gameArea.clientWidth - forceSize)),
      y: Math.floor(Math.random() * (gameArea.clientHeight - forceSize)),
      angle: Math.random() * 2 * Math.PI,
    };

    if (!checkCollision(newForce, friendlyForces)) {
      friendlyForces.push(newForce);
    }
  }

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
let timeStep = 0;

function moveFriendlyForces() {
  const friendlies = document.querySelectorAll(".friendly");
  const protectedObject = document.getElementById("protectedObject");
  const rect = protectedObject.getBoundingClientRect();
  const gameAreaRect = gameArea.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2 - gameAreaRect.left;
  const centerY = rect.top + rect.height / 2 - gameAreaRect.top;

  timeStep += 0.01;

  friendlies.forEach((friendly) => {
    let angle = parseFloat(friendly.getAttribute("data-angle"));
    angle += 0.01;
    const radius = 100 + 50 * Math.sin(timeStep);
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

    if (Math.random() > 0.5) {
      enemy.classList.add("hard");
    } else {
      enemy.classList.add("easy");
    }

    const side = Math.floor(Math.random() * 4);
    switch (side) {
      case 0: // Top
        enemy.style.left = `${Math.random() * 100}%`;
        enemy.style.top = `${-enemy.clientHeight}px`;
        break;
      case 1: // Right
        enemy.style.left = `${100 + enemy.clientWidth}px`;
        enemy.style.top = `${Math.random() * 100}%`;
        break;
      case 2: // Bottom
        enemy.style.left = `${Math.random() * 100}%`;
        enemy.style.top = `${100 + enemy.clientHeight}px`;
        break;
      case 3: // Left
        enemy.style.left = `${-enemy.clientWidth}px`;
        enemy.style.top = `${Math.random() * 100}%`;
        break;
    }

    enemy.setAttribute("data-angle", Math.random() * 360);
    enemy.setAttribute("data-phase", "circling");
    objectsContainer.appendChild(enemy);

    // Set final position after a short delay
    setTimeout(() => {
      enemy.style.left = `${Math.floor(
        Math.random() * (gameArea.clientWidth - 20)
      )}px`;

      enemy.style.top = `${Math.floor(
        Math.random() * (gameArea.clientHeight - 20)
      )}px`;
    }, 100);

    if (timer <= 0) {
      clearInterval(spawnInterval);
    }
  }, 1000);
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
  const gameAreaRect = gameArea.getBoundingClientRect();
  const centerX =
    protectedRect.left + protectedRect.width / 2 - gameAreaRect.left;
  const centerY =
    protectedRect.top + protectedRect.height / 2 - gameAreaRect.top;

  enemies.forEach((enemy) => {
    const enemyRect = enemy.getBoundingClientRect();
    const enemyX = enemyRect.left + enemyRect.width / 2 - gameAreaRect.left;
    const enemyY = enemyRect.top + enemyRect.height / 2 - gameAreaRect.top;

    const phase = enemy.getAttribute("data-phase");

    if (phase === "circling") {
      let angle = parseFloat(enemy.getAttribute("data-angle"));
      angle += 0.01;
      const radius = 150;
      const leftPos =
        centerX + Math.cos(angle) * radius - enemy.clientWidth / 2;
      const topPos =
        centerY + Math.sin(angle) * radius - enemy.clientHeight / 2;
      enemy.setAttribute("data-angle", angle.toString());
      enemy.style.left = `${leftPos}px`;
      enemy.style.top = `${topPos}px`;

      if (Math.random() < 0.01) {
        enemy.setAttribute("data-phase", "attacking");
      }
    } else if (phase === "attacking") {
      let angle = parseFloat(enemy.getAttribute("data-angle"));
      angle += 0.01;
      const radius =
        Math.sqrt((enemyX - centerX) ** 2 + (enemyY - centerY) ** 2) - 2;
      const leftPos =
        centerX + Math.cos(angle) * radius - enemy.clientWidth / 2;
      const topPos =
        centerY + Math.sin(angle) * radius - enemy.clientHeight / 2;
      enemy.setAttribute("data-angle", angle.toString());
      enemy.style.left = `${leftPos}px`;
      enemy.style.top = `${topPos}px`;
    }

    // Friendly forces/enemies remove on collision
    const friendlies = document.querySelectorAll(".friendly");
    friendlies.forEach((friendly) => {
      const friendlyRect = friendly.getBoundingClientRect();
      if (
        enemyRect.left < friendlyRect.right &&
        enemyRect.right > friendlyRect.left &&
        enemyRect.top < friendlyRect.bottom &&
        enemyRect.bottom > friendlyRect.top
      ) {
        enemy.remove();
        friendly.remove();
      }
    });
  });
}

/**
 * =================================================================================================
 *  Handle click events to destroy enemies and if 3 times friendly forces are clicked, game over
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

  // Check if friendly forces are clicked
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
        gameOver(gameInterval);
      }
    }
  });
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
  initializeForces();

  gameInterval = setInterval(() => {
    moveEnemies();
    moveFriendlyForces();
    checkEnemyPositions();
  }, enemyMoveSpeed);

  timerInterval = setInterval(() => {
    timer -= 1;
    updateTimer();
    if (timer <= 0) {
      clearInterval(timerInterval);
      gameWin(gameInterval, score);
    }
  }, 1000);

  // Handle click events
  gameArea.addEventListener("click", handleClick);
  gameArea.addEventListener("touchstart", handleClick);
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
      gameOver(gameInterval);
    }
  });
}

// Start the game on page load
window.onload = () => {
  updateTimer();
  startGame();
};
