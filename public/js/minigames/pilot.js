/**
 * =================================================================================================
 *  Set game location background
 * =================================================================================================
 */
const gameLocation = "Belgium";
const locations = [
  {
    name: "Belgium",
    backgroundImage: "",
  },
];

let score = 0; // Initialize score
let gameInterval; // Initialize gameInterval

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
 *  Let objects come to the player (30 seconds game)
 * =================================================================================================
 */
function objectsComeToPlayer() {
  const objects = document.getElementById("objects");
  const object = document.createElement("div");
  object.classList.add("object");
  object.style.left = Math.random() * window.innerWidth + "px";
  object.style.animationDuration = "1s";
  objects.appendChild(object);
  object.addEventListener("animationend", function () {
    objects.removeChild(object);
  });
  checkCollision(); // Check for collision after each object is created
}

/**
 * =================================================================================================
 *  Able to move the plane left and right (use the mouse to move the plane).
 * =================================================================================================
 */
function movePlane() {
  let mouseDown = false;
  let startX;

  // Get the plane element
  const plane = document.getElementById("plane");

  // Add event listeners
  plane.addEventListener("mousedown", function (e) {
    mouseDown = true;
    startX = e.clientX - plane.getBoundingClientRect().left;
  });

  window.addEventListener("mousemove", function (e) {
    if (!mouseDown) return;
    e.preventDefault();
    let x = e.clientX - startX;
    plane.style.left = x + "px";
  });

  window.addEventListener("mouseup", function () {
    mouseDown = false;
  });
}

/**
 * =================================================================================================
 *  If the player hits an object, the game is over. The player can see the score and the best score.
 * =================================================================================================
 */
function gameOver() {
  // Stop the game and show the score
  clearInterval(gameInterval);
  alert("Game over! Your score is: " + score);
}

/**
 * =================================================================================================
 *  If the player can avoid all objects for 30 seconds, the player wins. The player can see the score and the best score.
 * =================================================================================================
 */
function gameWin() {
  // Stop the game and show the score
  clearInterval(gameInterval);
  alert("You win! Your score is: " + score);
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
      gameOver();
    }
  });
}

/**
 * =================================================================================================
 *  START THE GAME
 * =================================================================================================
 */
function startGame() {
  setGameLocationBackground(gameLocation);
  choosePlane("plane");
  gameInterval = setInterval(function () {
    objectsComeToPlayer();
    checkCollision();
  }, 1000);
  movePlane();
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
  setTimeout(function () {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    if (score > 0) {
      gameWin();
    } else {
      gameOver();
    }
  }, 30000);
}

startGame();
