const tableName = "users";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.integer("user_stats_id").notNullable();
    table.foreign("user_stats_id").references("id").inTable("user_stats");
    table.string("birthdate").notNullable();
    table.string("username").notNullable();
    table.string("name").notNullable();
    table.string("lastName").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.boolean("is_guest").notNullable().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
