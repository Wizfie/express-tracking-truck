import VehicleService from "../services/vehicleServices.js";

class VehicleController {
  static async addVehicle(req, res) {
    const vehicle = req.body;

    try {
      const vehicleData = await VehicleService.addVehicle(vehicle);

      res.status(201).json({
        message: "Vehicle added successfully",
        vehicle: vehicleData,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getAllVehicle(_req, res) {
    try {
      const vehicles = await VehicleService.getAllVehicle();
      res.status(200).json({
        message: "Vehicles fetched successfully",
        vehicles,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async editVehicle(req, res) {
    const vehicleId = req.params.id;
    const vehicle = req.body;

    try {
      const updatedVehicle = await VehicleService.editVehicle(
        vehicleId,
        vehicle
      );
      res.status(200).json({
        message: "Vehicle updated successfully",
        vehicle: updatedVehicle,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getVehicleById(req, res) {
    const vehicleId = req.params.id;

    try {
      const vehicle = await VehicleService.getVehicleById(vehicleId);
      res.status(200).json({
        message: "Vehicle fetched successfully",
        vehicle,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default VehicleController;
