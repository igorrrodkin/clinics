import { text, pgSchema } from "drizzle-orm-pg";

const schema = pgSchema("clinicsproject");

export const clinics = schema("clinics", {
  longNameVersion: text("long_name_version"),
  typeformRegistrationLink: text("typeform_registration_link"),
  pms: text("pms"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  slug: text("slug"),
  website: text("website"),
  clinicName: text("clinic_name"),
  displayOnWeb: text("display_on_web"),
  linkToClinicSuburbPage: text("link_to_clinic_suburb_page"),
  fullAddress: text("full_address"),
  city: text("city"),
  suburb: text("suburb"),
  state: text("state"),
  postcode: text("postcode"),
  email: text("email"),
  phone: text("phone"),
  nearby1txt: text("nearby1_txt"),
  nearby1link: text("nearby1_link"),
  nearby2txt: text("nearby2_txt"),
  nearby2link: text("nearby2_link"),
  nearby3txt: text("nearby3_txt"),
  nearby3link: text("nearby3_link"),
  nearby4txt: text("nearby4_txt"),
  nearby4link: text("nearby4_link"),
  aboutClinic: text("about_clinic"),
});
