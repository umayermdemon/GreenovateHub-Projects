import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";
import { createBlogValidationSchema } from "./blog.validations";

const router = Router();

router.post(
  "/create-blog",
  // validateRequest(createBlogValidationSchema),
  auth(userRole.admin, userRole.member),
  blogController.createBlog
);
router.get("/get-all-blogs", blogController.getBlogs);
router.get("/get-single-blog/:id", blogController.getSingleBlog);
router.patch("/update-blog/:id", blogController.updateBlog);

export const blogRouter = router;
