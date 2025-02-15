import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
// import sessionController from "../controller/session-controller.js";
// import propertyController from "../controller/property-controller.js";
import usersessionController from "../controller/usersession-controller.js";
import productController from "../controller/product-controller.js";
import orderController from "../controller/order-controller.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);
// users
privateRouter.get("/v1/users/profiles/me", userController.getProfile);
privateRouter.patch("/v1/users/profiles/me", userController.updateProfile);
privateRouter.post("/v1/users/addresses", userController.postAddress);
privateRouter.get("/v1/users/addresses/me", userController.getAddress);
privateRouter.get("/api/v1/users/properties", userController.getAllProperty);
privateRouter.get("/api/v1/users/properties/:propertyId", userController.getProperty);
// sessions
privateRouter.delete("/v1/sessions", usersessionController.logout);
privateRouter.delete("/v1/sessions/all", usersessionController.logoutAll);
// properties
// privateRouter.post("/api/v1/properties", propertyController.post);
// privateRouter.patch("/api/v1/properties/:propertyId", propertyController.update);
// privateRouter.delete("/api/v1/properties/:propertyId", propertyController.remove);
// privateRouter.post("/api/v1/properties/:propertyId/bookings", propertyController.postBooking);
// products
privateRouter.get("/v1/products", productController.getProduct);
privateRouter.get("/v1/products/:productId", productController.getProductDetail);
privateRouter.post("/v1/products", productController.postProduct);
// orders
privateRouter.post("/v1/orders", orderController.postOrderItem);

export { privateRouter };
