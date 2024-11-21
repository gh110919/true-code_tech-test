import { orm } from "../../middleware/orm";
import { TRead, TypeArrayNull } from "./types";

/**
 * Функция модели для чтения записи.
 * @param table - Название таблицы в базе данных.
 * @returns Функция для чтения записи с поддержкой фильтрации, пагинации и сортировки.
 */
export const modelGet = <T>(table: string) => {
  return async (request?: TRead): Promise<TypeArrayNull<T>> => {
    const { params, query, body, pagination, sorting } = request || {};
    const queryBuilder = orm(table);

    // Фильтрация данных в запросе
    const applyFilters = (where: any) => {
      delete where.all; // Удаляем поле all, если оно присутствует
      return where; // Возвращаем объект фильтров
    };

    // Применяем фильтры
    if (body) {
      queryBuilder.where(applyFilters(body));
    } else if (query) {
      queryBuilder.where(applyFilters(query));
    } else if (params) {
      queryBuilder.where(applyFilters(params));
    }

    // Применяем пагинацию
    if (pagination?.limit !== undefined) {
      queryBuilder.limit(pagination.limit);
    }

    if (pagination?.offset !== undefined) {
      queryBuilder.offset(pagination.offset);
    }

    // Применяем сортировку
    if (sorting?.sortBy) {
      queryBuilder.orderBy(sorting.sortBy, sorting.order || "asc");
    }

    // Возвращаем все или первую запись в зависимости от условия
    return request?.body?.all || request?.query?.all || request?.params?.all
      ? queryBuilder
      : queryBuilder.first();
  };
};
