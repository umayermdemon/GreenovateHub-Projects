import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { userRole } from "../../../../generated/prisma";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  userController.registerUser
);
router.get(
  "/my-profile",
  auth(userRole.admin, userRole.member),
  userController.getMyProfile
);
router.delete(
  "/delete-user/:id",
  auth(userRole.admin, userRole.member),
  userController.deleteUser
);
router.patch(
  "/update-profile",
  auth(userRole.admin, userRole.member),
  userController.updateUser
);

export const userRouter = router;
