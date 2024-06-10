function init() {
  getUserStats();
}

async function getUserStats() {
  const res = await fetch("/userStats");

  // in data zit in de alle stats van de gebruiker
  const data = await res.json();
}

init();
