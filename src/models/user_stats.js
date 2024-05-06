import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// import related models

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
      },
    };
  }
}
