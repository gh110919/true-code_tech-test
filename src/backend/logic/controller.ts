import { Request, Response } from "express"; // Импортируем типы Request и Response из express.
import { TypeArrayNull } from "./model"; // Импортируем тип TypeArrayNull из модели.
import { TService } from "./service"; // Импортируем тип TService из сервиса.

const control = async <T>(response: Response, data: Promise<T>) => {
  try {
    return response.status(200).json({
      success: true, // Если всё прошло успешно, возвращаем статус 200 и данные.
      message: await data,
    });
  } catch (error) {
    console.error(error); // В случае ошибки выводим её в консоль.

    return response.status(500).json({
      success: false, // Если произошла ошибка, возвращаем статус 500 и сообщение об ошибке.
      message: `Исключение рест-сервера ${error}`,
    });
  }
};

const notEmpty = (obj: object) => Object.keys(obj).length !== 0; // Функция проверяет, пуст ли объект.

const controllerSet = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    control<T>(response, service.create({ payload: request.body })); // Обрабатываем создание записи через сервис.
  };
};

const controllerGet = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    notEmpty(request.body)
      ? control<TypeArrayNull<T>>(
          response,
          service.read({ body: request.body }),
        ) // Если тело запроса не пустое, читаем данные с его помощью.
      : notEmpty(request.query)
      ? control<TypeArrayNull<T>>(
          response,
          service.read({ query: request.query }),
        ) // Если параметры запроса не пустые, читаем данные с их помощью.
      : notEmpty(request.params)
      ? control<TypeArrayNull<T>>(
          response,
          service.read({ params: request.params }),
        ) // Если параметры маршрута не пустые, читаем данные с их помощью.
      : control<TypeArrayNull<T>>(response, service.read(undefined!)); // Иначе читаем данные без фильтров.
  };
};

const controllerPut = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.update({
        id: String(request.params.id || request.query.id || request.body.id), // Обновляем запись с указанным id.
        payload: request.body,
      }),
    );
  };
};

const controllerCut = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.delete({
        id: String(request.params.id || request.query.id || request.body.id), // Удаляем запись с указанным id.
      }),
    );
  };
};

export type TController = {
  create: (request: Request, response: Response) => Promise<void>; // Тип для создания записи.
  read: (request: Request, response: Response) => Promise<void>; // Тип для чтения записи.
  update: (request: Request, response: Response) => Promise<void>; // Тип для обновления записи.
  delete: (request: Request, response: Response) => Promise<void>; // Тип для удаления записи.
};

export const controller = <T>(service: TService<T>): TController => ({
  create: controllerSet<T>(service), // Экспортируем функцию создания записи.
  read: controllerGet<T>(service), // Экспортируем функцию чтения записи.
  update: controllerPut<T>(service), // Экспортируем функцию обновления записи.
  delete: controllerCut<T>(service), // Экспортируем функцию удаления записи.
});
