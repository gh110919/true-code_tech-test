import { Request, Response } from "express"; // Импортируем типы Request и Response из express
import { readFileSync } from "fs"; // Импортируем функцию readFileSync из модуля fs

// Функция для обработки запроса на получение конечных точек
export const endpoints = (_: Request, res: Response) => {
  try {
    // Отправляем содержимое файла в формате JSON
    res.status(200).json({
      success: true, // Указываем успешный статус ответа
      message: JSON.parse(
        // Читаем содержимое файла endpoints.json и парсим его в объект
        readFileSync("src/backend/assets/endpoints.json", "utf8")
      ),
    });
  } catch (error) {
    // В случае ошибки отправляем статус 500 и сообщение об ошибке
    console.error("Ошибка при чтении файла с конечными точками:", error); // Логируем ошибку в консоль
    res.status(500).json({
      success: false, // Указываем неуспешный статус ответа
      message: `Ошибка при чтении файла с конечными точками: ${error}`, // Сообщение об ошибке
    });
  }
};
