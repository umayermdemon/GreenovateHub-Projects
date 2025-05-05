"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../../generated/prisma");
const router = (0, express_1.Router)();
router.post('/create-comment', (0, auth_1.default)(prisma_1.userRole.admin, prisma_1.userRole.member), comment_controller_1.commentController.createComment);
router.patch('/edit-comment/:id', (0, auth_1.default)(prisma_1.userRole.admin, prisma_1.userRole.member), comment_controller_1.commentController.editComment);
router.delete('/delete-comment/:id', (0, auth_1.default)(prisma_1.userRole.admin, prisma_1.userRole.member), comment_controller_1.commentController.deleteComment);
exports.commentRouter = router;
