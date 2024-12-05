import { Request, Response } from "express";
import { diskStorage } from "multer";
import { basename } from "path";
import { v4 } from "uuid";
import { orm } from "./orm";

// Экспортируемая функция для загрузки файлов
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
    }).array("files"); // Изменяем на array для загрузки массива файлов

    // Выполнение промежуточного слоя загрузки файлов
    uploadMiddleware(req, res, async (err) => {
      // Обработка ошибок загрузки файлов
      if (err) {
        console.log("Ошибка при загрузке файлов:", err);
        return res.status(500).json({
          success: false,
          message: `Ошибка при загрузке файлов: ${err.message}`,
        });
      }

      // Проверка наличия файлов и приведение типа к массиву
      const files = req.files as Express.Multer.File[]; // Приведение типов для `req.files`

      if (!files || files.length === 0) {
        console.log("Файлы не были загружены");
        return res.status(400).json({
          success: false,
          message: "Файлы не были загружены",
        });
      }

      const filesData = [];

      // Обработка каждого загруженного файла
      for (const file of files) {
        const insertFile = {
          id: v4(), // Генерация уникального идентификатора для записи
          url: `${req.protocol}://${req.get("host")}/api/public/${
            file.filename
          }`,
          upload_date: orm.fn.now(), // Дата загрузки файла
          ...file,
        };

        // Внесение данных о файле в базу данных
        await orm("files").insert(insertFile);

        // Сохранение данных о файле для ответа
        filesData.push(insertFile);
      }

      // Отправка успешного ответа с данными о всех файлах
      res.status(200).json({
        success: true,
        message: "Файлы успешно загружены и данные о них внесены в базу данных",
        files: filesData, // Возвращаем данные о всех файлах
      });
    });
  } catch (error) {
    // Обработка ошибок и отправка ответа с ошибкой
    console.log("Произошла ошибка при загрузке файлов:", error);
    res.status(500).json({
      success: false,
      message: `Исключение при загрузке файлов: ${error}`,
    });
  }
};
