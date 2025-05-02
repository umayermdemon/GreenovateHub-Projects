import { prisma } from "../../utils/prisma";
import { IAuthUser, IUser } from "./user.interface";
import bcrypt from "bcrypt";

const registerUser = async (payload: IUser) => {
  const { password } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      address: payload.address,
      role: payload.role,
      image: payload.image,
    },
  });
  return result;
};

const getMyProfile = async (user: IAuthUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });
  return userData;
};
const updateUser = async (user: IAuthUser, upadedPayload: Partial<IUser>) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }
  const result = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: upadedPayload,
  });
  return result;
};
const deleteUser = async (user: IAuthUser, deletedId: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const deletedData = await prisma.user.findUniqueOrThrow({
    where: {
      id: deletedId,
      isDeleted: false,
    },
  });
  if (!deletedData) {
    throw new Error("User not exists");
  }
  if (userData.role !== "admin" && userData.id !== deletedId) {
    throw new Error("You are not authorized to delete");
  }

  const result = await prisma.user.update({
    where: {
      id: deletedId,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};
export const userServices = {
  registerUser,
  getMyProfile,
  deleteUser,
  updateUser,
};
