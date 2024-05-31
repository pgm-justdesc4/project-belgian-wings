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
      avatar: "avatar-1.png",
      speedrun: 50,
      wins: 1,
      losses: 1,
      badges_id: 1,
    },
    {
      id: 2,
      xp: 200,
      level: "10",
      rank: "soldier",
      rank_image: "soldier.png",
      avatar: "avatar-2.png",
      speedrun: 7,
      wins: 10,
      losses: 10,
      badges_id: 2,
    },
  ]);
};

export { seed };
