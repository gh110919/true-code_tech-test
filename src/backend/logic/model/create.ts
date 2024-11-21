import { orm } from "@/backend/middleware/orm";
import { v4 } from "uuid";
import { TCreate } from "./types";

/**
 * Функция модели для создания записи.
 * @param table - Название таблицы в базе данных.
 * @returns Функция для создания новой записи.
 */
export const modelSet = <T>(table: string) => {
  return async ({ payload }: TCreate<T>): Promise<T> => {
    const id = v4(); // Генерируем уникальный идентификатор для новой записи.
    await orm(table).insert({ ...payload, id }); // Вставляем новую запись в таблицу базы данных.
    return await orm(table).where({ id }).first(); // Возвращаем вставленную запись.
  };
};
