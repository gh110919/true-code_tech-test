import { orm } from "@/backend/middleware/orm";
import { TDelete } from "./types";

/**
 * Функция модели для удаления записи.
 * @param table - Название таблицы в базе данных.
 * @returns Функция для удаления записи.
 */
export const modelCut = <T>(table: string) => {
  return async ({ id }: TDelete): Promise<T | null> => {
    const item = await orm(table).where({ id }).first(); // Находим запись с указанным id.
    await orm(table).where({ id }).delete(); // Удаляем найденную запись.
    return item; // Возвращаем удаленную запись.
  };
};
