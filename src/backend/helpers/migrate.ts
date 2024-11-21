import { Request, Response } from "express"; // Импортируем типы Request и Response из express
import { writeFileSync } from "fs"; // Импортируем функцию writeFileSync из модуля fs
import { orm } from "../middleware/orm"; // Импортируем объект orm для работы с базой данных
import { typing } from "./typing"; // Импортируем функцию typing для генерации типов
import { Knex } from "knex"; // Импортируем типы из библиотеки Knex

// Определяем тип TMigrate для описания структуры миграций
export type TMigrate = {
  table: string; // Имя таблицы
  fields: {
    [x: string]: "string" | "integer" | "boolean" | "foreign" | "timestamp"; // Поля таблицы и их типы
  };
};

// Функция для добавления или удаления полей таблицы
const modifyTable = async (
  table: Knex.AlterTableBuilder, // Строитель таблиц Knex для изменения существующей таблицы
  fields: TMigrate["fields"], // Поля, которые нужно добавить или удалить
  columns: { [key: string]: any } // Существующие столбцы таблицы
) => {
  // Проходим по каждому полю и его типу
  Object.entries(fields).forEach(([field, type]) => {
    // Если столбец не существует, создаем его
    if (!columns[field]) {
      // В зависимости от типа поля создаем соответствующий столбец
      type === "string"
        ? table.string(field)
        : type === "integer"
        ? table.integer(field)
        : type === "boolean"
        ? table.boolean(field)
        : type === "timestamp"
        ? table.timestamp(field).defaultTo(orm.fn.now())
        : type === "foreign" &&
          // Если поле является внешним ключом, добавляем его как внешний ключ
          (() => {
            const [key, id, table_] = field.split("."); // Разделяем строку на ключ, идентификатор и таблицу
            table.foreign(key).references(id).inTable(table_); // Добавляем внешний ключ
          })();
    }
  });

  // Проходим по каждому существующему столбцу
  Object.keys(columns).forEach((column) => {
    // Если столбца нет в списке полей, удаляем его
    if (!fields[column]) table.dropColumn(column);
  });
};

// Экспортируемая функция миграции для создания или изменения таблиц
export const migrate = async (req: Request, res: Response) => {
  try {
    // Записываем данные миграций в файл migrate.json
    writeFileSync(
      "src/backend/assets/migrate.json",
      JSON.stringify(req.body.create),
      "utf-8"
    );

    // Записываем сгенерированные типы в файл migrate.d.ts
    writeFileSync(
      "src/backend/assets/migrate.d.ts",
      typing(req.body.create),
      "utf-8"
    );

    // Записываем конечные точки в файл endpoints.json
    writeFileSync(
      "src/backend/assets/endpoints.json",
      JSON.stringify(
        req.body.create.map((e: { table: string }) => ({
          endpoint: `/${e.table}`, // Определяем конечную точку для таблицы
          table: e.table, // Указываем имя таблицы
        }))
      )
    );

    // Проходим по каждому элементу миграций
    for (const e of req.body.create as TMigrate[]) {
      // Проверяем, существует ли таблица
      const exists = await orm.schema.hasTable(e.table);
      console.log(`Таблица ${e.table} существует: ${exists}`);

      if (!exists) {
        // Если таблица не существует, создаем ее
        await orm.schema.createTable(
          e.table,
          (table: Knex.CreateTableBuilder) => modifyTable(table, e.fields, {})
        );

        // После создания таблицы модифицируем ее (добавляем необходимые поля)
        await orm.schema.alterTable(e.table, (table: Knex.AlterTableBuilder) =>
          modifyTable(table, e.fields, {})
        );

        console.log(`Таблица "${e.table}" успешно создана!`);
      } else {
        // Если таблица существует, получаем информацию о столбцах
        const columns = await orm(e.table).columnInfo();
        console.log(`Существующие столбцы в таблице ${e.table}:`, columns);

        // Модифицируем существующую таблицу (добавляем или удаляем столбцы)
        await orm.schema.alterTable(e.table, (table: Knex.AlterTableBuilder) =>
          modifyTable(table, e.fields, columns)
        );

        console.log(`Таблица "${e.table}" была обновлена.`);
      }
    }

    // Отправляем успешный ответ
    res.status(200).json({
      success: true,
      message: `Все таблицы успешно созданы или обновлены!`,
    });
  } catch (error) {
    // Логирование ошибки в консоль
    console.error("Произошла ошибка при миграции:", error);
    // Отправка ответа с ошибкой
    res.status(500).json({
      success: false,
      message: "Произошла ошибка при миграции.",
    });
  }
};
