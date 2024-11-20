import {
  TCreate,
  TDelete,
  TModel,
  TRead,
  TUpdate,
  TypeArrayNull,
} from "./model";

const serviceSet = <T>(model: TModel<T>) => {
  return async ({ payload }: TCreate<T>) => {
    return model.create({ payload });
  };
};

const serviceGet = <T>(model: TModel<T>) => {
  return async ({ params, query, body }: TRead) => {
    return body
      ? model.read({ body })
      : query
        ? model.read({ query })
        : params
          ? model.read({ params })
          : model.read();
  };
};

const servicePut = <T>(model: TModel<T>) => {
  return async ({ id, payload }: TUpdate<T>) => {
    return model.update({ id, payload });
  };
};

const serviceCut = <T>(model: TModel<T>) => {
  return async ({ id }: TDelete) => {
    if (!id) {
      throw new Error("не указан id");
    }
    return model.delete({ id });
  };
};

export type TService<T> = {
  create: ({ payload }: TCreate<any>) => Promise<T>;
  read: ({ params, query, body }: TRead) => Promise<TypeArrayNull<T>>;
  update: ({ id, payload }: TUpdate<any>) => Promise<T | null>;
  delete: ({ id }: TDelete) => Promise<T | null>;
};

export const service = <T>(model: TModel<T>): TService<T> => ({
  create: serviceSet<T>(model),
  read: serviceGet<T>(model),
  update: servicePut<T>(model),
  delete: serviceCut<T>(model),
});
