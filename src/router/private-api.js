import express from "express";
import sessionController from "../controller/session-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);
// users
privateRouter.get("/api/v1/users/profiles/me", userController.get);
privateRouter.patch("/api/v1/users/profiles/me", userController.update);
// sessions
privateRouter.delete("/api/v1/sessions", sessionController.logout);
privateRouter.delete("/api/v1/sessions/all", sessionController.logoutAll);

export {
    privateRouter
};