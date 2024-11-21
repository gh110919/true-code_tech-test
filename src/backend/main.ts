import { json, Response, urlencoded } from "express";
import { types } from "./helpers/types";
import { drop } from "./helpers/drop";
import { endpoints } from "./helpers/endpoints";
import { migrate } from "./helpers/migrate";
import { crud } from "./middleware/crud";
import { imports } from "./middleware/imports";
import { upload } from "./middleware/upload";

(async () => {
  const express = await import("express"); // Динамически импортируем express.
  const server = express.default(); // Создаем сервер express.
  const cors = (await import("cors")).default({
    // Динамически импортируем CORS и настраиваем его параметры.
    origin: "*",
    credentials: true,
  });

  server.listen(80, () => {
    // Настраиваем сервер для прослушивания на порту 80.
    try {
      server
        .set("trust proxy", "linklocal") // Устанавливаем параметр доверия к прокси.
        .use(cors) // Добавляем middleware CORS.
        .use(json()) // Добавляем middleware для работы с JSON.
        .use(urlencoded({ extended: true }))
        .delete("/api/drop", drop) // Настраиваем маршрут для удаления данных через /api/drop.
        .post("/api/migrate", migrate) // Настраиваем маршрут для миграции данных через /api/migrate.
        .get("/api/endpoints", endpoints) // Настраиваем маршрут для получения эндпоинтов.
        .get("/api/types", types) // Настраиваем маршрут для получения типов данных.
        .post("/api/upload", upload) // Настраиваем маршрут для загрузки файлов через /api/upload.
        .use("/api/public", express.static("src/backend/uploads")) // Настраиваем статический маршрут для публичного доступа к загруженным файлам.
        .use("/api/crud", crud(imports.endpoints)) // Настраиваем маршрут для операций CRUD через /api/crud.
        .use((err: any, _: any, res: Response, __: any) => {
          console.error(err.stack);
          res.status(500).send("Something broke!");
        });

      console.log(true); // Выводим сообщение об успешной настройке сервера.
    } catch (error) {
      console.error(`Server setup exception: ${error}`); // Обрабатываем возможные ошибки и выводим их в консоль.
    }
  });
})();
