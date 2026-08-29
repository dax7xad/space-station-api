import express from "express";
import { healthRouter } from "./routes/health";
import { schemaRouter } from "./routes/schema";
import { stationRouter } from "./routes/station";

export const app = express();

app.use(express.json());
app.use(healthRouter);
app.use(stationRouter);
app.use(schemaRouter);
