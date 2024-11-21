import { Request, Response } from "express";
import { TService } from "../service/types";
import { control } from "./control";

/**
 * Функция контроллера для создания записи.
 * @param service - Сервис для обработки бизнес-логики.
 * @returns Функция для обработки HTTP-запроса на создание записи.
 */
export const controllerSet = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    // Вызываем сервис для создания записи и отправляем ответ.
    control<T>(response, service.create({ payload: request.body }));
    console.log('request.body', request.body)
  };
};
