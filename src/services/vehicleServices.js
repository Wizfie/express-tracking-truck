import {
  editVehicle,
  getAllVehicle,
  getVehicleById,
  addVehicle,
} from "../model/vehicleModel";

class VehicleService {
  static async addVehicle(vehicle) {
    try {
      const newVehicle = await addVehicle(vehicle);
      return newVehicle;
    } catch (error) {
      throw new Error("Failed to add vehicle");
    }
  }

  static async getAllVehicle() {
    try {
      const vehicle = await getAllVehicle();
      return vehicle;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async editVehicle(vehicleId, vehicle) {
    try {
      const updatedVehicle = await editVehicle(vehicleId, vehicle);
      return updatedVehicle;
    } catch (error) {
      throw new Error("Failed to update vehicle");
    }
  }

  static async getVehicleById(vehicleId) {
    try {
      const vehicle = await getVehicleById(vehicleId);
      return vehicle;
    } catch (error) {
      throw new Error("Failed to fetch vehicle");
    }
  }
}

export default VehicleService;
