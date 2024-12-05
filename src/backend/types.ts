import { ParamsDictionary, Request } from "express-serve-static-core";
import { ParsedQs } from "qs";

export type TypeArrayNull<T> = T | T[] | null; // Определяем тип, который может быть одиночным объектом, массивом объектов или null.

export type TCreate<T> = {
  payload: T; // Определяем тип для создания записи с полем payload.
};

export type TRead = Partial<{
  params: ParamsDictionary; // Определяем тип для чтения данных с возможностью использования параметров.
  query: ParsedQs; // Определяем тип для чтения данных с возможностью использования query.
  body: Request["body"]; // Определяем тип для чтения данных с возможностью использования тела запроса.
  filters: any;
  pagination: { limit?: number; offset?: number }; // Тип для пагинации.
  sorting: { sortBy?: string; order?: "asc" | "desc" }; // Тип для сортировки.
}>;

export type TUpdate<T> = {
  id: string; // Определяем тип для обновления записи с полем id.
  payload: T; // Определяем тип для обновления записи с полем payload.
};

export type TDelete = {
  id: string; // Определяем тип для удаления записи с полем id.
};

export type TReadReturn<T> =
  | { payload: TypeArrayNull<T>; total: number }
  | TypeArrayNull<T>;
