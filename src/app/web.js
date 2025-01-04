import express from "express";
import cookieParser from 'cookie-parser';
import { publicRouter } from "../router/public-api.js";
import { privateRouter } from "../router/private-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

web.use(express.json());
web.use(cookieParser());
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);