const tableName = "user_stats";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    {
      id: 1,
      xp: 100,
      level: "1",
      rank: "recruit",
      rank_image: "recruit.png",
      avatar: "avatar1.png",
    },
    {
      id: 2,
      xp: 200,
      level: "10",
      rank: "soldier",
      rank_image: "soldier.png",
      avatar: "avatar2.png",
    },
  ]);
};

export { seed };
