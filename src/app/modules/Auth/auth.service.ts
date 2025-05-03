import config from "../../config";
import { jwtHelpers } from "../../utils/jwt.helpers";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuthUser } from "../user/user.interface";
import sendEmail from "./sendEmail";

const login = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password doesn't match");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_secret as string,
    (config.jwt_expires_in as string) || "1d"
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_refresh_secret as string,
    (config.jwt_refresh_expires_in as string) || "1d"
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userData.needsPasswordChange,
    role: userData.role,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwt.verify(token, config.jwt_refresh_secret as string);
  } catch (err) {
    throw new Error("You are not authorized");
  }
  if (typeof decodedData === "string" || !("email" in decodedData)) {
    throw new Error("Invalid token payload");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_secret as string,
    config.jwt_expires_in as string
  );
  return { accessToken };
};

const changePassword = async (
  user: IAuthUser,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needsPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.reset_password_secret as string,
    config.reset_password_expires_in as string
  );

  const resetPassLink =
    config.reset_password_link +
    `?userId=${userData.id}&token=${resetPassToken}`;

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
  );
  //console.log(resetPassLink)
};
const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  console.log({ token, payload });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
    },
  });

  const isValidToken = jwt.verify(
    token,
    config.reset_password_secret as string
  );

  if (!isValidToken) {
    throw new Error("Forbidden!");
  }

  // hash password
  const password = await bcrypt.hash(payload.password, 12);

  // update into database
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });
};
export const AuthServices = {
  login,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
