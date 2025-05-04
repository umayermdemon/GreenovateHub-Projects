import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";
import { createBlogValidationSchema } from "./blog.validations";

const router = Router();

router.post(
  "/create-blog",
  validateRequest(createBlogValidationSchema),
  auth(userRole.admin, userRole.member),
  blogController.writeBlog
);
router.get("/get-all-blogs", blogController.getAllBlogs);
router.get("/get-single-blog/:id", blogController.getSingleBlog);
router.patch(
  "/update-blog/:id",
  auth(userRole.admin, userRole.member),
  blogController.editBlog
);
router.delete(
  "/delete-blog/:id",
  auth(userRole.admin, userRole.member),
  blogController.deleteBlog
);


export const blogRouter = router;
