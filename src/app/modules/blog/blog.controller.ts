import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";
import status from "http-status";
import { IAuthUser } from "../user/user.interface";



const createBlog = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { user } = req;
    const result = await blogServices.createBlog(req.body, user as IAuthUser);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Blog created successfully",
        data: result,
    });
});

export const blgoController = {
    createBlog
}