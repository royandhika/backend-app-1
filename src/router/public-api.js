import express from "express";
import userController from "../controller/user-controller.js";
import sessionController from "../controller/session-controller.js";
import propertyController from "../controller/property-controller.js";

const publicRouter = new express.Router();
// users
publicRouter.post("/api/v1/users", userController.register);
// sessions
publicRouter.post("/api/v1/sessions", sessionController.login);
publicRouter.post("/api/v1/sessions/refresh", sessionController.refresh);
// properties
publicRouter.get("/api/v1/properties", propertyController.getAll);
publicRouter.get("/api/v1/properties/:propertyId", propertyController.get);

export {
    publicRouter
};