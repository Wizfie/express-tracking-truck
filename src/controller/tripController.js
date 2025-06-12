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
      const trip = await TripService.getTripById(parseInt(tripId));
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

  static async getTrips(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const sortBy = req.query.sortBy || "startTime";
      const sortOrder = req.query.sortOrder || "desc";
      const status = req.query.status || null;
      const { trips, total } = await TripService.getTrips({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        status,
      });
      res.status(200).json({
        message: "Trips fetched successfully",
        trips,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getTripsByUserId(req, res) {
    const userId = req.params.userId;
    const filterActive = req.query.active === "true";
    try {
      const trips = await TripService.getTripsByUserId(userId, filterActive);
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

  static async getActiveTripByUserId(req, res) {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    try {
      const trip = await TripService.getActiveTripByUserId(userId);
      res.status(200).json({
        message: "Active trip fetched successfully",
        trip: trip,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default TripController;
