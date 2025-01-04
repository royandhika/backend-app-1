import express from "express";
import sessionController from "../controller/session-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);
// sessions
privateRouter.delete("/api/sessions", sessionController.logout);
privateRouter.delete("/api/sessions/all", sessionController.logoutAll);

export {
    privateRouter
};