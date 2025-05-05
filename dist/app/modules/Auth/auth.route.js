"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../../generated/prisma");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthController.loginUser);
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
router.post("/change-password", (0, auth_1.default)(prisma_1.userRole.admin, prisma_1.userRole.member), auth_controller_1.AuthController.changePassword);
router.post("/forgot-password", auth_controller_1.AuthController.forgotPassword);
router.post("/reset-password", auth_controller_1.AuthController.resetPassword);
exports.AuthRouter = router;
