import { Request, Response } from "express";
import { TypeArrayNull } from "./model";
import { TService } from "./service";

const control = async <T>(response: Response, data: Promise<T>) => {
  try {
    return response.status(200).json({
      success: true,
      message: await data,
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      success: false,
      message: `Исключение рест-сервера ${error}`,
    });
  }
};

const notEmpty = (obj: object) => Object.keys(obj).length !== 0;

const controllerSet = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    control<T>(response, service.create({ payload: request.body }));
  };
};

const controllerGet = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {

    notEmpty(request.body)
      ? control<TypeArrayNull<T>>(
        response,
        service.read({ body: request.body }),
      )
      : notEmpty(request.query)
        ? control<TypeArrayNull<T>>(
          response,
          service.read({ query: request.query }),
        )
        : notEmpty(request.params)
          ? control<TypeArrayNull<T>>(
            response,
            service.read({ params: request.params }),
          )
          : control<TypeArrayNull<T>>(response, service.read(undefined!));
  };
};

const controllerPut = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.update({
        id: String(request.params.id || request.query.id || request.body.id),
        payload: request.body,
      }),
    );
  };
};

const controllerCut = <T>(service: TService<T>) => {
  return async (request: Request, response: Response) => {
    control<T | null>(
      response,
      service.delete({
        id: String(request.params.id || request.query.id || request.body.id),
      }),
    );
  };
};

export type TController = {
  create: (request: Request, response: Response) => Promise<void>;
  read: (request: Request, response: Response) => Promise<void>;
  update: (request: Request, response: Response) => Promise<void>;
  delete: (request: Request, response: Response) => Promise<void>;
};

export const controller = <T>(service: TService<T>): TController => ({
  create: controllerSet<T>(service),
  read: controllerGet<T>(service),
  update: controllerPut<T>(service),
  delete: controllerCut<T>(service),
});
