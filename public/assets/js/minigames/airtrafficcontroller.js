let gameInterval;
let timerInterval;
let score = 0;
let timer = 0;

const gameArea = document.getElementById("gameArea");
const circle = document.getElementById("circle");

const airplaneSize = 30;

/**
 * =================================================================================================
 *  Initialize airplanes
 * =================================================================================================
 */

function initializeAirplanes() {
  const airplanes = [];

  while (airplanes.length < 5) {
    // Choose a random point on the edge of the game area
    const edge = Math.floor(Math.random() * 4);
    let x, y, angle;
    switch (edge) {
      case 0: // Top edge
        x = Math.random() * gameArea.offsetWidth;
        y = -airplaneSize;
        angle = Math.PI / 2;
        break;
      case 1: // Right edge
        x = gameArea.offsetWidth;
        y = Math.random() * gameArea.offsetHeight;
        angle = Math.PI;
        break;
      case 2: // Bottom edge
        x = Math.random() * gameArea.offsetWidth;
        y = gameArea.offsetHeight;
        angle = (3 * Math.PI) / 2;
        break;
      case 3: // Left edge
        x = -airplaneSize;
        y = Math.random() * gameArea.offsetHeight;
        angle = 0;
        break;
    }

    const newAirplane = { x, y, angle };

    if (!checkCollisions(newAirplane, airplanes)) {
      airplanes.push(newAirplane);
      const airplane = document.createElement("div");
      airplane.classList.add("airplane");
      airplane.classList.add(Math.random() > 0.5 ? "green" : "red");
      airplane.style.left = `${x}px`;
      airplane.style.top = `${y}px`;
      airplane.style.transform = `rotate(${angle + Math.PI / 2}rad)`; // Adjust rotation
      airplane.setAttribute("data-angle", angle.toString());
      gameArea.appendChild(airplane);
    }
  }
}

/**
 * =================================================================================================
 *  Move airplanes within the game area
 * =================================================================================================
 */

// Move airplanes
function moveAirplanes() {
  const airplanes = document.querySelectorAll(".airplane");

  airplanes.forEach((airplane) => {
    let angle = parseFloat(airplane.getAttribute("data-angle"));
    let x = parseFloat(airplane.style.left);
    let y = parseFloat(airplane.style.top);

    // Calculate the new position
    let newX = x + Math.cos(angle) * 2;
    let newY = y + Math.sin(angle) * 2;

    // Check for collisions with other airplanes
    let collisionDetected = false;
    airplanes.forEach((otherAirplane) => {
      if (otherAirplane === airplane) return;

      const otherX = parseFloat(otherAirplane.style.left);
      const otherY = parseFloat(otherAirplane.style.top);

      const dx = Math.abs(newX - otherX);
      const dy = Math.abs(newY - otherY);

      if (dx < airplaneSize && dy < airplaneSize) {
        if (
          (airplane.classList.contains("red") &&
            otherAirplane.classList.contains("green")) ||
          (airplane.classList.contains("green") &&
            otherAirplane.classList.contains("red"))
        ) {
          gameWin(gameInterval, score);
          collisionDetected = true;
        }
      }
    });

    if (!collisionDetected) {
      airplane.setAttribute("data-angle", angle.toString());
      airplane.style.left = `${newX}px`;
      airplane.style.top = `${newY}px`;
      airplane.style.transform = `rotate(${angle + Math.PI / 2}rad)`;
    } else {
      angle += Math.PI;
      airplane.setAttribute("data-angle", angle.toString());
    }
  });
}

/**
 * =================================================================================================
 *  Check for collisions between airplanes
 * =================================================================================================
 */

function checkCollisions(newAirplane, airplanes) {
  for (let i = 0; i < airplanes.length; i++) {
    const dx = newAirplane.x - airplanes[i].x;
    const dy = newAirplane.y - airplanes[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < airplaneSize) {
      return true;
    }
  }

  return false;
}

/**
 * =================================================================================================
 *  Handle click events on airplanes
 * =================================================================================================
 */

function handleClick(event) {
  const x = event.clientX;
  const y = event.clientY;

  const airplanes = document.querySelectorAll(".airplane");
  airplanes.forEach((airplane) => {
    const rect = airplane.getBoundingClientRect();
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      if (airplane.classList.contains("green")) {
        let angle = parseFloat(airplane.getAttribute("data-angle"));
        angle += Math.PI / 2; // Rotate 90 degrees
        airplane.setAttribute("data-angle", angle.toString());
        airplane.style.transform = `rotate(${angle + Math.PI / 2}rad)`;
      }
    }
  });
}

/**
 * =================================================================================================
 *  Update timer
 * =================================================================================================
 */
function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = timer;
}

/**
 * =================================================================================================
 *  Start the game
 * =================================================================================================
 */

function startGame() {
  initializeAirplanes();

  gameInterval = setInterval(() => {
    moveAirplanes();
  }, 75);

  // Increment timer every second
  timerInterval = setInterval(() => {
    timer++;
    updateTimer();
  }, 1000);

  // Increment score every second
  const scoreInterval = setInterval(() => {
    score += 2;
  }, 1000);

  // Spawn more airplanes every 15 seconds
  const spawnAirplanes = () => {
    const delay = 15000; // 15 seconds
    setTimeout(() => {
      initializeAirplanes();
      spawnAirplanes();
    }, delay);
  };
  spawnAirplanes();

  gameArea.addEventListener("click", handleClick);
}

// Start the game on page load
window.onload = () => {
  updateTimer();
  startGame();
};
