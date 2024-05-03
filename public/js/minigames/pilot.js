let score = 0; // Initialize score
let gameInterval; // Initialize gameInterval

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
function choosePlane(planeId) {
  const plane = document.getElementById(planeId);
  // Set the chosen plane as active
  plane.classList.add("active");
}

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

  let leftPos = Math.random() * gameAreaRect.width;
  if (leftPos < 0) {
    leftPos = 0;
  } else if (leftPos > gameAreaRect.width - object.offsetWidth) {
    leftPos = gameAreaRect.width - object.offsetWidth;
  }

  object.style.left = leftPos + "px";
  object.style.animationDuration = "1s";
  objects.appendChild(object);
  object.addEventListener("animationend", function () {
    objects.removeChild(object);
  });
  checkCollision();
}

/**
 * =================================================================================================
 *  Able to move the plane left and right (use the mouse to move the plane).
 * =================================================================================================
 */
function movePlane() {
  let mouseDown = false;
  let startX;

  // Get the plane and game area elements
  const plane = document.getElementById("plane");
  const gameArea = document.querySelector(".game");

  // Add event listeners
  plane.addEventListener("mousedown", function (e) {
    mouseDown = true;
    startX = e.clientX - plane.getBoundingClientRect().left;
  });

  window.addEventListener("mousemove", function (e) {
    if (!mouseDown) return;
    e.preventDefault();
    let x = e.clientX - startX;
    let gameAreaRect = gameArea.getBoundingClientRect();

    // Constrain the plane within the game area
    if (x < gameAreaRect.left) {
      x = gameAreaRect.left;
    } else if (x > gameAreaRect.right - plane.offsetWidth) {
      x = gameAreaRect.right - plane.offsetWidth;
    }

    plane.style.left = x - gameAreaRect.left + "px";
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

function gameOver() {
  // Stop the game and show the score
  clearInterval(gameInterval);
  alert("Game over! Your score is: " + score);
}

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

/**
 * =================================================================================================
 *  Set game win + add scores to the players account.
 * =================================================================================================
 */
function gameWin() {
  // Stop the game and show the score
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

  // Choose a plane to play with
  choosePlane("plane");

  // Let the objects fall
  gameInterval = setInterval(function () {
    objectsComeToPlayer();
    checkCollision();
  }, 1000);

  // Let the plane move
  movePlane();

  // Make the timer work + add score per second
  let timerValue = 30;
  const timerElement = document.getElementById("timer");
  const timerInterval = setInterval(function () {
    timerValue--;
    score += 15;
    timerElement.textContent = timerValue;
    if (timerValue <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

startGame();
