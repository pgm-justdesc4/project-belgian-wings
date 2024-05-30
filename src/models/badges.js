import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// import related models
import userStats from "./user_stats.js";

export default class tasks extends Model {
  static get tableName() {
    return "badges";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        image: { type: "string" },
        description: { type: "string" },
        user_stats_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      badges: {
        relation: Model.BelongsToOneRelation,
        modelClass: userStats,
        join: {
          from: "badges.user_stats_id",
          to: "user_stats.id",
        },
      },
    };
  }
}
