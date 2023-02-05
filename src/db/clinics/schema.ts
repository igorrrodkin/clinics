import { text, pgSchema } from "drizzle-orm-pg";

const schema = pgSchema("clinicsproject");

export const clinics = schema("clinics", {
  longNameVersion: text("long_name_version").notNull(),
  typeformRegistrationLink: text("typeform_registration_link").notNull(),
  pms: text("pms").notNull(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  slug: text("slug").notNull(),
  website: text("website").notNull(),
  clinicName: text("clinic_name").notNull(),
  displayOnWeb: text("display_on_web").notNull(),
  linkToClinicSuburbPage: text("link_to_clinic_suburb_page").notNull(),
  fullAddress: text("full_address").notNull(),
  city: text("city").notNull(),
  suburb: text("suburb").notNull(),
  state: text("state").notNull(),
  postcode: text("postcode").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  nearby1txt: text("nearby1_txt").notNull(),
  nearby1link: text("nearby1_link").notNull(),
  nearby2txt: text("nearby2_txt").notNull(),
  nearby2link: text("nearby2_link").notNull(),
  nearby3txt: text("nearby3_txt").notNull(),
  nearby3link: text("nearby3_link").notNull(),
  nearby4txt: text("nearby4_txt").notNull(),
  nearby4link: text("nearby4_link").notNull(),
  aboutClinic: text("about_clinic").notNull(),
});
