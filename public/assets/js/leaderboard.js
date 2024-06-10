async function getUserStats() {
  let userStats = await fetch("/allUserStats");
  userStats = await userStats.json();
  return userStats;
}

async function getUsers() {
  let users = await fetch("/allUsers");
  users = await users.json();
  return users;
}

async function makeLeaderboard() {
  let userStats = await getUserStats();
  let users = await getUsers();

  // Combine userStats and users into a single array
  let combined = users.map((user) => ({
    ...user,
    ...userStats.find((stat) => stat.id === user.user_stats_id),
  }));

  // Filter out guest accounts
  combined = combined.filter((user) => user.birthdate !== "guest");

  // Sort by level
  combined.sort((a, b) => b.level - a.level);

  // Create table
  let table = `<table><tr><th class="table-top">Top</th><th class="table-top">Nickname</th><th class="table-top">Level</th><th class="table-top">Rank</th></tr>`;
  for (let i = 0; i < combined.length; i++) {
    let user = combined[i];
    table += `<tr><td>${i + 1}</td><td>${user.username}</td><td>${
      user.level
    }</td><td class="rank">${user.rank}</td></tr>`;
  }
  table += "</table>";

  document.getElementById("leaderboard").innerHTML = table;
}

makeLeaderboard();
