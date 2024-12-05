import { TCreate, TRead, TReadReturn, TUpdate, TDelete } from "../../types";
import { modelSet } from "./create";
import { modelCut } from "./delete";
import { modelGet } from "./read";
import { modelPut } from "./update";

/**
 * Типы модели.
 */
export type TModel<T> = {
  create: ({ payload }: TCreate<T[]>) => Promise<T[]>; // Определяем тип для создания записи.
  read: (request?: TRead) => Promise<TReadReturn<T>>; // Определяем тип для чтения записи.
  update: ({ id, payload }: TUpdate<T>) => Promise<T | null>; // Определяем тип для обновления записи.
  delete: ({ id }: TDelete) => Promise<T | null>; // Определяем тип для удаления записи.
};

/**
 * Функция для создания модели.
 * @param table - Название таблицы в базе данных.
 * @returns Объект с функциями модели.
 */
export const model = <T>(table: string): TModel<T> => ({
  create: modelSet<T>(table), // Экспортируем функцию создания записи.
  read: modelGet<T>(table), // Экспортируем функцию чтения записи.
  update: modelPut<T>(table), // Экспортируем функцию обновления записи.
  delete: modelCut<T>(table), // Экспортируем функцию удаления записи.
});
