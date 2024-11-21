import { Request, Response } from "express";
import { diskStorage } from "multer";
import { basename } from "path";
import { v4 } from "uuid";
import { orm } from "./orm";

// Экспортируемая функция для загрузки файла
export const upload = async (req: Request, res: Response) => {
  // Импортируем Multer динамически
  const multer = (await import("multer")).default;

  try {
    // Конфигурация Multer для хранения файлов
    const uploadMiddleware = multer({
      // Устанавливаем хранилище с помощью diskStorage
      storage: diskStorage({
        // Определяем папку для загрузки файлов
        destination: (_, __, cb) => {
          cb(null, "src/backend/uploads");
        },
        // Определяем имя файла
        filename: (_, { originalname }, cb) => {
          // Генерируем уникальное имя файла с помощью UUID и basename оригинального имени файла
          const sanitizedFilename = originalname.replace(/ /g, "_"); // Заменяем пробелы на нижние подчеркивания
          cb(null, `${v4()}_${basename(sanitizedFilename)}`);
        },
      }),
    }).single("file");

    // Выполнение промежуточного слоя загрузки файла
    uploadMiddleware(req, res, async (err) => {
      // Обработка ошибок загрузки файла
      if (err) {
        console.log("Ошибка при загрузке файла:", err);
        return res.status(500).json({
          success: false,
          message: `Ошибка при загрузке файла: ${err.message}`,
        });
      }

      // Проверка наличия файла
      if (!req.file) {
        console.log("Файл не был загружен");
        return res.status(400).json({
          success: false,
          message: "Файл не был загружен",
        });
      }

      // Получение информации о файле из запроса
      const { originalname, filename, size, path } = req.file;
      const fileId = v4();

      // Создание HTTP ссылки на файл
      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/public/${filename}`;

      // Внесение данных о файле в базу данных
      await orm("files").insert({
        id: fileId, // Генерация уникального идентификатора для записи
        original_name: originalname, // Оригинальное имя файла
        file_name: filename, // Имя файла на сервере
        file_size: size, // Размер файла
        file_url: fileUrl,
        file_path: path, // Путь к файлу на сервере
        upload_date: orm.fn.now(), // Дата загрузки файла
      });

      // Отправка успешного ответа с ID файла и ссылкой
      res.status(200).json({
        success: true,
        message: {
          status: "Файл успешно загружен и данные о нем внесены в базу данных",
          id: fileId, // Возвращаем ID файла
          url: fileUrl, // Возвращаем ссылку на файл
        },
      });
    });
  } catch (error) {
    // Обработка ошибок и отправка ответа с ошибкой
    console.log("Произошла ошибка при загрузке файла:", error);
    res.status(500).json({
      success: false,
      message: `Исключение при загрузке файла: ${error}`,
    });
  }
};
