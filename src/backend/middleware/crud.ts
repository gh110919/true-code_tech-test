import { Router } from "express";
import { router } from "../logic/router";
import { controller } from "../logic/controller";
import { model } from "../logic/model";
import { service } from "../logic/service";

type TEndpoint = {
  endpoint: string; // Определяем тип данных для endpoint.
  table: string; // Определяем тип данных для table.
};

export const crud = (endpoints: TEndpoint[]): Router[] => {
  return endpoints.map(({ endpoint, table }): Router => {
    // Проходим по массиву endpoints и возвращаем массив маршрутов.
    return router(endpoint, controller(service(model(table)))); // Создаем маршрутизатор, передавая endpoint и контроллер, который использует сервис и модель.
  });
};
