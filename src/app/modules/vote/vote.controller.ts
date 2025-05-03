import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { voteServices } from "./vote.services";
import status from "http-status";


const createVote = catchAsync(async (req: Request, res: Response) => {
    const result = await voteServices.createVote(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: "Your vote added Successfully",
        data: result,
    });
});

export const voteController = {
    createVote
}