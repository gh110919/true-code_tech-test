export type TypeArrayNull<T> = T | T[] | null; // Определяем тип, который может быть одиночным объектом, массивом объектов или null.
export type TCreate<T> = {
  payload: T; // Определяем тип для создания записи с полем payload.
};
export type TRead = Partial<{
  params: any; // Определяем тип для чтения данных с возможностью использования параметров.
  query: any; // Определяем тип для чтения данных с возможностью использования query.
  body: any; // Определяем тип для чтения данных с возможностью использования тела запроса.
  pagination: { limit?: number; offset?: number }; // Тип для пагинации.
  sorting: { sortBy?: string; order?: 'asc' | 'desc' }; // Тип для сортировки.
}>;
export type TUpdate<T> = {
  id: string; // Определяем тип для обновления записи с полем id.
  payload: T; // Определяем тип для обновления записи с полем payload.
};
export type TDelete = {
  id: string; // Определяем тип для удаления записи с полем id.
};
export type TModel<T> = {
  create: ({ payload }: TCreate<T>) => Promise<T>; // Определяем тип для создания записи.
  read: (request?: TRead) => Promise<TypeArrayNull<T>>; // Определяем тип для чтения записи.
  update: ({ id, payload }: TUpdate<T>) => Promise<T | null>; // Определяем тип для обновления записи.
  delete: ({ id }: TDelete) => Promise<T | null>; // Определяем тип для удаления записи.
};
