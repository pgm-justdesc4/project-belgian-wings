let score = 0; // Initialize score
let gameInterval; // Declare gameInterval
let timerInterval; // Declare timerInterval

// Deze code is VERLOPIG, later komt data uit de database
const gameLocation = "Belgium";
const locations = [
  {
    name: "Belgium",
    backgroundImage: "",
  },
];

/**
 * =================================================================================================
 *  Set game location background
 * =================================================================================================
 */

function setGameLocationBackground(gameLocation) {
  locations.forEach((location) => {
    if (location.name === gameLocation) {
      document.body.style.backgroundImage = `url(${location.backgroundImage})`;
    }
  });
}

/**
 * =================================================================================================
 *  Choose the plane (a better plane is faster, objects will come faster to the player)
 * =================================================================================================
 */
const planes = [
  {
    id: "normal-plane",
    speed: "1s",
    image: "/public/images/minigames/pilot/planes/normal-plane.svg",
  },
  {
    id: "medium-plane",
    speed: "0.8s",
    image: "/public/images/minigames/pilot/planes/medium-plane.svg",
  },
  {
    id: "hard-plane",
    speed: "0.6s",
    image: "/public/images/minigames/pilot/planes/hard-plane.svg",
  },
];

function choosePlane(planeId) {
  let selectedPlane = planes.find((plane) => plane.id === planeId);
  if (selectedPlane) {
    selectedPlaneSpeed = selectedPlane.speed;
    selectedPlaneSpeedInMs = parseFloat(selectedPlane.speed) * 1000;
    document.getElementById("plane").querySelector("img").src =
      selectedPlane.image;

    document.querySelector(".choose-plane").style.display = "none";
    startGame();
  }
}

// Choose a plane to play with
document.querySelectorAll(".planes .plane").forEach((planeElement) => {
  planeElement.addEventListener("click", function () {
    choosePlane(planeElement.alt);
  });
});

/**
 * =================================================================================================
 *  Let objects come to the player
 * =================================================================================================
 */
function objectsComeToPlayer() {
  const objects = document.getElementById("objects");
  const object = document.createElement("div");
  const gameArea = document.querySelector(".game");
  const gameAreaRect = gameArea.getBoundingClientRect();

  object.classList.add("object");

  let leftPos = Math.random() * (gameAreaRect.width - object.offsetWidth);
  if (leftPos < 0) {
    leftPos = 0;
  }

  object.style.left = leftPos + "px";
  object.style.animationDuration = selectedPlaneSpeed;
  objects.appendChild(object);
  object.addEventListener("animationend", function () {
    objects.removeChild(object);
  });
}

/**
 * =================================================================================================
 *  Move the plane left and right
 * =================================================================================================
 */
function movePlane() {
  let mouseDown = false;
  let startX;

  // Get the plane and game area elements
  const plane = document.getElementById("plane");
  const gameArea = document.querySelector(".game");

  // Add event listeners
  let planeRect;

  window.addEventListener("mousedown", function (e) {
    mouseDown = true;
    planeRect = plane.getBoundingClientRect();
    startX = e.clientX - planeRect.left;
  });

  window.addEventListener("mousemove", function (e) {
    if (!mouseDown) return;
    e.preventDefault();
    let gameAreaRect = gameArea.getBoundingClientRect();
    let planeRect = plane.getBoundingClientRect();
    let x = e.clientX - gameAreaRect.left - startX;

    if (x < 0) {
      x = 0;
    } else if (x + planeRect.width > gameAreaRect.width) {
      x = gameAreaRect.width - planeRect.width;
    }

    plane.style.left = x + "px";
  });

  window.addEventListener("mouseup", function () {
    mouseDown = false;
  });
}

/**
 * =================================================================================================
 *  Check if the player has hit an object
 * =================================================================================================
 */

// Game over popup
function gameOver() {
  // Stop the game and show the score
  clearInterval(gameInterval);
  alert("Game over!");

  restartGame();
}

// Check if the player has hit an object
function checkCollision() {
  const plane = document.getElementById("plane");
  const planeRect = plane.getBoundingClientRect();
  const objects = document.querySelectorAll(".object");
  objects.forEach((object) => {
    const objectRect = object.getBoundingClientRect();
    if (
      planeRect.left < objectRect.right &&
      planeRect.right > objectRect.left &&
      planeRect.top < objectRect.bottom &&
      planeRect.bottom > objectRect.top
    ) {
      gameOver();
    }
  });
}

// Restart the game
function restartGame() {
  score = 0;

  const objects = document.getElementById("objects");
  while (objects.firstChild) {
    objects.removeChild(objects.firstChild);
  }

  const plane = document.getElementById("plane");
  plane.style.left = "50%";

  const timerElement = document.getElementById("timer");
  timerElement.textContent = "0";
  clearInterval(timerInterval);

  document.querySelector(".choose-plane").style.display = "block";
}

/**
 * =================================================================================================
 *  Set game win + add scores to the players account.
 * =================================================================================================
 */
function gameWin() {
  clearInterval(gameInterval);
  alert("You win! Your score is: " + score);
}

/**
 * =================================================================================================
 *  START THE GAME
 * =================================================================================================
 */
function startGame() {
  // Set the game location
  setGameLocationBackground(gameLocation);

  // Change the plane's class to avoid slide issues
  const plane = document.getElementById("plane");
  plane.classList.remove("plane");
  plane.classList.add("plane-game");

  // Let the objects fall within the gaming time
  gameInterval = setInterval(function () {
    objectsComeToPlayer();
    checkCollision();
  }, selectedPlaneSpeedInMs);

  // Let the plane move
  movePlane();

  // Make the timer work + add score per second
  let timerValue = 0;
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(function () {
    timerValue++;
    score += 15;
    timerElement.textContent = timerValue;
    if (timerValue >= 30) {
      clearInterval(timerInterval);
      gameWin();
    }
  }, 1000);
}
