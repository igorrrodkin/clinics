import { text, pgSchema } from "drizzle-orm-pg";

const schema = pgSchema("clinicsproject");

export const suburbs = schema("suburbs", {
  id: text("id").notNull(),
  suburbSlug: text("suburb_slug").notNull(),
  suburbName: text("suburb_name").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postcode: text("postcode").notNull(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  h1: text("h1").notNull(),
  h2: text("h2").notNull(),
  aboutBookphysio: text("about_bookphysio").notNull(),
  nearby1link: text("nearby1_link").notNull(),
  nearby1txt: text("nearby1_txt").notNull(),
  nearby1state: text("nearby1_state").notNull(),
  nearby1postcode: text("nearby1_postcode").notNull(),
  nearby2link: text("nearby2_link").notNull(),
  nearby2txt: text("nearby2_txt").notNull(),
  nearby2state: text("nearby2_state").notNull(),
  nearby2postcode: text("nearby2_postcode").notNull(),
  nearby3link: text("nearby3_link").notNull(),
  nearby3txt: text("nearby3_txt").notNull(),
  nearby3state: text("nearby3_state").notNull(),
  nearby3postcode: text("nearby3_postcode").notNull(),
  nearby4link: text("nearby4_link").notNull(),
  nearby4txt: text("nearby4_txt").notNull(),
  nearby4state: text("nearby4_state").notNull(),
  nearby4postcode: text("nearby4_postcode").notNull(),
});
