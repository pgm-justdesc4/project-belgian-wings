const tableName = "users";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    {
      id: 1,
      user_stats_id: 1,
      username: "Jeffke",
      name: "Jeff",
      lastName: "Jefferson",
      birthdate: "12/08/1996",
      email: "jeff.jefferson@gmail.com",
      password: "123",
    },
    {
      id: 2,
      user_stats_id: 2,
      username: "Johnke",
      name: "John",
      lastName: "Johnson",
      birthdate: "25/10/2000",
      email: "John.Johnson@gmail.com",
      password: "123",
    },
  ]);
};

export { seed };
