function init() {
  activeAvatar();
}

async function activeAvatar() {
  let user = await fetch("/userStats");
  user = await user.json();
  document.getElementById("avatar").src = `/assets/images/${user.avatar}`;
}

init();
