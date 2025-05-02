import { Router } from "express";
import { blgoController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";
import { createBlogValidationSchema } from "./blog.validations";


const router = Router();

router.post("/create-blog", validateRequest(createBlogValidationSchema), auth(userRole.admin, userRole.member), blgoController.createBlog);
router.get("/get-all-blogs", blgoController.getBlogs);
router.get("/get-single-blog", blgoController.getSingleBlog);
router.patch("/update-blog", blgoController.updateBlog);


export const blogRouter = router;