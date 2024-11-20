import knex from "knex";

export const orm = knex({
  client: "sqlite3",
  connection: {
    filename: "src/backend/assets/sqlite.db",
  },
  useNullAsDefault: true,
});
