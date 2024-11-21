import { Request, Response } from "express";

/**
 * Типы контроллера.
 */
export type TController = {
  create: (request: Request, response: Response) => Promise<void>; // Тип для создания записи.
  read: (request: Request, response: Response) => Promise<void>; // Тип для чтения записи.
  update: (request: Request, response: Response) => Promise<void>; // Тип для обновления записи.
  delete: (request: Request, response: Response) => Promise<void>; // Тип для удаления записи.
};
