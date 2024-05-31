import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// import related models
import badges from "./badges.js";

export default class tasks extends Model {
  static get tableName() {
    return "user_stats";
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
        xp: { type: "integer" },
        level: { type: "integer" },
        rank: { type: "string" },
        rank_image: { type: "string" },
        avatar: { type: "string" },
        speedrun: { type: "integer" },
        wins: { type: "integer" },
        losses: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      badges: {
        relation: Model.HasManyRelation,
        modelClass: badges,
        join: {
          from: "user_stats.id",
          to: "badges.user_stats_id",
        },
      },
    };
  }
}
