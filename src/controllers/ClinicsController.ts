import { RequestHandler } from "express";
import Controller from "./Controller.js";
import { catchAsync } from "../utils/catchAsync.js";
import Clinics from "../db/clinics/Clinics.js";
import { clinicContent, clinicQueryparams } from "../dtos/interfaces.js";
// import { getGeolocationFromAddress } from "../utils/getGeolocation.js";
import { getGeolocationGoogleService } from "../utils/getGeoGoogleMaps.js";
class ClinicsController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly clinics: Clinics) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/search", this.getAllClinics);
    this.router.get("/:clinicSlug", catchAsync(this.getClinicFullInfo));
  };

  public getAllClinics: RequestHandler = async (req, res) => {
    const queryParam: clinicQueryparams = req.query;
    let content: clinicContent[] | undefined;
    let fullContent: clinicContent[] | undefined;
    switch (Object.keys(queryParam)[0]) {
      case "city":
        content = await this.clinics.getContentByCity(queryParam.city!);
        break;
      case "zip":
        content = await this.clinics.getContentByZIPcode(queryParam.zip!);
        break;
      case "clinicName":
        // content = await this.clinics.getContentByClinicName(
        //   queryParam.clinicName!
        // );
        fullContent = await this.clinics.getContent();
        content = fullContent.filter((item) => {
          return item.clinicName
            .replace(/\s+/g, "")
            .replace("&", "and")
            .toLowerCase()
            .includes(queryParam.clinicName!.toLowerCase());
        });
        break;
      case "state":
        content = await this.clinics.getContentByState(queryParam.state!);
        break;
      case "suburb":
        // content = await this.clinics.getContentBySuburb(queryParam.suburb!);
        fullContent = await this.clinics.getContent();
        content = fullContent.filter((item) => {
          return item.suburb
            .replace(/\s+/g, "")
            .replace("&", "and")
            .toLowerCase()
            .includes(queryParam.suburb!.toLowerCase());
        });
        break;
    }
    if (!content!.length) {
      res.status(404).send({
        message: "No clinics were found",
      });
    } else {
      const mapped = await Promise.all(
        content!.map(async (item) => {
          const location = await getGeolocationGoogleService(item.address!);
          return {
            ...item,
            location,
            url: `${process.env.PROD_URL}/clinics/${
              item.clinicSlug.split("/")[2]
            }`,
          };
        })
      );
      res.status(200).send({
        mapped,
      });
    }
  };

  public getClinicFullInfo: RequestHandler = async (req, res) => {
    const clinicSlug = req.params.clinicSlug;
    const content = await this.clinics.getFullInfoByClinicSlug(
      `/clinic/${clinicSlug}`
    );
    if (!content) {
      res.status(404).send({
        message: "Clinic was not found",
      });
    } else {
      const location = await getGeolocationGoogleService(content.fullAddress);
      const nearbySuburbs = [
        { name: content.nearby1txt, slug: content.nearby1link },
        { name: content.nearby2txt, slug: content.nearby2link },
        { name: content.nearby3txt, slug: content.nearby3link },
        { name: content.nearby4txt, slug: content.nearby4link },
      ].map((item) => {
        return {
          url: `${process.env.PROD_URL}/suburbs/${item.slug}`,
          name: item.name,
        };
      });

      res.status(200).send({
        longNameVersion: content.longNameVersion,
        metaTitle: content.metaTitle,
        metaDescription: content.metaDescription,
        aobutClinic: content.aboutClinic,
        website: content.website,
        registrationLink: content.typeformRegistrationLink,
        displayOnWeb: content.displayOnWeb,
        address: content.fullAddress,
        city: content.city,
        state: content.state,
        postcode: content.postcode,
        email: content.email,
        phone: content.phone,
        location,
        suburb: content.suburb,
        linkToTheSuburb: `${process.env.PROD_URL}/suburbs/${content.linkToClinicSuburbPage}`,
        nearbySuburbs: nearbySuburbs,
      });
    }
  };
}

export default ClinicsController;
