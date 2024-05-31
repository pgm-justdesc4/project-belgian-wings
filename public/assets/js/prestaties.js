function init() {
  getUserStats();
  amountOfBadges();
}

async function getUserStats() {
  const res = await fetch("/user_stats");

  // in data zit in de alle stats van de gebruiker
  const data = await res.json();
}

async function amountOfBadges() {
  const res = await fetch("/badges");

  // in data zit in een array van badges die de gebruiker heeft
  const data = await res.json();
}

init();
