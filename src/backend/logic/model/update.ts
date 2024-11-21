import { orm } from "@/backend/middleware/orm";
import { TUpdate } from "./types";

/**
 * Функция модели для обновления записи.
 * @param table - Название таблицы в базе данных.
 * @returns Функция для обновления записи.
 */
export const modelPut = <T>(table: string) => {
  return async ({ id, payload }: TUpdate<T>): Promise<T | null> => {
    await orm(table).where({ id }).update(payload); // Обновляем запись с указанным id.
    return orm(table).where({ id }).first(); // Возвращаем обновленную запись.
  };
};
