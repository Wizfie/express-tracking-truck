import express from "express";
import VehicleController from "../controller/vehicleController.js";
import { addValidator } from "../validator/vehicleValidator.js";
import handleValidationError from "../validator/handleValidator.js";
class VehicleRouter {
  static setupRoutes() {
    const router = express.Router();

    router.post(
      "/add",
      addValidator,
      handleValidationError,
      VehicleController.addVehicle
    );

    router.get("/get", VehicleController.getAllVehicle);
    router.get("/get/:id", VehicleController.getVehicleById);
    router.put(
      "/update/:id",
      addValidator,
      handleValidationError,
      VehicleController.editVehicle
    );

    return router;
  }
}

export default VehicleRouter.setupRoutes();
