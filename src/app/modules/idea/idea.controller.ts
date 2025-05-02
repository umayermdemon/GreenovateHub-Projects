import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { ideaServices } from "./idea.service";

const createIdeaIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ideaServices.createIdeaIntoDb(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Idea Created Successfully",
    data: result,
  });
});

export const ideaControllers = {
  createIdeaIntoDb,
};
