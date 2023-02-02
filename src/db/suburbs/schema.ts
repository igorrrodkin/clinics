import { text, pgSchema } from "drizzle-orm-pg";

const schema = pgSchema("clinicsproject");

export const suburbs = schema("suburbs", {
  id: text("id"),
  suburbSlug: text("suburb_slug"),
  suburbName: text("suburb_name"),
  city: text("city"),
  state: text("state"),
  postcode: text("postcode"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  h1: text("h1"),
  h2: text("h2"),
  aboutBookphysio: text("about_bookphysio"),
  nearby1link: text("nearby1_link"),
  nearby1txt: text("nearby1_txt"),
  nearby1state: text("nearby1_state"),
  nearby1postcode: text("nearby1_postcode"),
  nearby2link: text("nearby2_link"),
  nearby2txt: text("nearby2_txt"),
  nearby2state: text("nearby2_state"),
  nearby2postcode: text("nearby2_postcode"),
  nearby3link: text("nearby3_link"),
  nearby3txt: text("nearby3_txt"),
  nearby3state: text("nearby3_state"),
  nearby3postcode: text("nearby3_postcode"),
  nearby4link: text("nearby4_link"),
  nearby4txt: text("nearby4_txt"),
  nearby4state: text("nearby4_state"),
  nearby4postcode: text("nearby4_postcode"),
});
