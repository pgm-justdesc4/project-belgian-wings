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
    // The x2 value at 1% level is 300 and at 99% level is 400
    // So the range of x2 is 100 (400 - 300)
    // We map the level percentage (from 1 to 99) to this range (300 to 400)
    return 300 + (levelPercentage - 1) * (100 / 98);
  }

  function calculateLevelPercentage(userXp, userLevel) {
    const initialXp = 1000;
    const growthFactor = 1.2;

    let xpToNextLevel = initialXp * Math.pow(growthFactor, userLevel - 1);
    let xpGainedTowardsNextLevel =
      userXp - initialXp * Math.pow(growthFactor, userLevel - 2);

    return (xpGainedTowardsNextLevel / xpToNextLevel) * 100;
  }

  let levelPercentage = calculateLevelPercentage(userStats.xp, userStats.level);

  let xpBar = document.getElementById("xpBar");
  xpBar.setAttribute("x2", calculateX2(levelPercentage));
}

init();
