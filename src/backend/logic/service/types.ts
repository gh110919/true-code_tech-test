import {
  TCreate,
  TRead,
  TypeArrayNull,
  TUpdate,
  TDelete,
} from "../model/types";

/**
 * Типы сервиса.
 */
export type TService<T> = {
  create: ({ payload }: TCreate<any>) => Promise<T>; // Тип для создания записи.
  read: ({
    params,
    query,
    body,
    pagination,
    sorting,
  }: TRead) => Promise<TypeArrayNull<T>>; // Тип для чтения записи.
  update: ({ id, payload }: TUpdate<any>) => Promise<T | null>; // Тип для обновления записи.
  delete: ({ id }: TDelete) => Promise<T | null>; // Тип для удаления записи.
};
