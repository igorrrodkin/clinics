// import { eq } from "drizzle-orm/expressions.js";
// import { suburbs } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";

class Suburbs {
  public constructor(public db: NodePgDatabase) {}
}

export default Suburbs;
