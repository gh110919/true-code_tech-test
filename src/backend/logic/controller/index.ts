import { Request, Response } from "express";
import { TService } from "../service";
import { controllerSet } from "./create";
import { controllerCut } from "./delete";
import { controllerGet } from "./read";
import { controllerPut } from "./update";

/**
 * Типы контроллера.
 */
export type TController = {
  create: (request: Request, response: Response) => Promise<void>; // Тип для создания записи.
  read: (request: Request, response: Response) => Promise<void>; // Тип для чтения записи.
  update: (request: Request, response: Response) => Promise<void>; // Тип для обновления записи.
  delete: (request: Request, response: Response) => Promise<void>; // Тип для удаления записи.
};

/**
 * Функция для создания контроллеров.
 * @param service - Сервис для обработки бизнес-логики.
 * @returns Объект с функциями контроллеров.
 */
export const controller = <T>(service: TService<T>): TController => ({
  create: controllerSet<T>(service), // Экспортируем функцию создания записи.
  read: controllerGet<T>(service), // Экспортируем функцию чтения записи.
  update: controllerPut<T>(service), // Экспортируем функцию обновления записи.
  delete: controllerCut<T>(service), // Экспортируем функцию удаления записи.
});
