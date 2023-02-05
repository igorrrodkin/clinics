import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import { eq, like } from "drizzle-orm/expressions.js";
import { cities } from "./schema.js";

class Cities {
  public constructor(public db: NodePgDatabase) {}

  public getFullContent = async (city: string) => {
    const content = await this.db
      .select(cities)
      .fields({
        city: cities.cityName,
        state: cities.state,
        slug: cities.citySlug,
        metaTitle: cities.metaTitle,
        metaDescription: cities.metaDescription,
      })
      .where(
        like(
          cities.cityName,
          city.charAt(0).toUpperCase() + city.slice(1) + "%"
        )
      );
    return content;
  };

  public getInfoByCitySlug = async (citySlug: string) => {
    const content = await this.db
      .select(cities)
      .where(eq(cities.citySlug, citySlug));
    return content[0];
  };
}

export default Cities;
