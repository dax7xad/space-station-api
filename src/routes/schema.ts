import { Router } from "express";
import { openApiSpec } from "../openapi";

export const schemaRouter = Router();

schemaRouter.get("/schema", (_req, res) => {
  res.json(openApiSpec);
});
