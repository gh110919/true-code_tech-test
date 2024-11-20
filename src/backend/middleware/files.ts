import endpoints from "../assets/endpoints.json";
import migrate from "../assets/migrate.json";

export type Files = {
  endpoints: typeof endpoints;
  migrate: typeof migrate;
};

export const files: Files = {
  endpoints,
  migrate,
};
