import { Request, Response } from "express"; // Импортируем типы Request и Response из express
import { readFileSync } from "fs"; // Импортируем функцию readFileSync из модуля fs

// Функция для обработки запроса на получение типов в виде файла
export const types = (_: Request, res: Response) => {
  try {
    // Устанавливаем заголовки для загрузки файла
    res.setHeader("Content-disposition", "attachment; filename=migrate.d.ts");
    res.setHeader("Content-Type", "text/typescript");

    // Отправляем файл как ответ
    res.status(200).send(
      // Читаем содержимое файла migrate.d.ts
      readFileSync("src/backend/assets/migrate.d.ts", "utf8")
    );
  } catch (error) {
    // В случае ошибки отправляем статус 500 и сообщение об ошибке
    console.error("Ошибка при чтении файла типов:", error); // Логируем ошибку в консоль
    res.status(500).json({
      success: false, // Указываем неуспешный статус ответа
      message: `Ошибка при чтении файла типов: ${error}`, // Сообщение об ошибке
    });
  }
};
