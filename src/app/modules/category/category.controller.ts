import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { categoryServices } from "./category.service";

const createCategoryIntoDb = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDb(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Category Created Successfully",
    data: result,
  });
});

export const categoryControllers = {
  createCategoryIntoDb,
};
