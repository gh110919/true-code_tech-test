import {
  TCreate, // Импортируем тип данных для создания записи.
  TDelete, // Импортируем тип данных для удаления записи.
  TModel, // Импортируем тип данных модели.
  TRead, // Импортируем тип данных для чтения записи.
  TUpdate, // Импортируем тип данных для обновления записи.
  TypeArrayNull, // Импортируем тип, который может быть одиночным объектом, массивом объектов или null.
} from "./model";

const serviceSet = <T>(model: TModel<T>) => {
  return async ({ payload }: TCreate<T>) => {
    return model.create({ payload }); // Вызываем метод create у модели для создания новой записи.
  };
};

const serviceGet = <T>(model: TModel<T>) => {
  return async ({ params, query, body }: TRead) => {
    return body
      ? model.read({ body }) // Если body не пустое, читаем данные из body.
      : query
        ? model.read({ query }) // Если query не пустое, читаем данные из query.
        : params
          ? model.read({ params }) // Если params не пустое, читаем данные из params.
          : model.read(); // Если ни один из параметров не указан, читаем все данные.
  };
};

const servicePut = <T>(model: TModel<T>) => {
  return async ({ id, payload }: TUpdate<T>) => {
    return model.update({ id, payload }); // Вызываем метод update у модели для обновления записи.
  };
};

const serviceCut = <T>(model: TModel<T>) => {
  return async ({ id }: TDelete) => {
    if (!id) {
      throw new Error("не указан id"); // Если id не указан, выбрасываем ошибку.
    }
    return model.delete({ id }); // Вызываем метод delete у модели для удаления записи.
  };
};

export type TService<T> = {
  create: ({ payload }: TCreate<any>) => Promise<T>; // Определяем тип данных для создания записи.
  read: ({ params, query, body }: TRead) => Promise<TypeArrayNull<T>>; // Определяем тип данных для чтения записи.
  update: ({ id, payload }: TUpdate<any>) => Promise<T | null>; // Определяем тип данных для обновления записи.
  delete: ({ id }: TDelete) => Promise<T | null>; // Определяем тип данных для удаления записи.
};

export const service = <T>(model: TModel<T>): TService<T> => ({
  create: serviceSet<T>(model), // Экспортируем функцию для создания записи.
  read: serviceGet<T>(model), // Экспортируем функцию для чтения записи.
  update: servicePut<T>(model), // Экспортируем функцию для обновления записи.
  delete: serviceCut<T>(model), // Экспортируем функцию для удаления записи.
});
