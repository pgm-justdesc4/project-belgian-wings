function init() {
  chooseDifficulty();
}

function chooseDifficulty() {
  let difficulty = document.querySelectorAll(".difficulty");

  difficulty.forEach((element) => {
    element.addEventListener("click", () => {
      let difficulty = element.getAttribute("data-diff");
      console.log(difficulty);
      startGame(difficulty);
      document.querySelector(".choose-difficulty").style.display = "none";
      document.querySelector(".timer").style.display = "block";
    });
  });
}

function startGame(difficulty) {
  let game = document.querySelector(".game");
  game.classList.add("active");
  let timerInterval = timer();
  const gameInterval = buildGame(difficulty);
}

function buildGame(difficulty) {
  let gameGrid = document.querySelector(".game-grid");

  if (difficulty == 1) {
    gameGrid.classList.add("easy");
    buildEasyGame();
    eventListener(difficulty);
  } else if (difficulty == 2) {
    gameGrid.classList.add("medium");
    buildMediumGame();
    eventListener(difficulty);
  } else {
    gameGrid.classList.add("hard");
    buildHardGame();
    eventListener(difficulty);
  }
}

function eventListener(difficulty) {
  let gameGrid = document.querySelector(".game-grid");
  let activeColor = "";
  let startingColorId = null;
  let finishedColors = [];
  let lastClicked = null;
  let isLastClickedCorrect = false;
  gameGrid.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains(activeColor) &&
      e.target.classList.contains("dot")
    ) {
      if (
        e.target.classList.contains("red") &&
        !finishedColors.includes("red") &&
        e.target.id !== startingColorId
      ) {
        activeColor = "red";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("blue") &&
        !finishedColors.includes("blue") &&
        e.target.id !== startingColorId
      ) {
        activeColor = "blue";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("green") &&
        !finishedColors.includes("green") &&
        e.target.id !== startingColorId
      ) {
        activeColor = "green";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("yellow") &&
        !finishedColors.includes("yellow") &&
        e.target.id !== startingColorId
      ) {
        activeColor = "yellow";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("purple") &&
        !finishedColors.includes("purple") &&
        e.target.id !== startingColorId
      ) {
        activeColor = "purple";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("orange") &&
        !finishedColors.includes("orange") &&
        e.target.id !== startingColorId
      ) {
        activeColor = "orange";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("brown") &&
        !finishedColors.includes("brown") &&
        e.target.id !== startingColorId
      ) {
        activeColor = "brown";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("pink") &&
        !finishedColors.includes("pink") &&
        e.target.id !== startingColorId
      ) {
        activeColor = "pink";
        startingColorId = e.target.id;
      }
    }
    if (
      e.target.children.length &&
      !e.target.classList.contains("dot") &&
      !e.target.children[0].classList.contains(`mini-${activeColor}`)
    ) {
      if (!finishedColors.includes("red"))
        e.target.children[0].classList.remove("mini-red");
      else if (!finishedColors.includes("blue"))
        e.target.children[0].classList.remove("mini-blue");
      else if (!finishedColors.includes("green"))
        e.target.children[0].classList.remove("mini-green");
      else if (!finishedColors.includes("yellow"))
        e.target.children[0].classList.remove("mini-yellow");
      else if (!finishedColors.includes("purple"))
        e.target.children[0].classList.remove("mini-purple");
      else if (!finishedColors.includes("orange"))
        e.target.children[0].classList.remove("mini-orange");
      else if (!finishedColors.includes("brown"))
        e.target.children[0].classList.remove("mini-brown");
      else if (!finishedColors.includes("pink"))
        e.target.children[0].classList.remove("mini-pink");
      else {
        isLastClickedCorrect = false;
      }
      e.target.children[0].classList.add(`mini-${activeColor}`);
      console.log("removing class", finishedColors);
    } else {
      isLastClickedCorrect = true;
    }

    if (!e.target.children.length) {
      let verticallyAdjacent = 0;
      if (difficulty == 1) {
        verticallyAdjacent = 5;
      } else if (difficulty == 2) {
        verticallyAdjacent = 6;
      } else {
        verticallyAdjacent = 7;
      }
      if (
        lastClicked - e.target.id == -1 ||
        lastClicked - e.target.id == 1 ||
        lastClicked - e.target.id == verticallyAdjacent ||
        lastClicked - e.target.id == -verticallyAdjacent
      ) {
        console.log(
          "valid move",
          isLastClickedCorrect,
          lastClicked,
          e.target.id,
          startingColorId
        );
        if (!e.target.classList.contains("dot")) {
          const gameGridChild = document.createElement("div");
          gameGridChild.classList.add(`mini-${activeColor}`);
          e.target.appendChild(gameGridChild);
        }
        if (isLastClickedCorrect) lastClicked = e.target.id;
        if (
          e.target.id !== startingColorId &&
          e.target.classList.contains(activeColor)
        ) {
          finishedColors.push(activeColor);
          console.log("finished a color");
        }
      }
    } else {
      lastClicked = e.target.id;
    }

    if (
      (difficulty == 1 && finishedColors.length == 4) ||
      (difficulty == 2 && finishedColors.length == 6) ||
      (difficulty == 3 && finishedColors.length == 8)
    ) {
      gameWin(null, 0);
    }
  });
}

