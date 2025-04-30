import config from "../../config";
import { jwtHelpers } from "../../utils/jwt.helpers";
import { prisma } from "../../utils/prisma"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { IAuthUser } from "../user/user.interface";
import sendEmail from "./sendEmail";

const login = async (payload: { email: string, password: string }) => {
    const userData = await prisma.users.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const isCorrectPassword = await bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password doesnot match")
    }
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt_secret as string,
        config.jwt_expaires_in as string
    )
    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expaires_in as string
    )

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: userData.needsPasswordChange
    }
}
const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwt.verify(token, config.jwt_refresh_secret as string)
    } catch (err) {
        throw new Error("You are not authorized")
    }
    if (typeof decodedData === 'string' || !('email' in decodedData)) {
        throw new Error("Invalid token payload");
    }
    const userData = await prisma.users.findUniqueOrThrow({
        where: {
            email: decodedData.email
        }
    })
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.jwt_secret as string,
        config.jwt_expaires_in as string
    )
    return { accessToken }
}

const changePassword = async (user: IAuthUser, payload: { oldPassword: string, newPassword: string }) => {
    const userData = await prisma.users.findUniqueOrThrow({
        where: {
            email: user?.email,
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }

    const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

    await prisma.users.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword,
            needsPasswordChange: false
        }
    })

    return {
        message: "Password changed successfully!"
    }
};

const forgotPassword = async (payload: { email: string }) => {
    const userData = await prisma.users.findUniqueOrThrow({
        where: {
            email: payload.email,
        }
    });

    const resetPassToken = jwtHelpers.generateToken(
        { email: userData.email, role: userData.role },
        config.reset_password_secret as string,
        config.reset_password_expairs_in as string
    )
    //console.log(resetPassToken)

    const resetPassLink = config.reset_passoword_link + `?userId=${userData.id}&token=${resetPassToken}`

    await sendEmail(
        userData.email,
        `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `
    )
    //console.log(resetPassLink)
};

export const AuthServices = {
    login,
    refreshToken,
    changePassword,
    forgotPassword
}