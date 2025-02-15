import express from "express";
import userController from "../controller/user-controller.js";
// import sessionController from "../controller/session-controller.js";
// import propertyController from "../controller/property-controller.js";
import usersessionController from "../controller/usersession-controller.js";

const publicRouter = new express.Router();
// users
publicRouter.post("/v1/users", userController.register);
// sessions
publicRouter.post("/v1/sessions", usersessionController.login);
publicRouter.post("/v1/sessions/refresh", usersessionController.refresh);
// properties
// publicRouter.get("/api/v1/properties", propertyController.getAll);
// publicRouter.get("/api/v1/properties/:propertyId", propertyController.get);

export { publicRouter };
