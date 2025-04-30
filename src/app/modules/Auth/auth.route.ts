import { Router } from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";

const router = Router();

router.post('/login', AuthController.loginUser);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/change-password', auth(userRole.ADMIN, userRole.MEMBER), AuthController.changePassword);
router.post('/forgot-password',AuthController.forgotPassword)

export const AuthRouter = router;