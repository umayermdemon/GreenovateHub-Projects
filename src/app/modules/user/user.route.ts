import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";


const router = Router();

router.post('/', validateRequest(createUserValidationSchema), userController.registerUser);
router.get('/my-profile', auth(userRole.ADMIN, userRole.MEMBER), userController.getMyProfile);
router.delete('/delete-user/:id', auth(userRole.ADMIN, userRole.MEMBER), userController.deleteUser);
router.patch('/update-profile', auth(userRole.ADMIN, userRole.MEMBER), userController.updateUser);


export const userRouter = router;