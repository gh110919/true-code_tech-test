import { v4 } from "uuid";
import { orm } from "../middleware/orm";

export type TypeArrayNull<T> = T | T[] | null;
export type TCreate<T> = {
  payload: T;
};
export type TRead = Partial<{
  params: any;
  query: any;
  body: any;
}>;
export type TUpdate<T> = {
  id: string;
  payload: T;
};
export type TDelete = {
  id: string;
};

const modelSet = <T>(table: string) => {
  return async ({ payload }: TCreate<T>): Promise<T> => {
    const id = v4();
    await orm(table).insert({ ...payload, id });
    return await orm(table).where({ id }).first();
  };
};

const modelGet = <T>(table: string) => {
  return async (request?: TRead): Promise<TypeArrayNull<T>> => {

    const tableWhereAll = (where: any) => {
      delete where.all;
      return orm(table).where(where);
    };

    const tableWhereFirst = (where: any) => {
      delete where.all;
      return orm(table).where(where).first();
    };

    return request?.body && request?.body.all === true
      ? tableWhereAll(request.body)
      : request?.body
        ? tableWhereFirst(request.body)
        : request?.query && request?.query.all === true
          ? tableWhereAll(request.query)
          : request?.query
            ? tableWhereFirst(request.query)
            : request?.params && request?.params.all === true
              ? tableWhereAll(request.params)
              : request?.params
                ? tableWhereFirst(request.params)
                : orm(table).select();
  };
};

const modelPut = <T>(table: string) => {
  return async ({ id, payload }: TUpdate<T>): Promise<T | null> => {
    await orm(table).where({ id }).update(payload);
    return orm(table).where({ id }).first();
  };
};

const modelCut = <T>(table: string) => {
  return async ({ id }: TDelete): Promise<T | null> => {
    const item = await orm(table).where({ id }).first();
    await orm(table).where({ id }).delete();
    return item;
  };
};

export type TModel<T> = {
  create: ({ payload }: TCreate<T>) => Promise<T>;
  read: (request?: TRead) => Promise<TypeArrayNull<T>>;
  update: ({ id, payload }: TUpdate<T>) => Promise<T | null>;
  delete: ({ id }: TDelete) => Promise<T | null>;
};

export const model = <T>(table: string): TModel<T> => ({
  create: modelSet<T>(table),
  read: modelGet<T>(table),
  update: modelPut<T>(table),
  delete: modelCut<T>(table),
});
