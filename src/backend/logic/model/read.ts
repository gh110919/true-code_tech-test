import { orm } from "../../middleware/orm";
import { TRead, TypeArrayNull } from "../../types";

/**
 * Функция модели для чтения записи.
 * @param table - Название таблицы в базе данных.
 * @returns Функция для чтения записи с поддержкой фильтрации, пагинации и сортировки.
 */
export const modelGet = <T>(table: string) => {
  return async (
    request?: TRead
  ): Promise<
    { payload: TypeArrayNull<T>; total: number } | TypeArrayNull<T>
  > => {
    const { filters, pagination, sorting } = request || {};
    const queryBuilder = orm(table);

    // Применяем фильтры
    if (filters) {
      queryBuilder.where(filters);
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

    const payload = await queryBuilder;

    // Подсчитываем общее количество записей
    const total = (await queryBuilder.count("* as count")).find((e) => e.count);

    return pagination ? { payload, total: +total?.count! } : { ...payload };
  };
};
