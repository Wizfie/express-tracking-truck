import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

const addVehicle = async (vehicleData) => {
  return await prisma.vehicle.create({
    data: vehicleData,
  });
};

const findByPlatNumber = async (platNumber) => {
  return await prisma.findUnique({
    data: platNumber,
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

export {
  addVehicle,
  editVehicle,
  getVehicleById,
  getAllVehicle,
  findByPlatNumber,
};
