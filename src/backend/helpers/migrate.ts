import { Request, Response } from "express";
import { writeFileSync } from "fs";
import { orm } from "../middleware/orm";
import { typing } from "./typing";
import { Knex } from "knex";

export type TMigrate = {
  table: string;
  fields: {
    [x: string]: "string" | "integer" | "boolean" | "foreign";
  };
};

// Экспортируемая функция миграции
export const migrate = async (req: Request, res: Response) => {
  try {
    // Сохранение конфигурации конечных точек в файл
    writeFileSync(
      "src/backend/assets/endpoints.json",
      JSON.stringify(
        req.body.create.map((e: { table: string }) => ({
          endpoint: `/${e.table}`,
          table: e.table,
        }))
      ),
      "utf-8"
    );
    
    // Сохранение конфигурации миграции в файл
    writeFileSync(
      "src/backend/assets/migrate.json",
      JSON.stringify(req.body),
      "utf-8"
    );

    // Вызов функции генерации типов и сохранение результатов в файл
    writeFileSync(
      "src/backend/assets/migrate.d.ts",
      typing(req.body.create),
      "utf-8"
    );

    // Цикл по каждому объекту миграции
    for (const e of req.body.create as TMigrate[]) {
      // Проверка, существует ли таблица
      const exists = await orm.schema.hasTable(e.table);

      if (!exists) {
        // Создание таблицы, если она не существует
        await orm.schema.createTable(
          e.table,
          (table: Knex.CreateTableBuilder) => {
            // Добавление полей в таблицу, кроме внешних ключей
            Object.entries(e.fields).forEach(([field, type]) => {
              if (type !== "foreign") {
                table[type](field);
              }
            });
          }
        );

        // Изменение таблицы для добавления внешних ключей
        await orm.schema.alterTable(
          e.table,
          (table: Knex.AlterTableBuilder) => {
            // Добавление внешних ключей к таблице
            Object.entries(e.fields).forEach(([field, type]) => {
              if (type === "foreign") {
                const [key, id, table_] = field.split(".");
                table.foreign(key).references(id).inTable(table_);
              }
            });
          }
        );

        // Лог успешного создания таблицы
        console.log(`Таблица "${e.table}" успешно создана!`);
      }
    }

    // Отправка успешного ответа
    res.status(200).json({
      success: true,
      message: `Все таблицы успешно созданы!`,
    });
  } catch (error) {
    // Обработка ошибок и отправка ответа об ошибке
    console.error("Произошла ошибка при миграции:", error);

    res.status(500).json({
      success: false,
      message: "Произошла ошибка при миграции.",
    });
  }
};
