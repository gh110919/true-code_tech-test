import endpoints from "../assets/endpoints.json"; // Импортируем JSON-файл с точками API.
import migrate from "../assets/migrate.json"; // Импортируем JSON-файл с данными для миграции.

export type Files = {
  endpoints: typeof endpoints; // Определяем тип данных для endpoints.
  migrate: typeof migrate; // Определяем тип данных для migrate.
};

export const imports: Files = {
  endpoints, // Экспортируем точки API.
  migrate, // Экспортируем данные для миграции.
};
