import { TCreate, TRead, TReadReturn, TUpdate, TDelete } from "../../types";
import { TModel } from "../model";
import { serviceSet } from "./create";
import { serviceCut } from "./delete";
import { serviceGet } from "./read";
import { servicePut } from "./update";

/**
 * Типы сервиса.
 */
export type TService<T> = {
  create: ({ payload }: TCreate<T[]>) => Promise<T[]>; // Тип для создания записи.
  read: ({
    params,
    query,
    body,
    pagination,
    sorting,
  }: TRead) => Promise<TReadReturn<T>>; // Тип для чтения записи.
  update: ({ id, payload }: TUpdate<T>) => Promise<T | null>; // Тип для обновления записи.
  delete: ({ id }: TDelete) => Promise<T | null>; // Тип для удаления записи.
};

/**
 * Функция для создания сервиса.
 * @param model - Модель для взаимодействия с базой данных.
 * @returns Объект с функциями сервиса.
 */
export const service = <T>(model: TModel<T>): TService<T> => ({
  create: serviceSet<T>(model), // Экспортируем функцию создания записи.
  read: serviceGet<T>(model), // Экспортируем функцию чтения записи.
  update: servicePut<T>(model), // Экспортируем функцию обновления записи.
  delete: serviceCut<T>(model), // Экспортируем функцию удаления записи.
});
