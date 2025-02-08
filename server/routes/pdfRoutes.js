import express from "express";
import { GeneratePdf } from "../controllers/PdfController.js";
const Router = express.Router();

Router.post("/generate-pdf", GeneratePdf);

export default Router;