function buildEasyGame() {
  let gameGrid = document.querySelector(".game-grid");
  //  gameColors = ["red", "blue", "green", "yellow"];
  const gridOptions = {
    1: [
      "red",
      null,
      null,
      null,
      null,
      "blue",
      null,
      null,
      "blue",
      "red",
      "green",
      "yellow",
      null,
      null,
      "yellow",
      null,
      null,
      null,
      null,
      "green",
    ],
  };
  let counter = 0;
  for (const grid of gridOptions[1]) {
    const gameGridChild = document.createElement("div");
    gameGridChild.classList.add("game-grid-child");
    if (grid) {
      const gameGridChildColor = document.createElement("div");
      gameGridChildColor.classList.add(grid);
      gameGridChildColor.classList.add("dot");
      gameGridChildColor.id = counter;
      gameGridChild.classList.add("dot");
      gameGridChild.classList.add(grid);
      gameGridChild.appendChild(gameGridChildColor);
    }
    gameGridChild.id = counter;
    gameGrid.appendChild(gameGridChild);
    counter++;
  }
}

function buildMediumGame() {
  let gameGrid = document.querySelector(".game-grid");
  //  gameColors = ["red", "blue", "green", "yellow", "purple", "orange"];
  const gridOptions = {
    1: [
      "purple",
      null,
      null,
      "red",
      null,
      null,
      null,
      "orange",
      null,
      "purple",
      "blue",
      null,
      null,
      "yellow",
      null,
      "yellow",
      null,
      null,
      null,
      "green",
      null,
      "blue",
      null,
      "red",
      null,
      "orange",
      null,
      null,
      null,
      "green",
    ],
  };
  let counter = 0;
  for (const grid of gridOptions[1]) {
    const gameGridChild = document.createElement("div");
    gameGridChild.classList.add("game-grid-child");
    if (grid) {
      const gameGridChildColor = document.createElement("div");
      gameGridChildColor.classList.add(grid);
      gameGridChildColor.classList.add("dot");
      gameGridChildColor.id = counter;
      gameGridChild.classList.add("dot");
      gameGridChild.classList.add(grid);
      gameGridChild.appendChild(gameGridChildColor);
    }
    gameGridChild.id = counter;
    gameGrid.appendChild(gameGridChild);
    counter++;
  }
}

function buildHardGame() {
  let gameGrid = document.querySelector(".game-grid");
  //  gameColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown"];
  const gridOptions = {
    1: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "yellow",
      "green",
      null,
      "green",
      null,
      "orange",
      "yellow",
      "red",
      "brown",
      "purple",
      null,
      null,
      null,
      null,
      "red",
      null,
      null,
      "pink",
      null,
      null,
      null,
      "blue",
      null,
      "brown",
      null,
      null,
      null,
      null,
      null,
      null,
      "purple",
      null,
      null,
      null,
      null,
      null,
      "brown",
      null,
      null,
      null,
      null,
      "orange",
      null,
      "pink",
      null,
      null,
      null,
      null,
      null,
    ],
  };

  test = [
    [null, null, null, null, null, null, null],
    ["yellow", "green", null, "green", null, "orange", "yellow"],
    ["red", "brown", "purple", null, null, null, null],
    ["red", null, null, "pink", null, null, null],
    ["blue", null, "brown", null, null, null, null],
    [null, null, "purple", null, null, null, null],
    [null, "brown", null, null, null, null, "orange"],
    [null, "pink", null, null, null, null, null],
  ];
  let counter = 0;
  for (const grid of gridOptions[1]) {
    const gameGridChild = document.createElement("div");
    gameGridChild.classList.add("game-grid-child");
    if (grid) {
      const gameGridChildColor = document.createElement("div");
      gameGridChildColor.classList.add(grid);
      gameGridChildColor.classList.add("dot");
      gameGridChildColor.id = counter;
      gameGridChild.classList.add("dot");
      gameGridChild.classList.add(grid);
      gameGridChild.appendChild(gameGridChildColor);
    }
    gameGridChild.id = counter;
    gameGrid.appendChild(gameGridChild);
    counter++;
  }
}

function timer() {
  let timerValue = 0;
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(function () {
    timerValue++;
    timerElement.textContent = timerValue;
    if (timerValue >= 60) {
      clearInterval(timerInterval);
      gameOver(null, 0);
    }
  }, 1000);

  return timerInterval;
}

init();
