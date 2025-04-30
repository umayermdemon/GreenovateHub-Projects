import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";


const router = Router();

router.post('/', userController.registerUser)
router.get('/my-profile',auth(userRole.ADMIN,userRole.MEMBER), userController.getMyProfile)

export const userRouter = router;