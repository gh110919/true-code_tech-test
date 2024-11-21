import { TService } from "../service/types";
import { controllerSet } from "./create";
import { controllerCut } from "./delete";
import { controllerGet } from "./read";
import { TController } from "./types";
import { controllerPut } from "./update";

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
