import knex from "knex"; // Импортируем библиотеку Knex для работы с базой данных.

export const orm = knex({
  client: "sqlite3", // Устанавливаем клиент SQLite3 для Knex.
  connection: {
    filename: "src/backend/assets/sqlite.db", // Указываем путь к файлу базы данных.
  },
  useNullAsDefault: true, // Указываем Knex использовать NULL по умолчанию для столбцов.
});
