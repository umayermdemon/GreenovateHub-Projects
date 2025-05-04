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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ideaServices = void 0;
const prisma_1 = require("../../utils/prisma");
const createIdeaIntoDb = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield prisma_1.prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (!isUserExists) {
        throw new Error("User not found");
    }
    const isCategoryExists = yield prisma_1.prisma.category.findUnique({
        where: {
            category_id: payload.categoryId,
        },
    });
    if (!isCategoryExists) {
        throw new Error("Category not found");
    }
    const authorId = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.id;
    const result = yield prisma_1.prisma.idea.create({
        data: {
            title: payload.title,
            description: payload.description,
            categoryId: payload.categoryId,
            images: payload.images,
            authorId: authorId,
            price: payload.price,
            problem_statement: payload.problem_statement,
            proposed_solution: payload.proposed_solution,
        },
        include: {
            author: true,
        },
    });
    return result;
});
const getAllIdeasFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.idea.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            Vote: true,
        },
    });
    const enhancedIdeas = result.map((idea) => {
        const votes = idea.Vote || [];
        const upVotes = votes.filter((v) => v.value === "up").length;
        const downVotes = votes.filter((v) => v.value === "down").length;
        return Object.assign(Object.assign({}, idea), { up_votes: upVotes, down_votes: downVotes, total_votes: upVotes + downVotes });
    });
    return enhancedIdeas;
});
const getSingleIdeaFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isIdeaExists = yield prisma_1.prisma.idea.findUnique({
        where: {
            idea_id: id,
            isDeleted: false,
        },
    });
    if (!isIdeaExists) {
        throw new Error("Idea not found");
    }
    const result = yield prisma_1.prisma.idea.findUnique({
        where: {
            idea_id: id,
        },
    });
    if (!result) {
        throw new Error("No idea found");
    }
    return result;
});
const getAllIdeasForMemberFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role !== "member") {
        throw new Error("User is not a member");
    }
    const isUserExists = yield prisma_1.prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (!isUserExists) {
        throw new Error("User not found");
    }
    const result = yield prisma_1.prisma.idea.findMany({
        where: {
            authorId: isUserExists.id,
            isDeleted: false,
        },
        include: {
            category: true,
            author: true,
        },
    });
    if (result.length === 0) {
        throw new Error("No ideas found for this user");
    }
    return result;
});
const updateIdeaIntoDb = (user, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield prisma_1.prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (!isUserExists) {
        throw new Error("User not found");
    }
    const isIdeaExists = yield prisma_1.prisma.idea.findUnique({
        where: {
            idea_id: id,
        },
    });
    if (!isIdeaExists) {
        throw new Error("Idea not found");
    }
    if (isUserExists.id !== isIdeaExists.authorId) {
        throw new Error("You are not the author of this idea");
    }
    const result = yield prisma_1.prisma.idea.update({
        where: {
            idea_id: id,
            isDeleted: false,
        },
        data: payload,
    });
    return result;
});
const deleteIdeaFromDb = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield prisma_1.prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (!isUserExists) {
        throw new Error("User not found");
    }
    const isIdeaExists = yield prisma_1.prisma.idea.findUnique({
        where: {
            idea_id: id,
        },
    });
    if (!isIdeaExists) {
        throw new Error("Idea not found");
    }
    if (isUserExists.id !== isIdeaExists.authorId) {
        throw new Error("You are not the author of this idea");
    }
    const result = yield prisma_1.prisma.idea.update({
        where: {
            idea_id: id,
            isDeleted: false,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.ideaServices = {
    createIdeaIntoDb,
    getAllIdeasFromDb,
    getAllIdeasForMemberFromDb,
    getSingleIdeaFromDb,
    updateIdeaIntoDb,
    deleteIdeaFromDb,
};
