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
      const trip = await getTripById(tripId);
      return trip;
    } catch (error) {
      throw new Error("Failed to get trip" + error.message);
    }
  }

  static async getAllTrips() {
    try {
      const trips = await getAllTrips();
      return trips;
    } catch (error) {
      throw new Error("Failed to get all trips" + error.message);
    }
  }

  static async getTripsByUserId(userId) {
    try {
      const trips = await getTripsByUserId(userId);
      return trips;
    } catch (error) {
      throw new Error("Failed to get trips by user ID" + error.message);
    }
  }

  static async getTripsByVehicleId(vehicleId) {
    try {
      const trips = await getTripsByVehicleId(vehicleId);
      return trips;
    } catch (error) {
      throw new Error("Failed to get trips by vehicle ID" + error.message);
    }
  }
}

export default TripService;
