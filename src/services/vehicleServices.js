import {
  editVehicle,
  getAllVehicle,
  getVehicleById,
  addVehicle,
  findByPlatNumber,
} from "../model/vehicleModel.js";

class VehicleService {
  static async addVehicle(vehicle) {
    try {
      // Cek plat number dulu, baru insert jika belum ada
      const exist = await findByPlatNumber(vehicle.platNumber);
      if (exist) {
        throw new Error("Plate Sudah di gunakan");
      }
      const newVehicle = await addVehicle(vehicle);
      return newVehicle;
    } catch (error) {
      throw new Error("Failed to add vehicle: " + error.message);
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
