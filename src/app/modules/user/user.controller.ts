import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { userServices } from "./user.service";
import { IAuthUser } from "./user.interface";


const registerUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.registerUser(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "User Registered Successfully",
        data: result
    });
})
const getMyProfile = catchAsync(async (req: Request & {user?:IAuthUser}, res: Response) => {
    const {user}=req;
    const result = await userServices.getMyProfile(user as IAuthUser);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "My Profile Retrived Successfully",
        data: result
    });
})

export const userController = {
    registerUser,
    getMyProfile
}