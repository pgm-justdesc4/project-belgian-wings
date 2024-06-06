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
  buildGame(timerInterval, difficulty);
}

function buildGame(timer, difficulty) {
  let gameGrid = document.querySelector(".game-grid");

  if (difficulty == 1) {
    gameGrid.classList.add("easy");
    buildEasyGame();
    eventListener(timer, difficulty);
  } else if (difficulty == 2) {
    gameGrid.classList.add("medium");
    buildMediumGame();
    eventListener(timer, difficulty);
  } else {
    gameGrid.classList.add("hard");
    buildHardGame();
    eventListener(timer, difficulty);
  }
}

function eventListener(timer, difficulty) {
  let gameGrid = document.querySelector(".game-grid");
  let activeColor = "";
  let startingColorId = null;
  let finishedColors = [];
  let lastClicked = null;
  let isLastClickedCorrect = false;
  function switchColor(activeColor) {
    if (activeColor !== "") {
      document.querySelectorAll(".game-grid-child").forEach((child) => {
        if (child.children.length) {
          if (child.children[0].classList.contains(`mini-${activeColor}`)) {
            child.children[0].remove();
          }
        }
      });
    }
  }
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
        switchColor(activeColor);
        activeColor = "red";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("blue") &&
        !finishedColors.includes("blue") &&
        e.target.id !== startingColorId
      ) {
        switchColor(activeColor);
        activeColor = "blue";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("green") &&
        !finishedColors.includes("green") &&
        e.target.id !== startingColorId
      ) {
        switchColor(activeColor);
        activeColor = "green";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("yellow") &&
        !finishedColors.includes("yellow") &&
        e.target.id !== startingColorId
      ) {
        switchColor(activeColor);
        activeColor = "yellow";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("purple") &&
        !finishedColors.includes("purple") &&
        e.target.id !== startingColorId
      ) {
        switchColor(activeColor);
        activeColor = "purple";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("orange") &&
        !finishedColors.includes("orange") &&
        e.target.id !== startingColorId
      ) {
        switchColor(activeColor);
        activeColor = "orange";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("brown") &&
        !finishedColors.includes("brown") &&
        e.target.id !== startingColorId
      ) {
        switchColor(activeColor);
        activeColor = "brown";
        startingColorId = e.target.id;
      } else if (
        e.target.classList.contains("pink") &&
        !finishedColors.includes("pink") &&
        e.target.id !== startingColorId
      ) {
        switchColor(activeColor);
        activeColor = "pink";
        startingColorId = e.target.id;
      }
    }
    let isInUse = false;
    if (
      e.target.children.length &&
      !e.target.classList.contains("dot") &&
      !e.target.children[0].classList.contains(`mini-${activeColor}`)
    ) {
      if (!finishedColors.includes("red")) {
        isInUse = true;
        e.target.children[0].classList.remove("mini-red");
      }
      if (!finishedColors.includes("blue")) {
        isInUse = true;
        e.target.children[0].classList.remove("mini-blue");
      }
      if (!finishedColors.includes("green")) {
        isInUse = true;
        e.target.children[0].classList.remove("mini-green");
      }
      if (!finishedColors.includes("yellow")) {
        isInUse = true;
        e.target.children[0].classList.remove("mini-yellow");
      }
      if (!finishedColors.includes("purple")) {
        isInUse = true;
        e.target.children[0].classList.remove("mini-purple");
      }
      if (!finishedColors.includes("orange")) {
        isInUse = true;
        e.target.children[0].classList.remove("mini-orange");
      }
      if (!finishedColors.includes("brown")) {
        isInUse = true;
        e.target.children[0].classList.remove("mini-brown");
      }
      if (!finishedColors.includes("pink")) {
        isInUse = true;
        e.target.children[0].classList.remove("mini-pink");
      }
      if (isInUse) {
        isInUse = false;
        console.log(
          "failed to remove class since color is already finished",
          finishedColors
        );
      } else {
        e.target.children[0].classList.add(`mini-${activeColor}`);
        console.log("removing class", finishedColors);
      }
      isLastClickedCorrect = false;
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
          activeColor = "";
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
      const timeLeft =
        60 - parseInt(document.getElementById("timer").textContent);
      if (difficulty == 3) {
        const score = timeLeft * 10 * difficulty * 2;
        gameWin(timer, score);
      } else {
        const score = timeLeft * 10 * difficulty;
        gameWin(timer, score);
      }
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
      "blue",
      null,
      null,
      "blue",
      null,
      "green",
      null,
      null,
      null,
      null,
      "yellow",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "red",
      null,
      null,
      null,
      null,
      "red",
      null,
      null,
      null,
      "brown",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "green",
      "yellow",
      "purple",
      null,
      "brown",
      "orange",
      null,
      "purple",
      null,
      null,
      null,
      "orange",
      "pink",
      null,
      null,
      null,
      "pink",
    ],
  };

  //example grid
  const gridDisplayed = [
    [null, null, null, "blue", null, null, "blue"],
    [null, "green", null, null, null, null, "yellow"],
    [null, null, null, null, null, null, null],
    ["red", null, null, null, null, "red", null],
    [null, null, "brown", null, null, null, null],
    [null, null, null, null, "green", "yellow", "purple"],
    [null, "brown", "orange", null, "purple", null, null],
    [null, "orange", "pink", null, null, null, "pink"],
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
