import { json, urlencoded } from "express";
import { networkInterfaces } from "os";
import { drop } from "./helpers/drop";
import { endpoints } from "./helpers/endpoints";
import { migrate } from "./helpers/migrate";
import { types } from "./helpers/types";
import { crud } from "./middleware/crud";
import { imports } from "./middleware/imports";
import { upload } from "./middleware/upload";
import { readFileSync } from "fs";
import { SecureContextOptions } from "tls";

(async () => {
  const express = (await import("express")).default();
  const expressStatic = (await import("express")).static;
  const http = (await import("http")).default;
  const https = (await import("https")).default;

  const cors = (await import("cors")).default({
    // Динамически импортируем CORS и настраиваем его параметры.
    origin: "*",
    credentials: true,
  });

  const listener = async () => {
    // Настраиваем сервер для прослушивания на порту 80.
    try {
      express
        .set("trust proxy", "linklocal") // Устанавливаем параметр доверия к прокси.
        .use(cors) // Добавляем middleware CORS.
        .use(json()) // Добавляем middleware для работы с JSON.
        .use(urlencoded({ extended: true }))
        .delete("/api/drop", drop) // Настраиваем маршрут для удаления данных через /api/drop.
        .post("/api/migrate", migrate) // Настраиваем маршрут для миграции данных через /api/migrate.
        .get("/api/endpoints", endpoints) // Настраиваем маршрут для получения эндпоинтов.
        .get("/api/types", types) // Настраиваем маршрут для получения типов данных.
        .post("/api/upload", upload) // Настраиваем маршрут для загрузки файлов через /api/upload.
        .use("/api/public", expressStatic("src/backend/uploads")) // Настраиваем статический маршрут для публичного доступа к загруженным файлам.
        .use("/api/crud", crud(imports.endpoints)); // Настраиваем маршрут для операций CRUD через /api/crud.
    } catch (error) {
      console.error(`Server setup exception: ${error}`); // Обрабатываем возможные ошибки и выводим их в консоль.
    }
  };

  const ssl: SecureContextOptions = {
    /* самоподписные сертификаты сгенерированы на локальный хост и выданы на 1000 лет */
    key: readFileSync("certs/private_key.pem"),
    cert: readFileSync("certs/fullchain.pem"),
  };

  const ports = {
    http: 3080,
    https: 3443,
  };

  http.createServer(express).listen(ports.http, listener);
  https.createServer(ssl, express).listen(ports.https, listener);

  const host = () => {
    const interfaces = Object.values(networkInterfaces()).flat();
    const ip = interfaces.find((e) => e?.family === "IPv4" && !e?.internal);
    return {
      http: `http://${ip?.address}:${ports.http}`,
      https: `https://${ip?.address}:${ports.https}`,
    };
  };

  console.log(host());
})();
