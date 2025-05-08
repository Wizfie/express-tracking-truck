import express from "express";
import VehicleController from "../controller/vehicleController.js";
import { addValidator } from "../validator/vehicleValidator.js";
import handleValidationError from "../validator/handleValidator.js";
import { verifyAuth } from "../utils/jwt.js";
class VehicleRouter {
  static setupRoutes() {
    const router = express.Router();

    router.post(
      "/add",
      verifyAuth,
      addValidator,
      handleValidationError,
      VehicleController.addVehicle
    );

    router.put(
      "/update/:id",
      verifyAuth,
      addValidator,
      handleValidationError,
      VehicleController.editVehicle
    );

    router.get("/all", VehicleController.getAllVehicle);

    router.get("/:id", VehicleController.getVehicleById);

    return router;
  }
}

export default VehicleRouter.setupRoutes();
