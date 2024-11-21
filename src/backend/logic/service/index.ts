import { TModel } from "../model/types";
import { serviceSet } from "./create";
import { serviceCut } from "./delete";
import { serviceGet } from "./read";
import { TService } from "./types";
import { servicePut } from "./update";

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
