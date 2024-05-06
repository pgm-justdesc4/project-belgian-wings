import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import UserStats from "./user_stats.js";

// define the User model
class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "lastName", "email", "password"],
      properties: {
        id: { type: "integer" },
        user_stats_id: { type: "integer" },
        firstname: { type: "string", minLength: 1, maxLength: 255 },
        lastname: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      user_stats: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserStats,
        join: {
          from: "users.user_stats_id",
          to: "user_stats.id",
        },
      },
    };
  }
}

export default User;
