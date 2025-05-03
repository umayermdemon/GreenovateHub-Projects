import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { ideaServices } from "./idea.service";
import { Request, Response } from "express";
import { IAuthUser } from "../user/user.interface";

const createIdeaIntoDb = catchAsync(async (req, res) => {
  const result = await ideaServices.createIdeaIntoDb(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Idea Created Successfully",
    data: result,
  });
});
const getAllIdeasFromDb = catchAsync(async (req, res) => {
  const result = await ideaServices.getAllIdeasFromDb();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All Ideas Retrieved Successfully",
    data: result,
  });
});
const getSingleIdeaFromDb = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { user } = req;
    console.log(user);
    const { id } = req.params;
    const result = await ideaServices.getSingleIdeaFromDb(
      user as IAuthUser,
      id
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Idea is Retrieved Successfully",
      data: result,
    });
  }
);
const getAllIdeasForMemberFromDb = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { user } = req;
    const result = await ideaServices.getAllIdeasForMemberFromDb(
      user as IAuthUser
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "All Ideas Retrieved Successfully",
      data: result,
    });
  }
);

export const ideaControllers = {
  createIdeaIntoDb,
  getAllIdeasFromDb,
  getSingleIdeaFromDb,
  getAllIdeasForMemberFromDb,
};
