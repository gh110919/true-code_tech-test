import { TMigrate } from "./migrate"; // Импортируем тип TMigrate из файла migrate.

// Функция для преобразования строки в CamelCase
const toCamelCase = (str: string): string =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

// Объект для сопоставления типов из базы данных с типами TypeScript
const typeMap: { [key: string]: string } = {
  string: "string",
  integer: "number",
  boolean: "boolean",
  foreign: "string",
  timestamp: "Date",
};

// Функция для генерации типов TypeScript на основе миграций базы данных
export const typing = (migrations: TMigrate[]): string =>
  migrations
    .map(({ table, fields }) => {
      // Формируем имя типа на основе имени таблицы, преобразованного в CamelCase
      const typeName = `T${table.charAt(0).toUpperCase()}${toCamelCase(
        table.slice(1)
      )}`;

      // Формируем строки с определением типов полей
      const fieldEntries = Object.entries(fields)
        .map(
          ([name, type]) =>
            `${name.replace(/\./g, "_")}:${typeMap[type] || "any"};`
        ) // Заменяем точки в именах полей на подчеркивания и сопоставляем типы
        .join(""); // Объединяем все строки в одну

      // Возвращаем строку с определением типа
      return `export type ${typeName}={${fieldEntries}};`;
    })
    .join(""); // Объединяем все определения типов в одну строку
