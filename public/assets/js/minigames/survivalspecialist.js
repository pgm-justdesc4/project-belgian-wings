/**
 * **Minigame: SERE (Survival Specialist)**

### STAP 1: Selecteer de missie

- Bied een keuzemenu aan waarin de speler de missie kan kiezen. Elke missie heeft verschillende overlevingsomstandigheden en vereisten.
  - Voorbeeldmissies: "Jungle Overleven", "Woestijn Vlucht", "Bergachtige Beklimming", "Arctische Verkenning".

### STAP 2: Toon de beschikbare items voor de survival kit

- Geef de speler een lijst met beschikbare items. Items kunnen onder andere zijn: eetbare planten, kompas, waterzuiveringspillen, lucifers, nooddeken, touw, mes, etc.

### STAP 3: Sleep en plaats de items in de survival kit

- Laat de speler de items naar een overlevingskit slepen en neerzetten. Er moet een vooraf bepaalde ruimte of aantal slots zijn waar de items geplaatst kunnen worden.
  - Zorg voor drag-and-drop functionaliteit met visuele feedback wanneer een item correct geplaatst wordt.

### STAP 4: Controleer de kit en beoordeel de effectiviteit

- Nadat de speler de kit heeft samengesteld, moet hij deze opslaan en laten beoordelen.
  - Implementeren van een beoordelingssysteem dat de effectiviteit van de kit beoordeelt op basis van de gekozen missie en de geselecteerde items.

### STAP 5: Scenario simulatie

- Speel een korte simulatie af waarin de effectiviteit van de kit in de gekozen missieomgeving wordt getest. Deze simulatie laat zien hoe goed de items bijdragen aan het overleven in het scenario.

### STAP 6: Feedback en score

- Geef de speler feedback op basis van de effectiviteit van de samengestelde kit.
  - Geef een score en suggesties voor verbetering.
  - Laat de speler weten welke items goed hebben gewerkt en welke items ontbraken of beter gekozen hadden kunnen worden.

### STAP 7: Opslaan en opnieuw gebruiken van kits

- Geef de speler de mogelijkheid om de samengestelde kits op te slaan en een naam te geven.
  - Bied een menu waar opgeslagen kits kunnen worden bekeken, opnieuw geladen en aangepast voor toekomstige missies.

### STAP 8: Geleidelijk toenemende moeilijkheidsgraad

- Naarmate de speler missies voltooit, bied je moeilijkere scenario's aan waarbij de keuze van items en de volgorde steeds belangrijker worden.
  - Voorbeeld van moeilijkere scenario's: beperkte tijd om de kit samen te stellen, meer complexe omgevingen met extra uitdagingen, etc.

### STAP 9: Herhaling en verbetering

- Moedig de speler aan om missies opnieuw te spelen en de samenstelling van de kit te verbeteren op basis van eerdere feedback en scores.

### Voorbeeld Scenario

#### Missie: Jungle Overleven

- **Items**: Een lijst met items zoals machete, waterzuiveringspillen, nooddeken, insectenwerend middel, enz.
- **Simulatie**: De simulatie laat de speler zien hoe goed hij kan overleven met de geselecteerde items, bijvoorbeeld hoe lang hij zonder water kan, hoe snel hij zich door de jungle kan bewegen, etc.
- **Feedback**: "Je hebt goed gekozen met de machete en het insectenwerend middel, maar je had een kompas nodig om de juiste richting te vinden."

 */

/**
 * =================================================================================================
 * ### STAP 1: Selecteer de missie

    - Bied een keuzemenu aan waarin de speler de missie kan kiezen. Elke missie heeft verschillende overlevingsomstandigheden en vereisten.
    - Voorbeeldmissies: "Jungle Overleven", "Woestijn Vlucht", "Bergachtige Beklimming", "Arctische Verkenning".
 * =================================================================================================
 */

let missionList = document.getElementById("mission-list");

const missions = [
  {
    name: "Luchtmacht Training",
    conditions:
      "Je bent gedropt in een onbekend terrein voor een intensieve trainingssessie. Je moet navigeren door het terrein en jezelf beschermen tegen de elementen.",
    requirements: ["zakmes", "plijsters", "slaapzak", "schaar en naad"],
  },
  {
    name: "Nachtmissie",
    conditions:
      "Het is nacht en je moet een operatie uitvoeren in volledige duisternis. Je moet je weg vinden en jezelf beschermen tegen mogelijke gevaren.",
    requirements: ["zaklamp", "kompas", "slaapzak", "zakmes"],
  },
  {
    name: "Overlevingsmissie",
    conditions:
      "Je bent gestrand in vijandig terrein. Je moet overleven met wat je hebt en hulp zoeken.",
    requirements: ["zakmes", "plijsters", "touw", "waterfilter"],
  },
  {
    name: "Verkenning",
    conditions:
      "Je moet een onbekend terrein verkennen. Het is belangrijk om je omgeving goed te observeren en mogelijke gevaren te identificeren.",
    requirements: ["kompas", "vergrootglas", "zonnebril", "zaklamp"],
  },
];

// Display mission selection menu
function displayMissionSelection() {
  missions.forEach((mission, index) => {
    let missionItem = document.createElement("li");
    missionItem.textContent = mission.name;
    missionItem.setAttribute("data-index", index);
    missionItem.addEventListener("click", selectMission);
    missionList.appendChild(missionItem);
  });
}

displayMissionSelection();

// Select a mission from the list
function selectMission(event) {
  let missionIndex = event.target.getAttribute("data-index");
  let selectedMission = missions[missionIndex];
  missionList.classList.add("close");
  console.log("Selected Mission: ", selectedMission);
}

/**
 * =================================================================================================
 * ### STAP 2: Toon de beschikbare items voor de survival kit
 * =================================================================================================
 */

//HIER BEZIG
