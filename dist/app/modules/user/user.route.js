"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../../generated/prisma");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.createUserValidationSchema), user_controller_1.userController.registerUser);
router.get("/my-profile", (0, auth_1.default)(prisma_1.userRole.admin, prisma_1.userRole.member), user_controller_1.userController.getMyProfile);
router.delete("/delete-user/:id", (0, auth_1.default)(prisma_1.userRole.admin, prisma_1.userRole.member), user_controller_1.userController.deleteUser);
router.patch("/update-profile", (0, auth_1.default)(prisma_1.userRole.admin, prisma_1.userRole.member), user_controller_1.userController.updateUser);
exports.userRouter = router;
