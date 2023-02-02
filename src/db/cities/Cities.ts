import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";

class Cities {
  public constructor(public db: NodePgDatabase) {}
}

export default Cities;
