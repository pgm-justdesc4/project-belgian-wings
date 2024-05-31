const tableName = "badges";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("image").notNullable();
    table.string("description").notNullable();
    table.integer("user_stats_id").unsigned().notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
