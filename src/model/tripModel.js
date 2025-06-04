import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

class TripModel {
  static async startTrip(trip) {
    try {
      const newTrip = await prisma.trip.create({
        data: {
          userId: trip.userId,
          vehicleId: trip.vehicleId,
          startTime: new Date(),
          status: "ACTIVE", // pastikan status diisi saat start trip
        },
      });
      return newTrip;
    } catch (error) {
      throw new Error("Failed to start trip" + error.message);
    }
  }

  static async endTrip(tripId) {
    try {
      const updatedTrip = await prisma.trip.update({
        where: { id: tripId },
        data: {
          endTime: new Date(),
          status: "FINISH",
        },
      });
      return updatedTrip;
    } catch (error) {
      throw new Error("Failed to end trip" + error.message);
    }
  }

  static async getTripById(tripId) {
    if (!tripId) throw new Error("tripId is required");
    try {
      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      });
      return trip;
    } catch (error) {
      throw new Error("Failed to get trip" + error.message);
    }
  }

  static async getAllTrips() {
    try {
      const trips = await prisma.trip.findMany();
      return trips;
    } catch (error) {
      throw new Error("Failed to get all trips" + error.message);
    }
  }
  static async getTripsByUserId(userId, filterActive = false) {
    try {
      const where = { userId: parseInt(userId) };
      if (filterActive) {
        where.status = "ACTIVE";
        where.endTime = null;
      }
      const trips = await prisma.trip.findMany({
        where,
        include: { vehicle: true },
      });
      return trips;
    } catch (error) {
      throw new Error("Failed to get trips by user ID" + error.message);
    }
  }

  static async getTripsByVehicleId(vehicleId) {
    try {
      const trips = await prisma.trip.findMany({
        where: { vehicleId: vehicleId },
      });
      return trips;
    } catch (error) {
      throw new Error("Failed to get trips by vehicle ID" + error.message);
    }
  }

  static async getActiveTripByUserId(userId) {
    try {
      const trip = await prisma.trip.findFirst({
        where: {
          userId: userId,
          endTime: null,
          status: "ACTIVE",
        },
        orderBy: { startTime: "desc" },
        include: { vehicle: true },
      });
      return trip;
    } catch (error) {
      throw new Error("Failed to get active trip by user ID: " + error.message);
    }
  }
}

export default TripModel;
