import LocationController from "../controller/locationController.js";
import express from "express";

class LocationRoutes {
  static setupRoutes() {
    const router = express.Router();

    router.post("/create", LocationController.addLocation);
    router.get("/:tripId", LocationController.getLocationsByTripId);

    return router;
  }
}

export default LocationRoutes.setupRoutes();
