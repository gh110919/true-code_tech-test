import { json } from "express";
import { files } from "./middleware/files";
import { drop } from "./helpers/drop";
import { crud } from "./middleware/crud";
import { migrate } from "./helpers/migrate";

(async () => {
  const server = (await import("express")).default();
  const cors = (await import("cors")).default;

  server.listen(80, () => {
    try {
      server
        .set("trust proxy", "linklocal")
        .use(cors({ origin: "http://localhost", credentials: true }))
        .use(json())
        .delete("/api/drop", drop)
        .post("/api/migrate", migrate)
        .use("/api/crud", crud(files.endpoints));
      console.log(true);
    } catch (error) {
      console.error(`Исключение экспресс-сервера: ${error}`);
    }
  });
})();
