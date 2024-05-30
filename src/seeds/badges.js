const tableName = "badges";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    {
      id: 1,
      name: "First Win",
      image: "first_win.png",
      description: "You won your first game!",
      user_stats_id: 1,
    },
    {
      id: 2,
      name: "Speedrunner",
      image: "speedrunner.png",
      description: "You completed a game in less than 10 seconds!",
      user_stats_id: 1,
    },
    {
      id: 3,
      name: "Speedrunner",
      image: "speedrunner.png",
      description: "You completed a game in less than 10 seconds!",
      user_stats_id: 2,
    },
  ]);
};

export { seed };
