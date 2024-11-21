import { Request, Response } from "express"; // Импортируем типы Request и Response из express
import { writeFileSync } from "fs"; // Импортируем функцию writeFileSync из модуля fs
import { orm } from "../middleware/orm"; // Импортируем объект orm для работы с базой данных

// Экспортируемая функция для удаления таблиц
export const drop = async (req: Request, res: Response) => {
  try {
    // Проход по каждому элементу в массиве `delete` из тела запроса
    req.body.delete.forEach(async (e: { table: string }) => {
      // Удаление таблицы, если она существует
      await orm.schema.dropTableIfExists(e.table);
      console.log(`Таблица "${e.table}" успешно удалена!`);
    });

    // Очистка файла конфигурации конечных точек
    writeFileSync(
      "src/backend/assets/endpoints.json",
      JSON.stringify([]), // Записываем пустой массив в файл endpoints.json
      "utf-8"
    );

    // Очистка файла конфигурации миграций
    writeFileSync(
      "src/backend/assets/migrate.json",
      JSON.stringify([]), // Записываем пустой массив в файл migrate.json
      "utf-8"
    );

    // Очистка файла типов миграций
    writeFileSync(
      "src/backend/assets/migrate.d.ts",
      JSON.stringify(null), // Записываем null в файл migrate.d.ts
      "utf-8"
    );

    // Отправка успешного ответа
    res.status(200).json({
      success: true,
      message: `Все таблицы успешно удалены!`,
    });
  } catch (error) {
    // Логирование ошибки в консоль
    console.log("error", error);

    // Отправка ответа с ошибкой
    res.status(500).json({
      success: false,
      message: `Исключение при удалении таблиц: ${error}`,
    });
  }
};
