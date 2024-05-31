const tableName = "user_stats";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.integer("xp").notNullable().defaultTo(0);
    table.string("level").notNullable().defaultTo(1);
    table.string("rank").notNullable().defaultTo("recruit");
    table.string("rank_image").notNullable().defaultTo("recruit.png");
    table.string("avatar").notNullable().defaultTo("avatar1.png");
    table.integer("speedrun").notNullable().defaultTo(0);
    table.integer("wins").notNullable().defaultTo(0);
    table.integer("losses").notNullable().defaultTo(0);
    table.integer("badges_id").unsigned().notNullable();
    table.foreign("badges_id").references("badges.id");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
