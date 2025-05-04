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
exports.blogServices = void 0;
const prisma_1 = require("../../utils/prisma");
const createBlog = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const result = yield prisma_1.prisma.blog.create({
        data: {
            title: payload.title,
            description: payload.description,
            categoryId: payload.categoryId,
            images: payload.images,
            authorId: userData.id,
        },
    });
    return result;
});
// const createBlog = async (payload: IBlog, user: IAuthUser) => {
//     const userData = await prisma.user.findUniqueOrThrow({
//         where: {
//             email: user.email
//         }
//     })
//     const result = await prisma.blog.create({
//         data: {
//             ...payload,
//             authorId: userData.id
//         }
//     })
//     return result
// }
const getBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.blog.findMany({
        include: {
            Vote: true,
        },
    });
    const enhancedIdeas = result.map((blog) => {
        const votes = blog.Vote || [];
        const upVotes = votes.filter((v) => v.value === "up").length;
        const downVotes = votes.filter((v) => v.value === "down").length;
        return Object.assign(Object.assign({}, blog), { up_votes: upVotes, down_votes: downVotes });
    });
    return enhancedIdeas;
});
const getSingleBlog = (blog_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.blog.findUnique({
        where: {
            blog_id,
        },
    });
    return result;
});
const updateBlog = (blog_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.blog.update({
        where: {
            blog_id,
        },
        data: payload,
    });
    return result;
});
exports.blogServices = {
    createBlog,
    getBlogs,
    getSingleBlog,
    updateBlog,
};
