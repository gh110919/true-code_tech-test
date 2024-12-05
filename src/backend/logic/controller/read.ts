import { Request, Response } from "express";
import { TService } from "../service";
import { notEmpty } from "./utils";
import { control } from "./control";

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
    
    type Order = "asc" | "desc" | undefined;
    // Настраиваем параметры сортировки.
    const sorting = {
      sortBy: (query.sortBy as string) || undefined,
      order: (query.order as Order) || undefined,
    };

    // Настраиваем параметры фильтрации.
    // const filters = notEmpty(query)
    //   ? query
    //   : notEmpty(params)
    //   ? params
    //   : notEmpty(body)
    //   ? body
    //   : undefined;

    // Возвращаем данные и количество записей
    control(
      response,
      service.read({
        /* filters, */ pagination,
        sorting,
      })
    );
  };
};
