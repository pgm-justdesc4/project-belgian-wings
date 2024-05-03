const tableName = "user_stats";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.integer("xp").notNullable();
    table.string("level").notNullable();
    table.string("rank").notNullable();
    table.string("rank_image").notNullable();
    table.string("avatar").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
