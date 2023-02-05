import { RequestHandler } from "express";
import Controller from "./Controller.js";
import { catchAsync } from "../utils/catchAsync.js";
import Clinics from "../db/clinics/Clinics.js";
import { clinicContent, clinicQueryparams } from "../dtos/interfaces.js";
import { getGeolocationFromAddress } from "../utils/getGeolocation.js";
class ClinicsController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly clinics: Clinics) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/search", catchAsync(this.getAllClinics));
    this.router.get("/:clinicSlug", catchAsync(this.getClinicFullInfo));
  };

  public getAllClinics: RequestHandler = async (req, res) => {
    const queryParam: clinicQueryparams = req.query;
    let content: clinicContent[] | undefined;
    switch (Object.keys(queryParam)[0]) {
      case "city":
        content = await this.clinics.getContentByCity(queryParam.city!);
        break;
      case "zip":
        content = await this.clinics.getContentByZIPcode(queryParam.zip!);
        break;
      case "clinicName":
        content = await this.clinics.getContentByClinicName(
          queryParam.clinicName!
        );
        break;
      case "state":
        content = await this.clinics.getContentByState(queryParam.state!);
        break;
      case "suburb":
        content = await this.clinics.getContentBySuburb(queryParam.suburb!);
        break;
    }
    if (!content!.length) {
      res.status(200).send({
        message: "No clinics were found",
      });
    } else {
      const mapped = await Promise.all(
        content!.map(async (item) => {
          const location = await getGeolocationFromAddress(item.address!);
          return { ...item, location };
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
      "/clinic/" + clinicSlug
    );
    const location = await getGeolocationFromAddress(content.fullAddress);
    // const
    if (!content) {
      res.status(200).send({
        message: "Clinic was not found",
      });
    } else {
      res.status(200).send({
        content,
      });
    }
  };
}

export default ClinicsController;
