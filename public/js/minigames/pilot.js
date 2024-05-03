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
  // Create a new object
  const object = document.createElement("div");
  object.classList.add("object");
  // Set the object's initial position and speed
  object.style.left = Math.random() * window.innerWidth + "px";
  object.style.animationDuration = "2s";
  // Add the object to the game
  objects.appendChild(object);
  // Remove the object when it reaches the end
  object.addEventListener("animationend", function () {
    objects.removeChild(object);
  });
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
 *  START THE GAME
 * =================================================================================================
 */
function startGame() {
  setGameLocationBackground(gameLocation);
  choosePlane("plane");
  gameInterval = setInterval(objectsComeToPlayer, 1000);
  movePlane();

  // Start the timer
  let timerValue = 30;
  const timerElement = document.getElementById("timer");
  const timerInterval = setInterval(function () {
    timerValue--;
    timerElement.textContent = timerValue;
    if (timerValue <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  // Set a 30-second timer
  setTimeout(function () {
    clearInterval(gameInterval); // Stop creating new objects
    clearInterval(timerInterval); // Stop the timer
    // Check if the player has hit an object
    if (score > 0) {
      gameWin();
    } else {
      gameOver();
    }
  }, 30000); // 30000 milliseconds = 30 seconds
}

startGame();
