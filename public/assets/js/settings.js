function init() {
  activeAvatar();
}

async function activeAvatar() {
  let userStats = await fetch("/userStats");
  userStats = await userStats.json();
  console.log(userStats.badges);
  // for (const badge of userStats.badges) {
  //   console.log(badge);
  // }
  document.getElementById("avatar").src = `/assets/images/${userStats.avatar}`;

  let user = await fetch("/user");
  user = await user.json();
  document.getElementById("firstname").value = user.username;
}

init();
