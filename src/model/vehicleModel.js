import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const addVehicle = async (vehicleData) => {
  return await prisma.vehicle.create({
    data: vehicleData,
  });
};

const editVehicle = async (vehicleId, vehicleData) => {
  return await prisma.vehicle.update({
    data: vehicleData,
    where: { id: vehicleId },
  });
};

const getVehicleById = async (vehicleId) => {
  return await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });
};

const getAllVehicle = async () => {
  return await prisma.vehicle.findMany();
};

export { addVehicle, editVehicle, getVehicleById, getAllVehicle };
