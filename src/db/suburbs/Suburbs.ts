import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import { eq, like } from "drizzle-orm/expressions.js";
import { suburbs } from "./schema.js";

class Suburbs {
  public constructor(public db: NodePgDatabase) {}

  public getContentBySuburb = async (suburb: string) => {
    const content = await this.db
      .select(suburbs)
      .fields({
        metaTitle: suburbs.metaTitle,
        suburb: suburbs.suburbName,
        slug: suburbs.suburbSlug,
        city: suburbs.city,
        state: suburbs.state,
        postcode: suburbs.postcode,
      })
      .where(
        like(
          suburbs.suburbName,
          suburb
            .split(" ")
            .map(
              (item) => item.charAt(0).toUpperCase() + item.slice(1)
            ) /* handle both upper and lower case*/
            .join(" ") + "%"
        )
      );
    return content;
  };

  public getFullContentBySlug = async (slug: string) => {
    const content = await this.db
      .select(suburbs)
      .where(eq(suburbs.suburbSlug, slug));
    return content[0];
  };
}

export default Suburbs;
