import "dotenv/config";
import App from "./App.js";
import { pool } from "./db/connection.js";

import { drizzle, NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import ClinicsController from "./controllers/ClinicsController.js";
import Clinics from "./db/clinics/Clinics.js";
import CitiesController from "./controllers/CitiesController.js";
import Cities from "./db/cities/Cities.js";
import SuburbsController from "./controllers/SuburbsController.js";
import Suburbs from "./db/suburbs/Suburbs.js";

const main = async () => {
  const client: NodePgDatabase = drizzle(pool);

  const controllers = [
    new ClinicsController("/clinics", new Clinics(client)),
    new CitiesController("/cities", new Cities(client), new Clinics(client)),
    new SuburbsController("/suburbs", new Suburbs(client)),
  ];
  const port = process.env.PORT_APP || 5000;

  const app = new App(controllers, port);
  app.listen();
};

main();
