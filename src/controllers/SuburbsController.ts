import { RequestHandler } from "express";
import Controller from "./Controller.js";
import { catchAsync } from "../utils/catchAsync.js";
// import Clinics from "../db/clinics/Clinics.js";
// import { clinicContent, clinicQueryparams } from "../dtos/interfaces.js";
// import { getGeolocationFromAddress } from "../utils/getGeolocation.js";
import Suburbs from "../db/suburbs/Suburbs.js";

class SuburbsController extends Controller {
  public readonly path: string;

  public constructor(path: string, public readonly suburbs: Suburbs) {
    super("");
    this.path = path;
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get("/search", catchAsync(this.getAllSuburbs));
    this.router.get(
      "/:state/:suburbSlug",
      catchAsync(this.getSuburbContentBySlug)
    );
  };

  public getAllSuburbs: RequestHandler = async (req, res) => {
    const queryParam: { suburb?: string } = req.query;
    const suburb = queryParam.suburb;
    const content = await this.suburbs.getContentBySuburb(suburb!);
    if (!content.length) {
      res.status(200).send({
        message: "Suburbs were not found",
      });
    } else {
      const mappedContent = content.map((item) => {
        return {
          metaTitle: item.metaTitle,
          suburb: item.suburb,
          url: `${process.env.PROD_URL}/suburbs/${item.slug}`,
          city: item.city,
          state: item.state,
          postcode: item.postcode,
        };
      });
      res.status(200).send({
        content: mappedContent,
      });
    }
  };
  public getSuburbContentBySlug: RequestHandler = async (req, res) => {
    const state = req.params.state.toLowerCase();
    const slug = req.params.suburbSlug;
    const content = await this.suburbs.getFullContentBySlug(`${state}/${slug}`);
    if (!content) {
      res.status(200).send({
        message: "Suburbs was not found",
      });
    } else {
      res.status(200).send({
        content,
      });
    }
  };
}

export default SuburbsController;
