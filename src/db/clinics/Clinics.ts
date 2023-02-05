import { like, eq } from "drizzle-orm/expressions.js";
import { NodePgDatabase } from "drizzle-orm-pg/node/index.js";
import { clinics } from "./schema.js";

class Clinics {
  public constructor(public db: NodePgDatabase) {}

  public getFullContent = async () => {
    const content = await this.db.select(clinics);
    return content;
  };

  public getContentByClinicName = async (clinicName: string) => {
    const content = await this.db
      .select(clinics)
      .fields({
        clinicName: clinics.clinicName,
        clinicSlug: clinics.slug,
        address: clinics.fullAddress,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        zip: clinics.postcode,
        email: clinics.email,
        state: clinics.state,
        city: clinics.city,
        about: clinics.aboutClinic,
      })
      .where(
        like(
          clinics.clinicName,
          clinicName.charAt(0).toUpperCase() + clinicName.slice(1) + "%"
        )
      );
    return content;
  };

  public getContentByCity = async (city: string) => {
    const content = await this.db
      .select(clinics)
      .fields({
        clinicName: clinics.clinicName,
        clinicSlug: clinics.slug,
        address: clinics.fullAddress,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        zip: clinics.postcode,
        email: clinics.email,
        state: clinics.state,
        city: clinics.city,
        about: clinics.aboutClinic,
      })
      .where(
        like(clinics.city, city.charAt(0).toUpperCase() + city.slice(1) + "%")
      );
    return content;
  };

  public getContentByZIPcode = async (postcode: string) => {
    const content = await this.db
      .select(clinics)
      .fields({
        clinicName: clinics.clinicName,
        clinicSlug: clinics.slug,
        address: clinics.fullAddress,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        zip: clinics.postcode,
        email: clinics.email,
        state: clinics.state,
        city: clinics.city,
        about: clinics.aboutClinic,
      })
      .where(like(clinics.postcode, postcode + "%"));
    return content;
  };

  public getContentBySuburb = async (suburb: string) => {
    const content = await this.db
      .select(clinics)
      .fields({
        clinicName: clinics.clinicName,
        clinicSlug: clinics.slug,
        address: clinics.fullAddress,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        zip: clinics.postcode,
        email: clinics.email,
        state: clinics.state,
        city: clinics.city,
        about: clinics.aboutClinic,
      })
      .where(
        like(
          clinics.suburb,
          suburb.charAt(0).toUpperCase() + suburb.slice(1) + "%"
        )
      );
    return content;
  };

  public getContentByState = async (state: string) => {
    const content = await this.db
      .select(clinics)
      .fields({
        clinicName: clinics.clinicName,
        clinicSlug: clinics.slug,
        address: clinics.fullAddress,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        zip: clinics.postcode,
        email: clinics.email,
        state: clinics.state,
        city: clinics.city,
        about: clinics.aboutClinic,
      })
      .where(
        like(
          clinics.state,
          state.charAt(0).toUpperCase() + state.slice(1) + "%"
        )
      );
    return content;
  };

  public getFullInfoByClinicSlug = async (clinicSlug: string) => {
    const content = await this.db
      .select(clinics)
      .where(eq(clinics.slug, clinicSlug));
    return content[0];
  };

  public getClinicsByCity = async (city: string) => {
    const content = await this.db
      .select(clinics)
      .fields({
        clinicName: clinics.clinicName,
        clinicSlug: clinics.slug,
        address: clinics.fullAddress,
        website: clinics.website,
        phone: clinics.phone,
        email: clinics.email,
        state: clinics.state,
      })
      .where(eq(clinics.city, city));
    return content;
  };
}

export default Clinics;
