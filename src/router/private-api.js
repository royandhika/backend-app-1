import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import sessionController from "../controller/session-controller.js";
import propertyController from "../controller/property-controller.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);
// users
privateRouter.get("/api/v1/users/profiles/me", userController.getProfile);
privateRouter.patch("/api/v1/users/profiles/me", userController.updateProfile);
privateRouter.get("/api/v1/users/properties", userController.getAllProperty);
privateRouter.get("/api/v1/users/properties/:propertyId", userController.getProperty);
// sessions
privateRouter.delete("/api/v1/sessions", sessionController.logout);
privateRouter.delete("/api/v1/sessions/all", sessionController.logoutAll);
// properties
privateRouter.post("/api/v1/properties", propertyController.post);
privateRouter.patch("/api/v1/properties/:propertyId", propertyController.update);
privateRouter.delete("/api/v1/properties/:propertyId", propertyController.remove);

export {
    privateRouter
};