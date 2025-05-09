import LocationModel from "../model/locationModel.js";

class LocationService {
  static async addLocation(locationData) {
    try {
      const location = await LocationModel.addLocation(locationData);
      return location;
    } catch (error) {
      throw new Error("Error adding location: " + error.message);
    }
  }

  static async getLocationsByTripId(tripId) {
    try {
      const locations = await LocationModel.getLocationsByTripId(tripId);
      return locations;
    } catch (error) {
      throw new Error("Error fetching locations: " + error.message);
    }
  }
}

export default LocationService;
