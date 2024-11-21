import { TModel, TDelete } from "../model/types";

/**
 * Функция сервиса для удаления записи.
 * @param model - Модель для взаимодействия с базой данных.
 * @returns Функция для удаления записи.
 */
export const serviceCut = <T>(model: TModel<T>) => {
  return async ({ id }: TDelete) => {
    if (!id) {
      throw new Error("не указан id"); // Если id не указан, выбрасываем ошибку.
    }
    return model.delete({ id }); // Вызываем метод delete у модели для удаления записи.
  };
};
