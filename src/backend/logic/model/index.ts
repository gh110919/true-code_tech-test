import { modelSet } from "./create";
import { modelCut } from "./delete";
import { modelGet } from "./read";
import { TModel } from "./types";
import { modelPut } from "./update";

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
