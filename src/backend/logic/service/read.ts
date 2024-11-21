import { TModel, TRead } from "../model/types";

/**
 * Функция сервиса для чтения записи.
 * @param model - Модель для взаимодействия с базой данных.
 * @returns Функция для чтения записи с поддержкой фильтрации, пагинации и сортировки.
 */
export const serviceGet = <T>(model: TModel<T>) => {
  return async ({ params, query, body, pagination, sorting }: TRead) => {
    // Проверяем наличие фильтров и передаем их в модель
    if (body) {
      return model.read({ body, pagination, sorting });
    } else if (query) {
      return model.read({ query, pagination, sorting });
    } else if (params) {
      return model.read({ params, pagination, sorting });
    } else {
      return model.read({ pagination, sorting });
    }
  };
};
