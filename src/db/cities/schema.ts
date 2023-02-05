import { text, pgSchema } from "drizzle-orm-pg";

const schema = pgSchema("clinicsproject");

export const cities = schema("cities", {
  citySlug: text("city_slug").notNull(),
  cityName: text("city_name").notNull(),
  state: text("state").notNull(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  h1: text("h1").notNull(),
  h2: text("h2").notNull(),
  subHeadingText: text("sub_heading_text").notNull(),
  tick1: text("tick_1").notNull(),
  tick2: text("tick_2").notNull(),
  tick3: text("tick_3").notNull(),
  aboutBookphysio: text("about_bookphysio").notNull(),
});
