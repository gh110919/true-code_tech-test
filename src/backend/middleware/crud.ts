import { Router } from "express"; // Импортируем Router из express для создания маршрутов.
import { controller } from "../logic/controller"; // Импортируем контроллер из logic/controller.
import { model } from "../logic/model"; // Импортируем модель из logic/model.
import { router } from "../logic/router"; // Импортируем маршрутизатор из logic/router.
import { service } from "../logic/service"; // Импортируем сервис из logic/service.

type TEndpoint = {
  endpoint: string; // Определяем тип данных для endpoint.
  table: string; // Определяем тип данных для table.
};

export const crud = (endpoints: TEndpoint[]): Router[] => {
  return endpoints.map(({ endpoint, table }): Router => { // Проходим по массиву endpoints и возвращаем массив маршрутов.
    return router(endpoint, controller(service(model(table)))); // Создаем маршрутизатор, передавая endpoint и контроллер, который использует сервис и модель.
  });
};
