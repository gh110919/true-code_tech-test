import { v4 } from "uuid"; // Импортируем функцию v4 для генерации уникальных идентификаторов.
import { orm } from "../middleware/orm"; // Импортируем объект orm для работы с базой данных.

export type TypeArrayNull<T> = T | T[] | null; // Определяем тип, который может быть одиночным объектом, массивом объектов или null.
export type TCreate<T> = {
  payload: T; // Определяем тип для создания записи с полем payload.
};
export type TRead = Partial<{
  params: any; // Определяем тип для чтения данных с возможностью использования параметров.
  query: any; // Определяем тип для чтения данных с возможностью использования query.
  body: any; // Определяем тип для чтения данных с возможностью использования тела запроса.
}>;
export type TUpdate<T> = {
  id: string; // Определяем тип для обновления записи с полем id.
  payload: T; // Определяем тип для обновления записи с полем payload.
};
export type TDelete = {
  id: string; // Определяем тип для удаления записи с полем id.
};

const modelSet = <T>(table: string) => {
  return async ({ payload }: TCreate<T>): Promise<T> => {
    const id = v4(); // Генерируем уникальный идентификатор для новой записи.
    await orm(table).insert({ ...payload, id }); // Вставляем новую запись в таблицу базы данных.
    return await orm(table).where({ id }).first(); // Возвращаем вставленную запись.
  };
};

const modelGet = <T>(table: string) => {
  return async (request?: TRead): Promise<TypeArrayNull<T>> => {
    const tableWhereAll = (where: any) => {
      delete where.all; // Удаляем поле all из условий.
      return orm(table).where(where); // Возвращаем записи, соответствующие условиям.
    };

    const tableWhereFirst = (where: any) => {
      delete where.all; // Удаляем поле all из условий.
      return orm(table).where(where).first(); // Возвращаем первую запись, соответствующую условиям.
    };

    // Проверяем условия запроса и возвращаем соответствующие данные
    return request?.body && request?.body.all === true
      ? tableWhereAll(request.body)
      : request?.body
        ? tableWhereFirst(request.body)
        : request?.query && request?.query.all === true
          ? tableWhereAll(request.query)
          : request?.query
            ? tableWhereFirst(request.query)
            : request?.params && request?.params.all === true
              ? tableWhereAll(request.params)
              : request?.params
                ? tableWhereFirst(request.params)
                : orm(table).select(); // Если нет условий, возвращаем все записи.
  };
};

const modelPut = <T>(table: string) => {
  return async ({ id, payload }: TUpdate<T>): Promise<T | null> => {
    await orm(table).where({ id }).update(payload); // Обновляем запись с указанным id.
    return orm(table).where({ id }).first(); // Возвращаем обновленную запись.
  };
};

const modelCut = <T>(table: string) => {
  return async ({ id }: TDelete): Promise<T | null> => {
    const item = await orm(table).where({ id }).first(); // Находим запись с указанным id.
    await orm(table).where({ id }).delete(); // Удаляем найденную запись.
    return item; // Возвращаем удаленную запись.
  };
};

export type TModel<T> = {
  create: ({ payload }: TCreate<T>) => Promise<T>; // Определяем тип для создания записи.
  read: (request?: TRead) => Promise<TypeArrayNull<T>>; // Определяем тип для чтения записи.
  update: ({ id, payload }: TUpdate<T>) => Promise<T | null>; // Определяем тип для обновления записи.
  delete: ({ id }: TDelete) => Promise<T | null>; // Определяем тип для удаления записи.
};

export const model = <T>(table: string): TModel<T> => ({
  create: modelSet<T>(table), // Экспортируем функцию для создания записи.
  read: modelGet<T>(table), // Экспортируем функцию для чтения записи.
  update: modelPut<T>(table), // Экспортируем функцию для обновления записи.
  delete: modelCut<T>(table), // Экспортируем функцию для удаления записи.
});
