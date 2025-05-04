"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const prisma_1 = require("../../utils/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield prisma_1.prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            address: payload.address,
            role: payload.role,
            image: payload.image,
        },
    });
    return result;
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUnique({
        where: {
            email: user.email,
            isDeleted: false,
        },
    });
    return userData;
});
const updateUser = (user, updatedPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    if (!userData) {
        throw new Error("User not found");
    }
    const result = yield prisma_1.prisma.user.update({
        where: {
            id: userData.id,
        },
        data: updatedPayload,
    });
    return result;
});
const deleteUser = (user, deletedId) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const deletedData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: deletedId,
            isDeleted: false,
        },
    });
    if (!deletedData) {
        throw new Error("User not exists");
    }
    if (userData.role !== "admin" && userData.id !== deletedId) {
        throw new Error("You are not authorized to delete");
    }
    const result = yield prisma_1.prisma.user.update({
        where: {
            id: deletedId,
            isDeleted: false,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.userServices = {
    registerUser,
    getMyProfile,
    deleteUser,
    updateUser,
};
