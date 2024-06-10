const tableName = "badges";

export function up(knex) {
  return knex.schema.dropTable(tableName);
}

export function down(knex) {
}
