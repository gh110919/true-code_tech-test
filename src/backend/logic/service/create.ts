import { TModel, TCreate } from "../model/types";

/**
 * Функция сервиса для создания записи.
 * @param model - Модель для взаимодействия с базой данных.
 * @returns Функция для создания новой записи.
 */
export const serviceSet = <T>(model: TModel<T>) => {
  return async ({ payload }: TCreate<T>) => {
    return model.create({ payload }); // Вызываем метод create у модели для создания новой записи.
  };
};
