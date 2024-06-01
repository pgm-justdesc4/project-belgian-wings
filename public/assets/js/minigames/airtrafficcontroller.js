let gameInterval;
let timerInterval;
let score = 0;
let timer = 30;

const gameArea = document.getElementById("gameArea");
const circle = document.getElementById("circle");

const airplaneSize = 30;
const circleRadius = circle.offsetWidth / 2;

// Initialize airplanes in the circle
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
      airplane.setAttribute("data-angle", angle.toString());
      gameArea.appendChild(airplane);
    }
  }
}

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
          gameOver(gameInterval);
          collisionDetected = true;
        }
      }
    });

    if (!collisionDetected) {
      airplane.setAttribute("data-angle", angle.toString());
      airplane.style.left = `${newX}px`;
      airplane.style.top = `${newY}px`;
    } else {
      angle += Math.PI; // Change direction by 180 degrees
      airplane.setAttribute("data-angle", angle.toString());
    }
  });
}

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
        airplane.style.transform = `rotate(${angle * (180 / Math.PI)}deg)`; // Add this line
      }
    }
  });
}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = timer;
}

function startGame() {
  initializeAirplanes();

  gameInterval = setInterval(() => {
    moveAirplanes();
  }, 75);

  timerInterval = setInterval(() => {
    timer -= 1;
    updateTimer();
    if (timer <= 0) {
      clearInterval(timerInterval);
      gameWin(gameInterval, score);
    }
  }, 1000);

  // Spawn more airplanes at random times
  const spawnAirplanes = () => {
    const delay = Math.random() * 10000; // Random delay between 0 and 5000 milliseconds
    setTimeout(() => {
      if (document.querySelectorAll(".airplane").length < 10) {
        // Stop spawning after 20 airplanes
        initializeAirplanes();
        spawnAirplanes(); // Schedule the next spawn
      }
    }, delay);
  };
  spawnAirplanes(); // Start spawning

  gameArea.addEventListener("click", handleClick);
}

window.onload = () => {
  updateTimer();
  startGame();
};
