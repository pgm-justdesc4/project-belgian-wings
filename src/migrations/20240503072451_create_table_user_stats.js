const tableName = "user_stats";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.integer("xp").notNullable().defaultTo(0);
    table.string("level").notNullable().defaultTo(1);
    table.string("rank").notNullable().defaultTo("recruit");
    table.string("rank_image").notNullable().defaultTo("recruit.png");
    table.string("avatar").notNullable().defaultTo("avatar1.png");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
