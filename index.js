import "dotenv/config";

import { json } from "express";
import app from "./app.js";
import link from "./controllers/link.js";
import cors from "cors";
import logger from "./utils/logger.js";
import { extractCustomBodyMiddleware } from "./utils/extractCustomBodyMiddleware.js";
import { errorHandlingMiddleware } from "./utils/errorHandlingMiddleware.js";

app.use(cors()).use(json()).use(extractCustomBodyMiddleware()).use(logger());

app.use("/link", link);

app.use(errorHandlingMiddleware());
