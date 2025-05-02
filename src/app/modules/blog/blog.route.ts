import { Router } from "express";
import { blgoController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";


const router=Router();

router.post("/create-blog",auth(userRole.admin,userRole.member),blgoController.createBlog)


export const blogRouter=router;