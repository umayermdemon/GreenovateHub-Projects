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
            email: user.email
        }
    })
    return userData
}
export const userServices = {
    registerUser,
    getMyProfile
}