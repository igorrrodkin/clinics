import { RequestHandler } from "express";
import Controller from "./Controller.js";
import { catchAsync } from "../utils/catchAsync.js";
import Clinics from "../db/clinics/Clinics.js";
class ClinicsController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly clinics: Clinics) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/", catchAsync(this.getAllClinics));
  };

  public getAllClinics: RequestHandler = async (req, res) => {
    const content = await this.clinics.getFullContent();
    res.status(200).send({
      content,
    });
  };
}

export default ClinicsController;
