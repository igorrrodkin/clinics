import { RequestHandler } from "express";
import Controller from "./Controller.js";
import { catchAsync } from "../utils/catchAsync.js";
// import { getGeolocationFromAddress } from "../utils/getGeolocation.js";
import Cities from "../db/cities/Cities.js";
import Clinics from "../db/clinics/Clinics.js";
class ClinicsController extends Controller {
  public readonly path: string;

  public constructor(
    path: string,
    public readonly cities: Cities,
    public readonly clinics: Clinics
  ) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/search", this.findMyCity);
    this.router.get("/:citySlug", catchAsync(this.getFullCityInfo));
  };

  public findMyCity: RequestHandler = async (req, res) => {
    const queryParam: { city?: string } = req.query;
    const content = await this.cities.getFullContent(queryParam.city!);
    if (!content!.length) {
      res.status(200).send({
        message: "No cities were found",
      });
    } else {
      const mapped = content!.map((item) => {
        return {
          ...item,
          url: process.env.PROD_URL + "/cities" + item.slug,
        };
      });
      res.status(200).send({
        mapped,
      });
    }
  };

  public getFullCityInfo: RequestHandler = async (req, res) => {
    const citySlug: string = req.params.citySlug;
    const content = await this.cities.getInfoByCitySlug(`/${citySlug}`);
    if (!content) {
      res.status(200).send({
        message: "City not found",
      });
    } else {
      const clinicsInThisCity = await this.clinics.getClinicsByCity(
        content.cityName!
      );
      const mappedClinics = clinicsInThisCity.map((item) => {
        return {
          clinic: item.clinicName,
          url: `${process.env.PROD_URL}/clinics/${
            item.clinicSlug.split("/")[2]
          }`,
          address: item.address,
          email: item.email,
          phone: item.phone,
          website: item.website,
          state: item.state,
        };
      });
      res.status(200).send({
        ...content,
        clinics: mappedClinics,
      });
    }
  };
}

export default ClinicsController;