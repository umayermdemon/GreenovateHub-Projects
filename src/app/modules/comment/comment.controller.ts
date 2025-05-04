import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { commentService } from "./comment.services";
import status from "http-status";
import { IAuthUser } from "../user/user.interface";


const createComment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const {user}=req;
    const result = await commentService.createComment(req.body,user as IAuthUser);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Comment Created Successfully",
        data: result,
    });
});

export const commentController = {
    createComment
}