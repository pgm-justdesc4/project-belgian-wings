let score = 0; // Initialize score
let gameInterval; // Declare gameInterval
let timerInterval; // Declare timerInterval

/**
 * =================================================================================================
 *  Choose the plane (a better plane is faster, objects will come faster to the player)
 * =================================================================================================
 */
const planes = [
  {
    id: "normal-plane",
    speed: "1s",
    image: "/assets/images/minigames/pilot/planes/normal-plane.svg",
    scoreIncrement: 10,
  },
  {
    id: "medium-plane",
    speed: "0.8s",
    image: "/assets/images/minigames/pilot/planes/medium-plane.svg",
    scoreIncrement: 15,
  },
  {
    id: "hard-plane",
    speed: "0.6s",
    image: "/assets/images/minigames/pilot/planes/hard-plane.svg",
    scoreIncrement: 20,
  },
];

let selectedPlaneScoreIncrement;

function choosePlane(planeId) {
  let selectedPlane = planes.find((plane) => plane.id === planeId);
  if (selectedPlane) {
    selectedPlaneSpeed = selectedPlane.speed;
    selectedPlaneSpeedInMs = parseFloat(selectedPlane.speed) * 1000;
    selectedPlaneScoreIncrement = selectedPlane.scoreIncrement;
    document.querySelector("#plane img").src = selectedPlane.image;

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
  const object = document.createElement("svg");
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
  let startLeft;

  // Get the plane and game area elements
  const plane = document.getElementById("plane");
  const gameArea = document.querySelector(".game");

  // Event listeners for mouse
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

  // Event listeners for mobile touch
  plane.addEventListener("touchstart", function (e) {
    mouseDown = true;
    const planeRect = plane.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();
    startX = e.touches[0].clientX;
    startLeft = planeRect.left - gameAreaRect.left;
  });

  gameArea.addEventListener("touchmove", function (e) {
    if (!mouseDown) return;
    e.preventDefault();
    const gameAreaRect = gameArea.getBoundingClientRect();
    let x = e.touches[0].clientX - startX + startLeft;

    if (x < 0) {
      x = 0;
    } else if (x + plane.offsetWidth > gameAreaRect.width) {
      x = gameAreaRect.width - plane.offsetWidth;
    }

    plane.style.left = x + "px";
  });

  window.addEventListener("touchend", function () {
    mouseDown = false;
  });
}

/**
 * =================================================================================================
 *  Check if the player has hit an object
 * =================================================================================================
 */

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
      gameWin(gameInterval, score); // Win the game when a collision occurs
    }
  });
}

/**
 * =================================================================================================
 *  START THE GAME
 * =================================================================================================
 */

function startGame() {
  // Change the plane's class to avoid slide issues
  const plane = document.getElementById("plane");
  plane.classList.remove("plane");
  plane.classList.add("plane-game");

  // Set the plane initial position in center
  const gameArea = document.querySelector(".game");
  const gameAreaRect = gameArea.getBoundingClientRect();
  plane.style.left = gameAreaRect.width / 2 - plane.offsetWidth / 2 + "px";

  // Let the objects fall within the gaming time
  gameInterval = setInterval(function () {
    objectsComeToPlayer();
    checkCollision();
  }, selectedPlaneSpeedInMs);

  // Let the plane move
  movePlane();

  // Increase score per second
  setInterval(function () {
    score += selectedPlaneScoreIncrement;
  }, 1000);

  // Start the timer
  let timerValue = 0;
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(function () {
    timerValue++;
    timerElement.textContent = timerValue;
  }, 1000);
}
