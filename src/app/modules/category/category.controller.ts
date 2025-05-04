import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { categoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Category Created Successfully",
    data: result,
  });
});
const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategories();
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "All Categories retrived Successfully",
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategories
};
