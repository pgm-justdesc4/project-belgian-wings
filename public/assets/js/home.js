function init() {
  activeAvatar();
}

async function activeAvatar() {
  let userStats = await fetch("/userStats");
  userStats = await userStats.json();
  // console.log(userStats);
  document.getElementById("avatar").src = `/assets/images/${userStats.avatar}`;

  let user = await fetch("/user");
  user = await user.json();
  document.getElementById("user").innerHTML = user.username;
  document.getElementById("userOverlay").innerHTML = user.username;

  /*================= 
  XP BAR FOR USER 
  =================*/
  function calculateX2(levelPercentage) {
    // The x2 value at 0% level is 100 and at 100% level is 400
    // So the range of x2 is 300 (400 - 100)
    // We map the level percentage (from 0 to 100) to this range (100 to 400)
    return 100 + (levelPercentage / 100) * 300;
  }

  function calculateLevelPercentage(userXp, userLevel) {
    const initialXp = 1000;
    const growthFactor = 1.2;

    let xpToNextLevel = initialXp * Math.pow(growthFactor, userLevel);

    return (userXp / xpToNextLevel) * 100;
  }

  let levelPercentage = calculateLevelPercentage(userStats.xp, userStats.level);

  let xpBar = document.getElementById("xpBar");
  xpBar.setAttribute("x2", calculateX2(levelPercentage));
}

init();
