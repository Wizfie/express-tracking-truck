import TripController from "../controller/tripController.js";
import express from "express";

class TripRoutes {
  static setupRoutes() {
    const router = express.Router();

    router.post("/start", TripController.startTrip);
    router.post("/end/:id", TripController.endTrip);
    router.get("/all", TripController.getAllTrips);
    router.get("/:id", TripController.getTripById);
    router.get("/user/:userId", TripController.getTripsByUserId);
    router.get("/vehicle/:vehicleId", TripController.getTripsByVehicleId);

    return router;
  }
}

export default TripRoutes.setupRoutes();
