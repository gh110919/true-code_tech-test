import { json } from "express"; // Импортируем метод json из express для работы с JSON-данными.
import { drop } from "./helpers/drop"; // Импортируем функцию drop из файла helpers/drop.
import { migrate } from "./helpers/migrate"; // Импортируем функцию migrate из файла helpers/migrate.
import { crud } from "./middleware/crud"; // Импортируем middleware crud из файла middleware/crud.
import { imports } from "./middleware/imports"; // Импортируем объект imports из файла middleware/imports.
import { upload } from "./middleware/upload"; // Импортируем middleware upload из файла middleware/upload.
import { endpoints } from "./helpers/endpoints";
import { types } from "./helpers/types";

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
        .delete("/api/drop", drop) // Настраиваем маршрут для удаления данных через /api/drop.
        .post("/api/migrate", migrate) // Настраиваем маршрут для миграции данных через /api/migrate.
        .get("/api/endpoints", endpoints)
        .get("/api/types", types)
        .post("/api/upload", upload) // Настраиваем маршрут для загрузки файлов через /api/upload.
        .use("/api/public", express.static("src/backend/uploads")) // Настраиваем статический маршрут для публичного доступа к загруженным файлам.
        .use("/api/crud", crud(imports.endpoints)); // Настраиваем маршрут для операций CRUD через /api/crud.
      console.log(true); // Выводим сообщение об успешной настройке сервера.
    } catch (error) {
      console.error(`Исключение экспресс-сервера: ${error}`); // Обрабатываем возможные ошибки и выводим их в консоль.
    }
  });
})();
