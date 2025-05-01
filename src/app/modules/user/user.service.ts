import { prisma } from "../../utils/prisma";
import { IAuthUser, IUser } from "./user.interface";
import bcrypt from "bcrypt";


const registerUser = async (payload: IUser) => {
    const { password } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.users.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            address: payload.address,
            role: payload.role,
            image: payload.image
        }
    })
    return result
}

const getMyProfile = async (user: IAuthUser) => {
    const userData = await prisma.users.findUnique({
        where: {
            email: user.email,
            isDeleted:false
        }
    })
    return userData
}
const deleteUser = async (user: IAuthUser, deletedId: string) => {
    const userData = await prisma.users.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })
    const deletedData = await prisma.users.findUniqueOrThrow({
        where: {
            id: deletedId,
            isDeleted: false
        }
    })
    if (!deletedData) {
        throw new Error('User not exists')
    }
    if (userData.role !== "ADMIN" && userData.id !== deletedId) {
        throw new Error('You are not authorized to delete');
    }

    const result = await prisma.users.update({
        where: {
            id: deletedId,
            isDeleted:false
        },
        data: {
            isDeleted: true
        }
    })
    return result
}
export const userServices = {
    registerUser,
    getMyProfile,
    deleteUser
}