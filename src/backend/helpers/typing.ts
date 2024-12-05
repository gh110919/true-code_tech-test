import { TMigrate, toCamelCase } from "./migrate"; // Импортируем тип TMigrate из файла migrate.

const typeMap: { [key: string]: string } = {
  string: "string",
  integer: "number",
  boolean: "boolean",
  foreign: "string",
  timestamp: "Date",
};

// Функция для генерации типов TypeScript на основе миграций базы данных
export const typing = (migrations: TMigrate[]): string => {
  // Создаем массив для хранения всех типов
  const types: string[] = migrations.map(({ table, fields }) => {
    // Формируем имя типа на основе имени таблицы, преобразованного в CamelCase
    const typeName = `T${table.charAt(0).toUpperCase()}${toCamelCase(table.slice(1))}`;

    // Формируем строки с определением типов полей
    const fieldEntries = Object.entries(fields)
      .map(([name, type]) => `${name.replace(/\./g, "_")}:${typeMap[type] || "any"};`)
      .join(""); // Объединяем все строки в одну

    // Возвращаем строку с определением типа
    return `export type ${typeName}={${fieldEntries}};`;
  });

  // Добавляем TypeMap, который связывает типы с их определениями
  const typeMapEntries = migrations
    .map(({ table }) => {
      const typeName = `T${table.charAt(0).toUpperCase()}${toCamelCase(table.slice(1))}`;
      return `${typeName}:${typeName};`;
    })
    .join("");

  types.push(`export type TypeMap={${typeMapEntries}};`);

  // Добавляем строковый тип, который включает все имена типов
  const typeNames = migrations
    .map(({ table }) => {
      const typeName = `T${table.charAt(0).toUpperCase()}${toCamelCase(table.slice(1))}`;
      return `"${typeName}"`;
    })
    .join("|");

  types.push(`export type TypeNames = ${typeNames};`);

  // Объединяем все определения типов в одну строку и возвращаем её
  return types.join("");
};
