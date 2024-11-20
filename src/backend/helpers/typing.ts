import { TMigrate } from "./migrate";

// Функция для преобразования строки в CamelCase
const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

// Функция для генерации типов
export const typing = (migrations: TMigrate[]): string => {
  return migrations
    .map((migrate: TMigrate) => {
      const typeName = `T${migrate.table.charAt(0).toUpperCase()}${toCamelCase(
        migrate.table.slice(1)
      )}`;

      const fields = Object.entries(migrate.fields)
        .map(([name, type]) => {
          let tsType: string;

          switch (type) {
            case "string":
              tsType = "string";
              break;
            case "integer":
              tsType = "number";
              break;
            case "boolean":
              tsType = "boolean";
              break;
            case "foreign":
              tsType = "string"; // Внешние ключи также будут строками
              break;
            default:
              tsType = "any";
          }

          // Заменяем точки на подчеркивания в именах полей
          const formattedName = name.replace(/\./g, "_");
          return `${formattedName}: ${tsType};`;
        })
        .join("\n  ");

      return `export type ${typeName} = {\n  ${fields}\n};`;
    })
    .join("\n\n");
};
