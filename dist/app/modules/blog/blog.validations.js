"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidationSchema = exports.createBlogValidationSchema = void 0;
const zod_1 = require("zod");
exports.createBlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    images: zod_1.z.array(zod_1.z.string().url("Each image must be a valid URL")),
    description: zod_1.z.string().min(1, "Description is required"),
    categoryId: zod_1.z.string().uuid("Category ID must be a valid UUID"),
});
exports.updateBlogValidationSchema = exports.createBlogValidationSchema.partial();
