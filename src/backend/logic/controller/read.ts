import { Request, Response } from "express";
import { TypeArrayNull } from "../model/types";
import { TService } from "../service/types";
import { control } from "./control";
import { notEmpty } from "./utils";

/**
 * Функция контроллера для чтения записи.
 * @param service - Сервис для обработки бизнес-логики.
 * @returns Функция для обработки HTTP-запроса на чтение записи.
 */
export const controllerGet = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    const { body, query, params } = request; // Деструктурируем параметры запроса.

    // Настраиваем параметры пагинации.
    const pagination = {
      limit: parseInt(query.limit as string, 10) || undefined,
      offset: parseInt(query.offset as string, 10) || undefined,
    };

    // Настраиваем параметры сортировки.
    const sorting = {
      sortBy: (query.sortBy as string) || undefined,
      order: (query.order as "asc" | "desc" | undefined) || undefined,
    };

    // Проверяем, не пустое ли тело запроса и читаем данные с его помощью.
    if (notEmpty(body)) {
      control<TypeArrayNull<T>>(
        response,
        service.read({ body, pagination, sorting })
      );
    }
    // Проверяем, не пустые ли параметры запроса и читаем данные с их помощью.
    else if (notEmpty(query)) {
      control<TypeArrayNull<T>>(
        response,
        service.read({ query, pagination, sorting })
      );
    }
    // Проверяем, не пустые ли параметры маршрута и читаем данные с их помощью.
    else if (notEmpty(params)) {
      control<TypeArrayNull<T>>(
        response,
        service.read({ params, pagination, sorting })
      );
    }
    // Если нет условий, читаем данные с учетом пагинации и сортировки.
    else {
      control<TypeArrayNull<T>>(
        response,
        service.read({ pagination, sorting })
      );
    }
  };
};
