// import { eq } from "drizzle-orm/expressions.js";
// import { clinics } from "./schema.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import { clinics } from "./schema";

class Clinics {
  public constructor(public db: NodePgDatabase) {}

  public getFullContent = async () => {
    const content = await this.db.select(clinics).fields({
      longNameVersion: clinics.longNameVersion,
      fullAddress: clinics.fullAddress,
      city: clinics.city,
      website: clinics.website,
      phone: clinics.phone,
    });
    return content;
  };
}

export default Clinics;
