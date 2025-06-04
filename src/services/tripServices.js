import TripModel from "../model/tripModel.js";
class TripService {
  static async startTrip(trip) {
    try {
      const newTrip = await TripModel.startTrip(trip);
      return newTrip;
    } catch (error) {
      throw new Error("Failed to start trip" + error.message);
    }
  }

  static async endTrip(tripId) {
    try {
      const updatedTrip = await TripModel.endTrip(parseInt(tripId));
      return updatedTrip;
    } catch (error) {
      throw new Error("Failed to end trip" + error.message);
    }
  }

  static async getTripById(tripId) {
    try {
      const trip = await TripModel.getTripById(tripId);
      return trip;
    } catch (error) {
      throw new Error("Failed to get trip" + error.message);
    }
  }

  static async getAllTrips() {
    try {
      const trips = await TripModel.getAllTrips();
      return trips;
    } catch (error) {
      throw new Error("Failed to get all trips" + error.message);
    }
  }

  static async getTripsByUserId(userId, filterActive = false) {
    try {
      const trips = await TripModel.getTripsByUserId(userId, filterActive);
      return trips;
    } catch (error) {
      throw new Error("Failed to get trips by user ID" + error.message);
    }
  }

  static async getTripsByVehicleId(vehicleId) {
    try {
      const trips = await TripModel.getTripsByVehicleId(parseInt(vehicleId));
      return trips;
    } catch (error) {
      throw new Error("Failed to get trips by vehicle ID" + error.message);
    }
  }

  static async getActiveTripByUserId(userId) {
    try {
      const trip = await TripModel.getActiveTripByUserId(userId);

      return trip;
    } catch (error) {
      throw new Error("Failed to get active trip by user ID: " + error.message);
    }
  }
}

export default TripService;
