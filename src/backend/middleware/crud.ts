import { Router } from "express";
import { controller } from "../logic/controller";
import { model } from "../logic/model";
import { router } from "../logic/router";
import { service } from "../logic/service";

type TEndpoint = {
  endpoint: string;
  table: string;
};

export const crud = (endpoints: TEndpoint[]): Router[] => {
  return endpoints.map(({ endpoint, table }): Router => {
    return router(endpoint, controller(service(model(table))));
  });
};
