function init() {
  activeAvatar();
}

async function activeAvatar() {
  let userStats = await fetch("/userStats");
  userStats = await userStats.json();
  document.getElementById("avatar").src = `/assets/images/${userStats.avatar}`;

  let user = await fetch("/user");
  user = await user.json();
  document.getElementById("firstname").value = user.username;
}

init();
