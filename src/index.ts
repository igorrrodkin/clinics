import "dotenv/config";
import App from "./App.js";
import { pool } from "./db/connection.js";

import { drizzle, NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import ClinicsController from "./controllers/ClinicsController.js";
import Clinics from "./db/clinics/Clinics.js";

const main = async () => {
  const client: NodePgDatabase = drizzle(pool);

  const controllers = [new ClinicsController("/clinics", new Clinics(client))];
  const port = process.env.PORT_APP || 5000;

  const app = new App(controllers, port);
  app.listen();
};

main();
