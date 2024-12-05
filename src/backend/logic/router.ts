import { Router } from "express";
import { TController } from "./controller";

export const router = (endpoint: string, controller: TController): Router => {
  return ((
    router: Router, // Определяем локальную переменную router.
    endpoint: string, // Определяем локальную переменную endpoint.
    controller: TController // Определяем локальную переменную controller.
  ): Router => {
    return router
      .post(`${endpoint}`, controller.create) // Настраиваем маршрут POST для создания записи.
      .get(`${endpoint}`, controller.read) // Настраиваем маршрут GET для чтения записи.
      .put(`${endpoint}`, controller.update) // Настраиваем маршрут PUT для обновления записи.
      .patch(`${endpoint}`, controller.update) // Настраиваем маршрут PATCH для обновления записи.
      .delete(`${endpoint}`, controller.delete); // Настраиваем маршрут DELETE для удаления записи.
  })(Router(), endpoint, controller); // Вызываем функцию с новыми объектами Router, endpoint и controller.
};
