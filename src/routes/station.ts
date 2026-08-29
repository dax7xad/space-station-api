import { Router } from "express";
import { generateStationPayload } from "../data";

export const stationRouter = Router();

stationRouter.get("/station", (_req, res) => {
  res.json(generateStationPayload());
});
