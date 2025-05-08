import TripService from "../services/tripServices.js";

class TripController {
  static async startTrip(req, res) {
    const trip = req.body;
    try {
      const newTrip = await TripService.startTrip(trip);
      res.status(201).json({
        message: "Trip started successfully",
        trip: newTrip,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async endTrip(req, res) {
    const tripId = req.params.id;
    try {
      const updatedTrip = await TripService.endTrip(tripId);
      res.status(200).json({
        message: "Trip ended successfully",
        trip: updatedTrip,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getTripById(req, res) {
    const tripId = req.params.id;
    try {
      const trip = await TripService.getTripById(tripId);
      res.status(200).json({
        message: "Trip fetched successfully",
        trip: trip,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getAllTrips(req, res) {
    try {
      const trips = await TripService.getAllTrips();
      res.status(200).json({
        message: "All trips fetched successfully",
        trips: trips,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getTripsByUserId(req, res) {
    const userId = req.params.userId;
    try {
      const trips = await TripService.getTripsByUserId(userId);
      res.status(200).json({
        message: "Trips fetched successfully",
        trips: trips,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getTripsByVehicleId(req, res) {
    const vehicleId = req.params.vehicleId;
    try {
      const trips = await TripService.getTripsByVehicleId(vehicleId);
      res.status(200).json({
        message: "Trips fetched successfully",
        trips: trips,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default TripController;
