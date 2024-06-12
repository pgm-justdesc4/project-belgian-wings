/**
 * =================================================================================================
 * SELECT MISSION
 * =================================================================================================
 */

let missionList = document.getElementById("missionList");

const missions = [
  {
    name: "Luchtmacht Training",
    conditions:
      "Je bent gedropt in een onbekend terrein voor een intensieve trainingssessie. Je moet navigeren door het terrein en jezelf beschermen tegen de elementen.",
    requirements: ["knife", "plasters", "sleepingbag", "scissorSeam"],
  },
  {
    name: "Nachtmissie",
    conditions:
      "Het is nacht en je moet een operatie uitvoeren in volledige duisternis. Je moet je weg vinden en jezelf beschermen tegen mogelijke gevaren.",
    requirements: ["flashlight", "compass", "sleepingbag", "knife"],
  },
  {
    name: "Overlevingsmissie",
    conditions:
      "Je bent gestrand in vijandig terrein. Je moet overleven met wat je hebt en hulp zoeken.",
    requirements: ["knife", "plasters", "rope", "waterfilter"],
  },
  {
    name: "Verkenning",
    conditions:
      "Je moet een onbekend terrein verkennen. Het is belangrijk om je omgeving goed te observeren en mogelijke gevaren te identificeren.",
    requirements: ["compass", "magnifyinglass", "sunglasses", "flashlight"],
  },
];

// Display mission selection menu
function displayMissionSelection() {
  missions.forEach((mission, index) => {
    let missionItem = document.createElement("li");
    missionItem.textContent = mission.name;
    missionItem.setAttribute("data-id", index + 1);
    missionItem.addEventListener("click", selectMission);
    missionList.appendChild(missionItem);
  });
}

displayMissionSelection();

let selectedMission;

function selectMission(event) {
  let missionIndex = event.target.getAttribute("data-id") - 1;
  selectedMission = missions[missionIndex];

  // Display the mission conditions
  const missionCondition = document.getElementById("missionCondition");
  missionCondition.textContent = selectedMission.conditions;

  // Create a button to start the mission
  const startButton = document.getElementById("startButton");
  startButton.style.display = "block";
  startButton.addEventListener("click", function () {
    console.log("Mission started:", selectedMission);
    const $overlay = document.getElementById("overlay");
    $overlay.style.display = "none";
  });
}

/**
 * =================================================================================================
 * GAME
 * =================================================================================================
 */

const $itemsGrid = document.getElementById("itemsGrid");
const $itemChecker = document.getElementById("itemChecker");

let score = 0;
let wrongClicks = 0;

$itemsGrid.addEventListener("click", function (event) {
  if (event.target.tagName === "IMG") {
    // Move the item to the itemChecker
    let item = event.target.parentNode;
    $itemChecker.appendChild(item);

    // Check if the item is in the requirements of the selected mission
    if (selectedMission.requirements.includes(item.id)) {
      let correctItemsDivs = Array.from(
        document.querySelectorAll(".correct-item")
      );
      let emptyDiv = correctItemsDivs.find((div) => !div.hasChildNodes());
      if (emptyDiv) {
        emptyDiv.appendChild(item);
      }
      $itemChecker.style.backgroundColor = "green";
      setTimeout(function () {
        $itemChecker.style.backgroundColor = "";
      }, 3000);

      // Check if all the items are filled in the correct-items
      let areAllItemsFilled = correctItemsDivs.every((div) =>
        div.hasChildNodes()
      );
      if (areAllItemsFilled) {
        score += 450;
        gameWin(null, score);
      }
    } else {
      $itemsGrid.appendChild(item);
      $itemChecker.style.backgroundColor = "red";
      setTimeout(function () {
        $itemChecker.style.backgroundColor = "";
      }, 3000);

      // Game over if the player makes 3 wrong clicks
      wrongClicks++;
      if (wrongClicks === 3) {
        gameOver(null);
      }
    }
  }
});
