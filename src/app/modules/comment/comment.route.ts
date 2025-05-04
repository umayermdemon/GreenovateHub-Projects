import { Router } from "express";
import { commentController } from "./comment.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";


const router = Router();

router.post('/create-comment', auth(userRole.admin, userRole.member), commentController.createComment)

export const commentRouter = router;