import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

class LocationModel {
  static async addLocation(locationData) {
    return await prisma.location.create({
      data: {
        tripId: locationData.tripId,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      },
    });
  }

  static async getLocationsByTripId(tripId) {
    return await prisma.location.findMany({
      where: {
        tripId: tripId,
      },
    });
  }
}

export default LocationModel;
