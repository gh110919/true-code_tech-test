import { v4 } from "uuid";
import { TCreate } from "./types";
import { orm } from "../../middleware/orm";

/**
 * Функция модели для создания записей.
 * @param table - Название таблицы в базе данных.
 * @returns Функция для создания новых записей.
 */
export const modelSet = <T>(table: string) => {
  return async ({ payload }: TCreate<T[]>): Promise<T[]> => {
    const created_at = orm.fn.now();
    const records = payload.map((item) => ({
      ...item,
      id: v4(), // Генерируем уникальный идентификатор для каждой новой записи.
      created_at,
    }));

    await orm(table).insert(records); // Вставляем новые записи в таблицу базы данных.
    return await orm(table).whereIn(
      "id",
      records.map(({ id }) => id)
    ); // Возвращаем вставленные записи.
  };
};
