import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";
import status from "http-status";
import { IAuthUser } from "../user/user.interface";

const writeBlog = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { user } = req;
    const result = await blogServices.writeBlog(req.body, user as IAuthUser);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: "Blog created successfully",
      data: result,
    });
  }
);
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAllBlogs();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blogs retrieved successfully",
    data: result,
  });
});
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await blogServices.getBlog(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});
const editBlog = catchAsync(async (req: Request&{user?:IAuthUser}, res: Response) => {
  const { id } = req.params;
  const result = await blogServices.editBlog(id, req.body,req.user as IAuthUser);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request &{user?:IAuthUser}, res: Response) => {
  const { id } = req.params;
  const result = await blogServices.deleteBlog(id,req.user as IAuthUser);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const blogController = {
  writeBlog,
  getSingleBlog,
  getAllBlogs,
  editBlog,
  deleteBlog
};
