import LocationService from "../services/locationService.js";

class LocationController {
  static async addLocation(req, res) {
    try {
      const locationData = req.body;
      const location = await LocationService.addLocation(locationData);
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getLocationsByTripId(req, res) {
    try {
      const tripId = req.params.tripId;
      const locations = await LocationService.getLocationsByTripId(
        parseInt(tripId)
      );
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export default LocationController;
